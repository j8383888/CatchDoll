import { SQLServe } from "./SQLServe";
import { Cmd } from "../protobuf/common";
import { ProtoParse } from "./ProtoParse";
import { Dictionary } from "./util/Dictionary";
import { PlayerCenter } from "./PlayerCenter";
var ws = require("nodejs-websocket");
/**
 * NODE-JS 里面已经有了个websocket  
 */
export class MyWebSocket {
    /* 单例 */
    private static _instance: MyWebSocket = null;

    /* 链接字典 */
    public connectMap: Dictionary = new Dictionary();
    /* 心跳字典 */
    public heartMap: Dictionary = new Dictionary();
    /* 最大心跳次数 */
    private readonly MAX_COUNT: number = 3;

    private _timer: NodeJS.Timeout;



    constructor() {
        this._heartCheck();
    }

    /* 获取单例 */
    public static get instance(): MyWebSocket {
        if (this._instance == null) {
            this._instance = new MyWebSocket();
        }
        return this._instance;
    }

    /* 创建Web */
    public creatWebSocket(): void {
        console.log("WebSocket开始建立连接...")
        var server = ws.createServer(this._onReceive).listen(8001)
        console.log("WebSocket建立完毕");
    }




    /*发送数据 */
    public sendMsg(uid: number, cmd: any): void {

        let connect = this.connectMap.get(uid);

        let constructor = cmd.constructor
        let protoName: string = "Cmd." + constructor.name
        const protoType = ProtoParse.Root.lookupType(protoName)
        let writer: protobuf.Writer = protoType.encode(cmd);
        let data: Uint8Array = writer.finish();

        let titleLen: number = Buffer.byteLength(protoName)
        let dataLen: number = Buffer.byteLength(data)
        let buffer: Buffer = Buffer.alloc(4 + titleLen + dataLen);
        /* 写入协议标题长度 */
        buffer.writeUInt16BE(titleLen, 0);
        /* 写入协议标题 */
        buffer.write(protoName, 2);
        /* 写入协议数据长度 */
        buffer.writeUInt16BE(dataLen, 2 + titleLen);
        /* 写入协议数据*/
        buffer.fill(data, 4 + titleLen);
        connect.sendBinary(buffer);
    }

    /**
     * 心跳检测
     */
    private _heartCheck(): void {
        this._timer = setInterval(this._heartJump.bind(this), 1000);
    }

    private _heartJump(): void {
        for (let i: number = 0; i < this.heartMap.length; i++) {
            let value: number = this.heartMap.values[i];
            value++;
            if (value > this.MAX_COUNT) {
                let uid: number = this.heartMap.keys[i]
                console.log("uid为:" + uid + "心跳异常")
                this._onPlayerOffline(uid);
            }
        }
    }

    /* 释放 */
    public dispose(): void {
        clearInterval(this._timer);
    }

    private _onReceive(conn): void {
        // conn.on("text", function (str: string) {
        //     conn.sendText(str)
        // })
        conn.on('binary', function (stream) {
            stream.once('readable', () => {
                let rawData: Buffer = stream._readableState.buffer.head.data;
                /*rawData:buffer 组成:协议名字长度+协议名字+协议数据长度+协议数据 */
                let nameLen = rawData.readUInt16BE(0);
                let rawDataLen = rawData.slice(2 + nameLen, 4 + nameLen).readUInt16BE(0);
                let cmdName = rawData.slice(2, 2 + nameLen).toString("utf8")
                var protoType: protobuf.Type = ProtoParse.Root.lookupType(cmdName);

                let message: protobuf.Message<{}> = protoType.decode(rawData.slice(4 + nameLen, 4 + nameLen + rawDataLen));
                let jsonData = message.toJSON()
                let uid: number;
                switch (cmdName) {
                    /* 登陆协议 */
                    case "Cmd.Login_C":
                        let data: Cmd.Login_C = jsonData as Cmd.Login_C;
                        MyWebSocket.instance.connectMap.set(data.uid, conn);
                        MyWebSocket.instance.heartMap.set(data.uid, 0);
                        SQLServe.instance.seekLogin(data)


                        break;
                    /* 物品变更 */
                    case "Cmd.ItemUpdate_CS":
                        let data2: Cmd.ItemUpdate_CS = jsonData as Cmd.ItemUpdate_CS;
                        let itemInfo = data2.itemInfo;
                        uid = data.uid;
                        PlayerCenter.clearUpdateNum(uid);
                        for (let item of itemInfo) {
                            if (item.itemUpdateNum && item.itemUpdateNum != 0) {
                                PlayerCenter.updateProp(uid, item.itemID, item.itemUpdateNum);
                            }
                        }
                        PlayerCenter.sendPlayerData(uid);
                        break;
                    case "Cmd.Heartbeat_CS":
                        let data3: Cmd.Heartbeat_CS = jsonData as Cmd.Heartbeat_CS;
                        uid = data3.uid;
                        let cmd: Cmd.Heartbeat_CS = new Cmd.Heartbeat_CS();
                        cmd.uid = uid;
                        MyWebSocket.instance.heartMap.set(uid, 0)
                        MyWebSocket.instance.sendMsg(uid, cmd);
                        break;
                }

                console.log("[收到客户端数据: " + cmdName + ":" + JSON.stringify(message) + "]");
            })
        })
        conn.once("close", (code, reason) => {
            let uid = MyWebSocket.instance.connectMap.getKeyByValue(conn);
            if (uid == null) {
                return;
            }
            MyWebSocket.instance._onPlayerOffline(uid);
            console.log("关闭连接")
        });
        conn.once("error", (code, reason) => {
            console.log("异常关闭" + "code:" + code + "     " + "reason" + reason)
        });
    }

    /**
     * 玩家离线操作
     * @param uid 
     */
    private _onPlayerOffline(uid: number): void {
        let itemData: Cmd.ItemInfo_CS[] = PlayerCenter.playerMap.get(uid);
        let conn = this.connectMap.get(uid);
        SQLServe.instance.setUserData(uid, itemData);
        PlayerCenter.playerMap.remove(uid);
        MyWebSocket.instance.connectMap.removeValue(conn);
        MyWebSocket.instance.heartMap.remove(uid);
        conn = null;
    }
}

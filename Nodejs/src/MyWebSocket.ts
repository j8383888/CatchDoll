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



    constructor() {
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
        console.log("测试日志");
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

    private _onReceive(conn): void {
        // conn.on("text", function (str: string) {
        //     conn.sendText(str) 
        // })
        // console.log("1");
        conn.on('binary', function (stream) {
            stream.once('readable', () => {
                let rawData: Buffer = stream._readableState.buffer.head.data;
                /*rawData:buffer 组成:协议名字长度+协议名字+协议数据长度+协议数据 */
                let nameLen = rawData.readUInt16BE(0);
                let rawDataLen = rawData.slice(2 + nameLen, 4 + nameLen).readUInt16BE(0);
                let cmdName = rawData.slice(2, 2 + nameLen).toString("utf8")
                var protoType: protobuf.Type = ProtoParse.Root.lookupType(cmdName);

                let message: protobuf.Message<{}> = protoType.decode(rawData.slice(4 + nameLen, 4 + nameLen + rawDataLen));
                /* 登陆协议 */
                if (cmdName == "Cmd.Login_C") {
                    let data: Cmd.Login_C = message.toJSON() as Cmd.Login_C;
                    MyWebSocket.instance.connectMap.set(data.uid, conn);
                    SQLServe.instance.seekLogin(data)
                }
                /* 物品变更 */
                else if (cmdName == "Cmd.ItemUpdate_CS") {
                    let data: Cmd.ItemUpdate_CS = message.toJSON() as Cmd.ItemUpdate_CS;
                    let itemInfo = data.itemInfo;
                    let uid = data.uid;
                    PlayerCenter.clearUpdateNum(uid);
                    for (let item of itemInfo) {
                        if (item.itemUpdateNum && item.itemUpdateNum != 0) {
                            PlayerCenter.updateProp(uid, item.itemID, item.itemUpdateNum);
                        }
                    }
                    PlayerCenter.sendPlayerData(uid);
                }
                console.log("[收到客户端数据: " + cmdName + ":" + JSON.stringify(message) + "]");
            })
        })
        conn.once("close", function (code, reason) {
            let uid = MyWebSocket.instance.connectMap.getKeyByValue(conn);
            if (uid == null) {
                return;
            }
            let itemData: Cmd.ItemInfo_CS[] = PlayerCenter.playerMap.get(uid);
            SQLServe.instance.setUserData(uid, itemData);
            PlayerCenter.playerMap.remove(uid);
            MyWebSocket.instance.connectMap.removeValue(conn);
            conn = null;
            console.log("关闭连接")
        });
        conn.once("error", (code, reason) => {
            console.log("异常关闭" + "code:" + code + "     " + "reason" + reason)
        });
    }
}

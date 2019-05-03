import { SQLServe } from "../SQLServe";
import { Cmd } from "../../protobuf/common";
import { ProtoParse } from "../ProtoParse";
import { Dictionary } from "../util/Dictionary";
import { PlayerCenter } from "../PlayerCenter";
import { MsgHandler } from "./MsgHandler";
import { TaskMgr } from "../Task/TaskMgr";
var fs = require('fs');
var nodejsWs = require("nodejs-websocket");
var https = require("https")
var http = require("http")
var wsModule = require("ws");
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

    private keypath = process.cwd() + '/server.key';//我把秘钥文件放在运行命令的目录下测试
    private certpath = process.cwd() + '/server.crt';//console.log(keypath);




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


        var options = {
            key: fs.readFileSync(this.keypath),
            cert: fs.readFileSync(this.certpath),
            passphrase: '8398337'//如果秘钥文件有密码的话，用这个属性设置密码
        };

        console.log("WebSocket开始建立连接...")
        var server = https.createServer(options, this._onReceive).listen(8001)
        console.log("WebSocket建立完毕");

        var ws = new wsModule.Server({
            server: server
        });
        //把创建好的https服务器丢进websocket的创建函数里，ws会用这个服务器来创建wss服务
        //同样，如果丢进去的是个http服务的话那么创建出来的还是无加密的ws服务
        ws.on('connection', this._onReceive);
        TaskMgr.getInstance().taskTimer();  // 开启任务刷新的计时
    }

    /*发送数据 */
    public sendMsg(uid: string, cmd: any): void {

        let connect = this.connectMap.get(uid);
        if (connect) {
            if (cmd["GetType"] == undefined) {
                console.assert(false, "cmd未扩展GetType")
                return;
            }
            let protoName: string = cmd["GetType"]
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
            connect.send(buffer);
        }

    }

    /**
     * 心跳检测
     */
    private _heartCheck(): void {
        // this._timer = setInterval(this._heartJump.bind(this), 1000 * 10);
    }

    private _heartJump(): void {
        for (let i: number = 0; i < this.heartMap.length; i++) {
            let value: number = this.heartMap.values[i];
            value++;
            if (value >= this.MAX_COUNT) {
                let uid: string = this.heartMap.keys[i]
                console.log("uid为:" + uid + "心跳异常")
                this.onPlayerOffline(uid);
            }
        }
    }

    /* 释放 */
    public dispose(): void {
        // clearInterval(this._timer);
    }

    private _onReceive(conn): void {
        // conn.on("text", function (str: string) {
        //     conn.sendText(str) 
        // })
        console.log('wss服务器已启动');
        conn.on('message', function (binary) {
            // conn.on('binary', function (stream) {
            // stream.once('readable', () => {
            let rawData: Buffer = binary;
            /*rawData:buffer 组成:协议名字长度+协议名字+协议数据长度+协议数据 */
            let nameLen = rawData.readUInt16BE(0);
            let rawDataLen = rawData.slice(2 + nameLen, 4 + nameLen).readUInt16BE(0);
            let cmdName = rawData.slice(2, 2 + nameLen).toString("utf8")
            var protoType: protobuf.Type = ProtoParse.Root.lookupType(cmdName);

            let message: protobuf.Message<{}> = protoType.decode(rawData.slice(4 + nameLen, 4 + nameLen + rawDataLen));
            let jsonData = message.toJSON()

            if (cmdName == "Cmd.Heartbeat_CS") {
                let data3: Cmd.Heartbeat_CS = jsonData as Cmd.Heartbeat_CS;
                let cmd: Cmd.Heartbeat_CS = new Cmd.Heartbeat_CS();
                cmd.uid = data3.uid;
                MyWebSocket.instance.heartMap.set(data3.uid, 0)
                MyWebSocket.instance.sendMsg(data3.uid, cmd);
            }
            /* 登陆协议 */
            else if (cmdName == "Cmd.Login_C") {
                console.log("玩家登陆");
                let data: Cmd.Login_C = jsonData as Cmd.Login_C;
                if (data.account == "wxgame") {
                    MyWebSocket.instance.getWXOpenID(conn, data);
                }
                else {
                    MyWebSocket.instance._checkUid(conn, data)
                }
            }
            else {
                let uid = MyWebSocket.instance.connectMap.getKeyByValue(conn)
                MsgHandler.getInstance(MyWebSocket.instance).handler(cmdName, jsonData, uid);
            }
            let dateStr = new Date().toLocaleString();
            console.log(dateStr, "[收到客户端数据: " + cmdName + ":" + JSON.stringify(message) + "]");
        })
        conn.once("close", (code, reason) => {
            let uid = MyWebSocket.instance.connectMap.getKeyByValue(conn);
            MyWebSocket.instance.connectMap.removeValue(conn);
            conn = null;
            let data = PlayerCenter.playerDataMap.get(uid);
            if (uid == null || data == null) {
                return;
            }
            MyWebSocket.instance.onPlayerOffline(uid);
            console.log("关闭连接")
        });
        conn.once("error", (code, reason) => {
            console.log("异常关闭" + "code:" + code + "     " + "reason:" + reason)
        });
    }

    private _checkUid(conn, data: Cmd.Login_C): void {
        let uid = data.uid;
        let oldConn = MyWebSocket.instance.connectMap.get(uid);
        if (oldConn) {
            console.log(`检测到已有玩家登陆此账号，将其踢出连接`);
            const info: Cmd.SameUidLogin_S = new Cmd.SameUidLogin_S();
            MyWebSocket.instance.sendMsg(uid, info);

            MyWebSocket.instance.connectMap.set(uid, conn);
            MyWebSocket.instance.heartMap.set(uid, 0);
            let playerData = PlayerCenter.playerDataMap.get(uid);
            PlayerCenter.sendPlayerData(uid, playerData.itemInfo, playerData.taskInfo)
        }
        else {
            MyWebSocket.instance.connectMap.set(uid, conn);
            MyWebSocket.instance.heartMap.set(uid, 0);
            SQLServe.instance.seekLogin(data)
        }
    }



    /**
     * 玩家离线操作
     * @param uid 
     */
    public onPlayerOffline(uid: string): void {
        SQLServe.instance.setUserData(uid);
        PlayerCenter.remove(uid);
        MyWebSocket.instance.heartMap.remove(uid);
        console.log("uid为:" + uid + "玩家断线")
    }


    /**
     * 获取微信OpenID
     * @param code 
     */
    public getWXOpenID(conn, data: Cmd.Login_C): void {
        var appId = 'wx2f26847a6393a178';
        var secret = '4af1b2014ffa5e37b5f5172c1195eb9e';
        let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + data.password + '&grant_type=authorization_code';
        https.get(url, function (res) {
            var datas = [];
            var size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
            });
            res.on("end", function () {
                // var result = datas.toString();
                var buff = Buffer.concat(datas, size);
                var resultStr = buff.toString();//不需要转编码,直接tostring  
                let result = JSON.parse(resultStr)
                console.log(result);
                let openid = result["openid"]
                data.uid = openid
                MyWebSocket.instance._checkUid(conn, data);
            });
        }).on("error", function (err) {
            console.error(err.stack)
        });

    }
}

import { SQLServe } from "./SQLServe";
import { Cmd } from "../protobuf/common";
import { ProtoParse } from "./ProtoParse";
import { Dictionary } from "./util/Dictionary";
import { PlayerCenter } from "./PlayerCenter";
import { TaskMgr } from "./Task/TaskMgr";
export class MsgHandler {
    private static _handler: MsgHandler = null; // 实例
    private _target: any = null; // 外部应用（MyWebScoket实例）
    private _curWs: any = null; //  当前的连接
    private _taskTimer: any = null;
    /**
     * 获取单例
     * @param target 
     */
    public static getInstance(target, ws): MsgHandler {
        if (!this._handler) {
            this._handler = new MsgHandler(target, ws);
        }
        return this._handler;
    };
    /**
     *  构造函数
     */
    constructor(target, ws) {
        this._target = target;
        this._curWs = ws;
    };
    public handler(event, msgData) {
        switch(event) {
            /* 登陆协议 */
            case "Cmd.Login_C":{
                console.log("玩家登陆");
                // this.taskTimer();
                let data: Cmd.Login_C = msgData as Cmd.Login_C;
                this._login(data);
            }
            break;
            /* 物品变更 */
            case "Cmd.ItemUpdate_CS":{
                let data2: Cmd.ItemUpdate_CS = msgData as Cmd.ItemUpdate_CS;
                this._itemUpdate(data2);
                break;
            }
        }
    };
    private _login(data): void{
        let user = this._target.connectMap.get(data.uid);
        if (user) {
            console.log(`检测到已有玩家登陆此账号，将其踢出连接`);
            const info: Cmd.SameUidLogin_S = new Cmd.SameUidLogin_S();
            info.uid = data.udi;
            user.sendMsg(data.uid, info);
            this._target.connectMap.removeValue(user);
            this._target.heartMap.remove(data.uid);
        }
        this._target.connectMap.set(data.uid, this._curWs);
        this._target.heartMap.set(data.uid, 0);
        SQLServe.instance.seekLogin(data)
    };
    private _itemUpdate(data): void {
        let itemInfo = data.itemInfo;
        // data2.uid = data2.uid;
        PlayerCenter.clearUpdateNum(data.uid);
        for (let item of itemInfo) {
            if (item.itemUpdateNum && item.itemUpdateNum != 0) {
                PlayerCenter.updateProp(data.uid, item.itemID, item.itemUpdateNum);
            }
        }
        PlayerCenter.sendPlayerData(data.uid);
    };
};
global["MsgHandler"] = MsgHandler;
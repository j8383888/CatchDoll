import { SQLServe } from "./SQLServe";
import { Cmd } from "../protobuf/common";
import { PlayerCenter } from "./PlayerCenter";
import { MyWebSocket } from "./MyWebSocket";
export class MsgHandler {
    private static _handler: MsgHandler = null; // 实例
    private _target: any = null; // 外部应用（MyWebScoket实例）
    /**
     * 获取单例
     * @param target 
     */
    public static getInstance(target: MyWebSocket): MsgHandler {
        if (!this._handler) {
            this._handler = new MsgHandler(target);
        }
        return this._handler;
    };
    /**
     *  构造函数
     */
    constructor(target) {
        this._target = target
    };
    public handler(event: string, msgData: any, conn?) {
        switch (event) {
            /* 登陆协议 */
            case "Cmd.Login_C":
                console.log("玩家登陆");
                let data: Cmd.Login_C = msgData as Cmd.Login_C;
                this._login(data, conn);
                break;
            /* 物品变更 */
            case "Cmd.ItemUpdate_CS":
                let data2: Cmd.ItemUpdate_CS = msgData as Cmd.ItemUpdate_CS;
                this._itemUpdate(data2);
                break;

        }
    };

    /**
     * 登陆
     * @param data 
     */
    private _login(data: Cmd.Login_C, conn: any): void {
        let oldConn = this._target.connectMap.get(data.uid);
        if (oldConn) {
            console.log(`检测到已有玩家登陆此账号，将其踢出连接`);
            const info: Cmd.SameUidLogin_S = new Cmd.SameUidLogin_S();
            info.uid = data.uid;
            oldConn.sendMsg(data.uid, info);
        }
        this._target.connectMap.set(data.uid, conn);
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
        PlayerCenter.sendPropData(data.uid);
    };
};
global["MsgHandler"] = MsgHandler;
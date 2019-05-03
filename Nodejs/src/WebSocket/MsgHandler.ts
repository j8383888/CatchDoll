import { SQLServe } from "../SQLServe";
import { Cmd } from "../../protobuf/common";
import { PlayerCenter, PROP_ID } from "../PlayerCenter";
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
    public handler(event: string, msgData: any, uid: string) {
        switch (event) {
            /* 物品变更 */
            case "Cmd.ItemUpdate_CS":
                let data: Cmd.ItemUpdate_CS = msgData as Cmd.ItemUpdate_CS;
                this._itemUpdate(data, uid);
                break;


            case "Cmd.GetTaskAward_C":
                let data2: Cmd.GetTaskAward_C = msgData as Cmd.GetTaskAward_C;
                let task: Cmd.TaskUpdate_CS = PlayerCenter.getTaskInfo(uid)
                for (let item of task.taskInfo) {
                    if (item.taskID == data2.taskID) {
                        /* 已完成 */
                        if (item.taskState == 1) {
                            item.taskState = 2;
                            MyWebSocket.instance.sendMsg(uid, task)
                        }
                        else {
                            console.assert(false, "逻辑有误")
                        }
                        break;
                    }
                }
                break;
            case "Cmd.RefreshTask_C":
                let itemInfo = PlayerCenter.getItemInfo(uid);

                if (PlayerCenter.checkPropEnough(uid, PROP_ID.DIMOND, 2)) {
                    PlayerCenter.updateProp(uid, PROP_ID.DIMOND, -2);
                    let cmd2 = new Cmd.ItemUpdate_CS();
                    cmd2.itemInfo = itemInfo;
                    MyWebSocket.instance.sendMsg(uid, cmd2);

                    let task2: Cmd.TaskUpdate_CS = PlayerCenter.getTaskInfo(uid);
                    let cmd = new Cmd.TaskUpdate_CS();
                    cmd.taskInfo = PlayerCenter.getRamdomTasks();
                    cmd.endTime = task2.endTime;
                    MyWebSocket.instance.sendMsg(uid, cmd);
                }
                else {
                    let cmd = new Cmd.ServeTips_S();
                    cmd.tips = "钻石不够啦~！";
                    MyWebSocket.instance.sendMsg(uid, cmd);
                }
                break;
        }
    };




    private _itemUpdate(data, uid: string): void {
        let itemInfo = data.itemInfo;
        // data2.uid = data2.uid;
        PlayerCenter.clearUpdateNum(uid);
        for (let item of itemInfo) {
            if (item.itemUpdateNum && item.itemUpdateNum != 0) {
                PlayerCenter.updateProp(uid, item.itemID, item.itemUpdateNum);
            }
        }
        PlayerCenter.sendPropData(uid);
    };
};
global["MsgHandler"] = MsgHandler;
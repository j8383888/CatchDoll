import { Dictionary } from "./util/Dictionary";
import { Cmd } from "../protobuf/common";
import { MyWebSocket } from "./WebSocket/MyWebSocket";
import { JsonParse } from "./JsonParse";
import { Utils } from "./util/Utils";
export class PlayerCenter {

    public static playerDataMap: Dictionary = new Dictionary()


    public constructor() {
      
    }

    /**
     * 移除
     * @param uid 
     */
    public static remove(uid: string): void {
        this.playerDataMap.remove(uid);
    }


    /**
	 * 获得玩家道具数量
	 */
    public static getProp(uid: string, propID: number): number {
        let propData: Cmd.IItemInfo_CS[] = this.getItemInfo(uid)
        for (let item of propData) {
            if (item.itemID == propID) {
                return item.itemNum;
            }
        }
    }

    /**
     * 检测玩家道具数量
     */
    public static checkPropEnough(uid: string, propID: number, checkNum: number): boolean {
        let propData: Cmd.IItemInfo_CS[] = this.getItemInfo(uid)
        for (let item of propData) {
            if (item.itemID == propID) {
                if(item.itemNum >= checkNum){
                    return true
                }
                else{
                    return false;
                }
            }
        }
    }

    /**
     * 设置玩家道具数量
     */
    public static updateProp(uid: string, propID: number, updateNum: number): number {
        let propData: Cmd.IItemInfo_CS[] = this.getItemInfo(uid)
        for (let item of propData) {
            if (item.itemID == propID) {
                item.itemNum += updateNum;
                item.itemUpdateNum = updateNum;
                return item.itemNum;
            }
        }
    }

    public static clearUpdateNum(uid: string): void {
        let propData: Cmd.IItemInfo_CS[] = this.getItemInfo(uid)
        for (let item of propData) {
            item.itemUpdateNum = 0;
        }
    }


    /**
    * 设置玩家道具数量
    */
    public static setProp(uid: string, propID: number, num: number): void {
        let propData: Cmd.IItemInfo_CS[] = this.getItemInfo(uid);
        for (let item of propData) {
            if (item.itemID == propID) {
                item.itemNum = num;
                break;
            }
        }
    }

    /**
     * 获得道具信息
     * @param uid 
     */
    public static getItemInfo(uid: string): Cmd.ItemInfo_CS[] {
        return this.playerDataMap.get(uid).itemInfo;

    }

    /**
     * 获得道具信息
     * @param uid 
     */
    public static getTaskInfo(uid: string): Cmd.TaskUpdate_CS {
        return this.playerDataMap.get(uid).taskInfo;
    }

    /**
     * 发送玩家数据
     * @param uid 
     * @param itemInfoAry 
     */
    public static sendPlayerData(uid: string, itemInfoAry: Cmd.ItemInfo_CS[], task: Cmd.TaskUpdate_CS): void {
        let cmd: Cmd.PlayerInfo_S = new Cmd.PlayerInfo_S();
        cmd.uid = uid;
        cmd.itemInfo = itemInfoAry;
        cmd.taskInfo = task;
        cmd.serveTime = Date.now();

        this.playerDataMap.set(uid, cmd);
        MyWebSocket.instance.sendMsg(uid, cmd);
    }

    /**
     * 发送道具数据
     * @param uid 
     * @param itemInfoAry 
     */
    public static sendPropData(uid: string, itemInfoAry?: Cmd.ItemInfo_CS[]): void {
        let cmd: Cmd.ItemUpdate_CS = new Cmd.ItemUpdate_CS();
        if (itemInfoAry === void 0) {
            itemInfoAry = this.getItemInfo(uid);
        }
        cmd.itemInfo = itemInfoAry;
        this.setItemInfo(uid, itemInfoAry);
        MyWebSocket.instance.sendMsg(uid, cmd);
    }

    /**
     * 设置道具数据
     */
    public static setItemInfo(uid: string, itemInfoAry: Cmd.ItemInfo_CS[]): void {
        this.playerDataMap.get(uid).itemInfo = itemInfoAry;
    }

    /**
     * 获得一个随机任务
     */
    public static getRamdomTask(uid: string, taskID: number): Cmd.TaskUpdate_CS.TaskInfo {
        let task: Cmd.TaskUpdate_CS = this.getTaskInfo(uid);
        let taskIDs: number[] = JsonParse.taskDataID.slice();
        for (let item of task.taskInfo) {
            if (item.taskID != taskID) {
                taskIDs.remove(item.taskID);
            }
        }

        for (let item of task.taskInfo) {
            if (item.taskID == taskID) {
                item.taskID = taskIDs[Utils.getInstance().random(0, taskIDs.length - 1)];
                item.taskState = 0;
                return item;
            }
        }
        return null
    }

    /**
     * 获得所有随机任务
     */
    public static getRamdomTasks(): Cmd.TaskUpdate_CS.TaskInfo[] {
        let taskAry: Cmd.TaskUpdate_CS.TaskInfo[] = []
        let taskData: table.TaskTable[] = JsonParse.taskData.slice();
        for (let i: number = 0; i < 3; i++) {
            let taskInfo: Cmd.TaskUpdate_CS.TaskInfo = new Cmd.TaskUpdate_CS.TaskInfo();
            let index = Utils.getInstance().random(0, taskData.length - 1)
            taskData.removeAt(index)
            taskInfo.taskID = JsonParse.taskData[index].id;
            taskInfo.taskState = 0;
            taskAry.push(taskInfo);
        }
        return taskAry
    }
}
export enum PROP_ID {
    MONEY = 1,
    DIMOND = 2,
    HONOR = 3,
}
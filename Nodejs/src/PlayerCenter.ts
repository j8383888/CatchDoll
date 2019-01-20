import { Dictionary } from "./util/Dictionary";
import { Cmd } from "../protobuf/common";
import { MyWebSocket } from "./MyWebSocket";
export class PlayerCenter {

    public static playerDataMap: Dictionary = new Dictionary()


    public constructor() {

    }

    /**
     * 移除
     * @param uid 
     */
    public static remove(uid: number): void {
        this.playerDataMap.remove(uid);
    }


    /**
	 * 获得玩家道具数量
	 */
    public static getProp(uid: number, propID: number): number {
        let propData: Cmd.IItemInfo_CS[] = this.getItemInfo(uid)
        for (let item of propData) {
            if (item.itemID == propID) {
                return item.itemNum;
            }
        }
    }

    /**
     * 设置玩家道具数量
     */
    public static updateProp(uid: number, propID: number, updateNum: number): number {
        let propData: Cmd.IItemInfo_CS[] = this.getItemInfo(uid)
        for (let item of propData) {
            if (item.itemID == propID) {
                item.itemNum += updateNum;
                item.itemUpdateNum = updateNum;
                return item.itemNum;
            }
        }
    }

    public static clearUpdateNum(uid: number): void {
        let propData: Cmd.IItemInfo_CS[] = this.getItemInfo(uid)
        for (let item of propData) {
            item.itemUpdateNum = 0;
        }
    }


    /**
    * 设置玩家道具数量
    */
    public static setProp(uid: number, propID: number, num: number): void {
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
    public static getItemInfo(uid: number): Cmd.ItemInfo_CS[] {
        return this.playerDataMap.get(uid).itemInfo;
    }

    /**
     * 获得道具信息
     * @param uid 
     */
    public static getTaskInfo(uid: number): Cmd.TaskUpdate_CS {
        return this.playerDataMap.get(uid).taskInfo;
    }

    /**
     * 发送玩家数据
     * @param uid 
     * @param itemInfoAry 
     */
    public static sendPlayerData(uid: number, itemInfoAry: Cmd.ItemInfo_CS[], task: Cmd.TaskUpdate_CS): void {
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
    public static sendPropData(uid: number, itemInfoAry?: Cmd.ItemInfo_CS[]): void {
        let cmd: Cmd.ItemUpdate_CS = new Cmd.ItemUpdate_CS();
        cmd.uid = uid;
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
    public static setItemInfo(uid: number, itemInfoAry: Cmd.ItemInfo_CS[]): void {
        this.playerDataMap.get(uid).itemInfo = itemInfoAry;
    }

}
export enum PROP_ID {
    MONEY = 1,
    DIMOND = 2,
    HONOR = 3,
}
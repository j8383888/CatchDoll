import { Dictionary } from "./util/Dictionary";
import { Cmd } from "../protobuf/common";
import { MyWebSocket } from "./MyWebSocket";
import { JsonParse } from "./JsonParse";

export class PlayerCenter {

    public static propMap: Dictionary = new Dictionary()

    public static infoMap: Dictionary = new Dictionary()

    public constructor() {

    }


    /**
	 * 获得玩家道具数量
	 */
    public static getProp(uid: number, propID: number): number {
        let propData: Cmd.IItemInfo_CS[] = this.propMap.get(uid)
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
        let propData: Cmd.IItemInfo_CS[] = this.propMap.get(uid)
        for (let item of propData) {
            if (item.itemID == propID) {
                item.itemNum += updateNum;
                item.itemUpdateNum = updateNum;
                return item.itemNum;
            }
        }
    }

    public static clearUpdateNum(uid: number): void {
        let propData: Cmd.IItemInfo_CS[] = this.propMap.get(uid)
        for (let item of propData) {
            item.itemUpdateNum = 0;
        }
    }


    /**
    * 设置玩家道具数量
    */
    public static setProp(uid: number, propID: number, num: number): void {
        let propData: Cmd.IItemInfo_CS[] = this.propMap.get(uid)
        for (let item of propData) {
            if (item.itemID == propID) {
                item.itemNum = num;
                break;
            }
        }
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

        this.propMap.set(uid, itemInfoAry);
        this.infoMap.set(uid, task);
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
            itemInfoAry = PlayerCenter.propMap.get(uid);
        }
        cmd.itemInfo = itemInfoAry;
        this.propMap.set(uid, itemInfoAry);
        MyWebSocket.instance.sendMsg(uid, cmd);
    }



    /**
     * 发送初始化玩家数据
     * @param data 
     */
    public static sendInitPlayerData(data: Cmd.Login_C, task: Cmd.TaskUpdate_CS): void {



    }


}
export enum PROP_ID {
    MONEY = 1,
    DIMOND = 2,
    HONOR = 3,
}
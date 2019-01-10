import { Dictionary } from "./util/Dictionary";
import { Cmd } from "../protobuf/common";
import { MyWebSocket } from "./MyWebSocket";
import { JsonParse } from "./JsonParse";

export class PlayerCenter {

    public static playerMap: Dictionary = new Dictionary()

    public constructor() {

    }


    /**
	 * 获得玩家道具数量
	 */
    public static getProp(uid: number, propID: number): number {
        let propData: Cmd.IItemInfo_CS[] = this.playerMap.get(uid)
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
        let propData: Cmd.IItemInfo_CS[] = this.playerMap.get(uid)
        for (let item of propData) {
            if (item.itemID == propID) {
                item.itemNum += updateNum;
                item.itemUpdateNum = updateNum;
                return item.itemNum;
            }
        }
    }

    public static clearUpdateNum(uid: number): void {
        let propData: Cmd.IItemInfo_CS[] = this.playerMap.get(uid)
        for (let item of propData) {
            item.itemUpdateNum = 0;
        }
    }


    /**
    * 设置玩家道具数量
    */
    public static setProp(uid: number, propID: number, num: number): void {
        let propData: Cmd.IItemInfo_CS[] = this.playerMap.get(uid)
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
    public static sendPlayerData(uid: number, itemInfoAry?: Cmd.ItemInfo_CS[]): void {
        let cmd: Cmd.PlayerInfo_S = new Cmd.PlayerInfo_S();
        cmd.uid = uid;
        if (itemInfoAry === void 0) {
            itemInfoAry = PlayerCenter.playerMap.get(uid);
        }
        cmd.itemInfo = itemInfoAry;
        this.playerMap.set(uid, itemInfoAry);
        MyWebSocket.instance.sendMsg(uid, cmd);
    }

    /**
     * 发送初始化玩家数据
     * @param data 
     */
    public static sendInitPlayerData(data: Cmd.Login_C): void {
        let itemInfoAry: Cmd.ItemInfo_CS[] = []
        for (let item of JsonParse.propData) {
            let itemInfo: Cmd.ItemInfo_CS = new Cmd.ItemInfo_CS();
            itemInfo.itemID = item.id;
            if (item.id == 1 || item.id == 2 || item.id == 3) {
                itemInfo.itemNum = 100
            }
            else {
                itemInfo.itemNum = 0;
            }
            itemInfoAry.push(itemInfo);
        }
        PlayerCenter.sendPlayerData(data.uid, itemInfoAry);
    }


}
export enum PROP_ID {
    MONEY = 1,
    DIMOND = 2,
    HONOR = 3,
}
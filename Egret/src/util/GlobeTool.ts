/**
 * 全局工具
 * @author suo
 */
module catchDoll {
	export class GlobeTool {

		

		public constructor() {
		}

		/**
		 * 在视图内
		 */
		public static inView(x: number, y: number): boolean {
			if (x < -10 || x > catchDoll.GameCenter.stageW + 10) {
				return false
			}
			if (y < -10 || y > catchDoll.GameCenter.stageH + 10) {
				return false;
			}
			return true;
		}

		/**
		 * 获得玩家道具数量
		 */
		public static getProp(propID: number): number {
			let propData: Cmd.IItemInfo_CS[] = Master.instance.itemData;
			for (let item of propData) {
				if (item.itemID == propID) {
					return item.itemNum;
				}
			}
		}
	}

	export enum ITEM_ID {
		MONEY = 1,
		DIMOND = 2,
		HONOR = 3,
	}
}
/**
 * 转盘数据
 * @author suo
 */
module catchDoll {
	export class TurntableData {

		/**
		 * 奖项字典
		 */
		public static awardMap: Dictionary = new Dictionary()

		public constructor() {

		}

		public static init() {
			let table: table.TurntableList[] = TableCenter.instance.TurnTable;

			for (let item of table) {
				TurntableData.awardMap.set(item.id, item)
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			TurntableData.awardMap.clear();
		}
	}

	export enum TURNTABLE_AWARD {
		COIN_1,
		COIN_2,
		COIN_4,
		COIN_8,
		COIN_12,
		COIN_15,
	}
}
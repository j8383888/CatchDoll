/**
 * 玩家数据中心
 * @author suo
 */
module catchDoll {
	export class Master {
		/*单例*/
		private static _instance: Master = null;
		/*uid*/
		public uid: number = -1;
		/*玩家的钩锁*/
		public MasterPaws: Paws;
		/**
		 * 道具数据
		 */
		public itemData: Cmd.IItemInfo_CS[] = [];
		/**
		 * 任务数据
		 */
		public taskData: Cmd.ITaskUpdate_CS;
		/**
		 * 服务器时间
		 */
		public serveTime: number = -1;



		public constructor() {
			EventManager.registerEvent(EVENT_ID.UPDATE_ITEM_INFO, Handler.create(this, this._updateItem));
		}

		/**
		 * 更新前
		 */
		private _updateItem(): void {
			for (let item of this.itemData) {
				if (item.itemUpdateNum != 0) {
					if (item.itemID == PROP_ID.MONEY) {
						EventManager.fireEvent(EVENT_ID.UPDATE_MONEY);
					}
					else if(item.itemID == PROP_ID.DIAMOND) {
						EventManager.fireEvent(EVENT_ID.UPDATE_DIAMOND);
					}
				}
			}
		}

		public setServeTime(time: number): void {
			this.serveTime = time;
			Laya.timer.loop(1000, this, this._updateServeTime)

		}

		/**
		 * 更新服务器时间
		 */
		private _updateServeTime(): void {
			this.serveTime += 1000;
		}

		/**
		 * 更新前
		 */
		private _updateMoney(value: number): void {
		}



		/**
		 * 获得单例
		 */
		public static get instance(): Master {
			if (this._instance == null) {
				this._instance = new Master();
			}
			return this._instance;
		}


		public sendItemUpdateMsg(itemID: number, updateNum: number) {
			let cmd: Cmd.ItemUpdate_CS = new Cmd.ItemUpdate_CS();
			cmd.uid = Master.instance.uid
			let itemInfo: Cmd.IItemInfo_CS[] = []
			let item: Cmd.ItemInfo_CS = new Cmd.ItemInfo_CS();
			item.itemID = itemID;
			item.itemUpdateNum = updateNum;
			itemInfo.push(item);
			cmd.itemInfo = itemInfo;
			WebSocket.instance.sendMsg(cmd);
		}




		/**
		 * 释放
		 */
		public dispose(): void {
			Laya.timer.clear(this, this._updateServeTime)
			EventManager.unregisterEvent(EVENT_ID.UPDATE_ITEM_INFO, this, this._updateItem);
			this.uid = -1;

		}

	}

	export enum TASK_STATE {
		/*完成*/
		ACHIEVE,
		/*未完成*/
		UN_ACHIEVE,
		/*未领取*/
		UN_GET
	}
}


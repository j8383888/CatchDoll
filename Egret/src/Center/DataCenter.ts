/**
 * 数据处理中心
 * @author suo
 */
module catchDoll {
	export class DataCenter {

		/*单例*/
		private static _instance: DataCenter = null;
		/*玩家数据*/
		public master: Master = Master.instance;
		/*等级 （低级场,中级场，高级场）*/
		public level: number = 0;
		/*配置*/
		public table: TableCenter = TableCenter.instance;

		public constructor() {
		}

		/**
		 * 获得单例
		 */
		public static get instance(): DataCenter {
			if (this._instance == null) {
				this._instance = new DataCenter();
			}
			return this._instance;
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this.table.dispose();
			this.table = null;
			this.master.dispose();
			this.master = null;
		}
	}
}



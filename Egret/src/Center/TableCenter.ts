/**
 * 配置中心
 */
module catchDoll {
	export class TableCenter {

		/*单例*/
		private static _instance: TableCenter = null;

		/**
		 * 夹子配置
		 */
		public ClipTable: table.ClipTable[];
		/**
		 * 怪兽配置
		 */
		public MonsterTable: table.MonsterTable[];
		/**
		 * 任务配置
		 */
		public TaskTable: table.TaskTable[];
		/**
		 * 道具配置
		 */
		public PropTable: table.PropTable[];
		/**
		 * 道具配置
		 */
		public TurnTable: table.TurntableList[];
		/**
		 * 商店配置
		 */
		public ShopTable: table.shopTable[];
		/**
		 * 商店配置
		 */
		public treasureTable: table.TreasureTable[];

		/**
		 * 初始化配置
		 */
		private _initTable(): void {
			this.ClipTable = ConfigParse.getJosn("ClipTable_json");
			this.MonsterTable = ConfigParse.getJosn("MonsterTable_json");
			this.TaskTable = ConfigParse.getJosn("TaskTable_json");
			this.PropTable = ConfigParse.getJosn("PropTable_json");
			this.TurnTable = ConfigParse.getJosn("TurntableList_json");
			this.ShopTable = ConfigParse.getJosn("shopTable_json")
			this.treasureTable = ConfigParse.getJosn("TreasureTable_json")
		}

		/**
		 * 根据ID获得物品数据
		 */
		public getPropDataByID(id:number):table.PropTable{
			return ConfigParse.getWholeByProperty(this.PropTable,"id",id.toString());
		}

		public constructor() {
			this._initTable();
		}

		/**
		 * 获得单例
		 */
		public static get instance(): TableCenter {
			if (this._instance == null) {
				this._instance = new TableCenter();
			}
			return this._instance;
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this.ClipTable.length = 0;
			this.ClipTable = null;
			this.MonsterTable.length = 0;
			this.MonsterTable = null;
			this.TaskTable.length = 0;
			this.TaskTable = null;
			this.PropTable.length = 0;
			this.PropTable = null;
			this.TurnTable.length = 0;
			this.TurnTable = null;
			this.ShopTable.length = 0;
			this.ShopTable = null;
			this.treasureTable.length = 0;
			this.treasureTable = null;
		}
	}
}
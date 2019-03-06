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
		 * 转盘配置
		 */
		public TurnTable: table.TurntableList[];
		/**
		 * 商店配置
		 */
		public ShopTable: table.ShopTable[];
		/**
		 * 商店配置
		 */
		public treasureTable: table.TreasureTable[];
		/**
		 * 场景可交互对象配置
		 */
		public SceneInteractiveObjectTable: table.SceneInteractiveObjectTable[];
		/**
		 * 章节数据配置
		 */
		public ChapterData: {
			chapterID: number,
			chapterName: string,
			levelData: {
				level: number,
				bgSource: string,
				monster: {
					id: number,
					fixedRotation: number,
					exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				}[],
				sceneInteractiveObject: {
					id: number,
					fixedRotation: number,
					exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
					carrySubitem: {
						id: number,
						weightOdds: number,
					}[]
				}[],
				mapData: { source, x, y, width, height }[],
			}[]
		}[] = [];

		/**
		 * 初始化配置
		 */
		private _initTable(): void {
			this.ClipTable = ConfigParse.getJosn("ClipTable_json");
			this.MonsterTable = ConfigParse.getJosn("MonsterTable_json");
			this.TaskTable = ConfigParse.getJosn("TaskTable_json");
			this.PropTable = ConfigParse.getJosn("PropTable_json");
			this.TurnTable = ConfigParse.getJosn("TurntableList_json");
			this.ShopTable = ConfigParse.getJosn("ShopTable_json");
			this.treasureTable = ConfigParse.getJosn("TreasureTable_json");
			this.ChapterData = ConfigParse.getJosn("LevelData_json")
			this.SceneInteractiveObjectTable = ConfigParse.getJosn("SceneInteractiveObjectTable_json")
		}

		/**
		 * 根据ID获得物品数据
		 */
		public getPropDataByID(id: number): table.PropTable {
			return ConfigParse.getWholeByProperty(this.PropTable, "id", id.toString());
		}

		/**
		 * 根据ID获得物品数据
		 */
		public getMonsterDataByID(id: number): table.MonsterTable {
			return ConfigParse.getWholeByProperty(this.MonsterTable, "id", id.toString());
		}


		/**
		 * 根据ChapterID获得关卡数数据
		 */
		public getLevelsByChapterID(chapterID: number): {
			level: number,
			bgSource: string,
			monster: {
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
			}[],
			sceneInteractiveObject: {
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				carrySubitem: {
					id: number,
					weightOdds: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
		}[] {
			for (let item of this.ChapterData) {
				if (item.chapterID == chapterID) {
					return item.levelData;
				}
			}
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
			this.ChapterData.length = 0;
			this.ChapterData = null;
		}
	}
}
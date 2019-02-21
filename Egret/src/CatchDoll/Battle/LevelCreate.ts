/**
 * 关卡创建
 * @author suo 
 */
module catchDoll {
	export class LevelCreate {

		/**
		 * 在视野内的怪物
		 */
		public static inSenceMonsterMap: Dictionary = new Dictionary();
		/**
		 * 爪子是否下降
		 */
		public pawsDown: boolean = false;
		/**
		 * 单例
		 */
		private static _instance: LevelCreate;

		private curLevelData: {
			level: number,
			bgSource: string,
			monster: {
				monsterID: number,
				fixedRotation: number,
				pathMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number }[],
			}[],
			mapData: { source, x, y }[],
		};

		public constructor() {

		}

		/**
		 * 初始化
		 */
		public init(levelData: {
			level: number,
			bgSource: string,
			monster: {
				monsterID: number,
				fixedRotation: number,
				pathMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number }[],
			}[],
			mapData: { source, x, y }[],
		}): void {
			this.curLevelData = levelData
			this._creatMonster();
			this._creatMaster();

			Laya.timer.frameLoop(1, this, this._checkHit)
		}

		/**
		 * 检测碰撞
		 */
		private _checkHit(): void {
			if (this.pawsDown) {
				let monsterMap = LevelCreate.inSenceMonsterMap
				let len: number = monsterMap.length;
				for (let i: number = 0; i < len; i++) {
					let monster: Monster = monsterMap.values[i];
				}
			}
		}

		/**
		 * 获得单例
		 */
		public static get instance(): LevelCreate {
			if (this._instance == null) {
				this._instance = new LevelCreate();
			}
			return this._instance;
		}

		/**
		 * 创建怪物
		 */
		private _creatMonster(): void {
			for (let item of this.curLevelData.monster) {

				let varsData: IMonsterVars = <IMonsterVars>{};
				varsData.fixedRotation = item.fixedRotation;
				varsData.exportData = item.exportData;
				varsData.operation = [<IOperation>{
					type: OPERATION_TYPE.MONSTER

				}]
				GameObjectFactory.instance.creatGameObject(item.monsterID, varsData)
			}

		}

		/**
		 * 创建主角
		 */
		private _creatMaster(): void {
			Master.instance.MasterPaws = GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.PAWS)
			Master.instance.MasterPaws.switchClip(1);
			Master.instance.MasterPaws.y = 160;
			Master.instance.MasterPaws.x = 500;
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			let len: number = LevelCreate.inSenceMonsterMap.length;
			let map: Dictionary = LevelCreate.inSenceMonsterMap.copy();
			for (let i: number = 0; i < len; i++) {
				let monster: Monster = map.values[i];
				GameObjectFactory.instance.recoverGameObject(monster);
			}
			if (Master.instance.MasterPaws) {
				GameObjectFactory.instance.recoverGameObject(Master.instance.MasterPaws);
				Master.instance.MasterPaws = null;
			}
			this.curLevelData = null;

		}
	}
}
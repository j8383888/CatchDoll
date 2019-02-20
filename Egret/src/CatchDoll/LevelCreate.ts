/**
 * 关卡创建
 * @author suo 
 */
module catchDoll {
	export class LevelCreate {

		/**
		 * 在视野内的怪物
		 */
		public static inViewMonsterMap: Dictionary = new Dictionary();
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
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number },
				pathData: {
					origin: { x, y },
					ctrlP1: { x, y },
					ctrlP2: { x, y },
					beforeAnchor: { x, y },
					nextAnchor: { x, y },
				}[]
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
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number },
				pathData: {
					origin: { x, y },
					ctrlP1: { x, y },
					ctrlP2: { x, y },
					beforeAnchor: { x, y },
					nextAnchor: { x, y },
				}[]
			}[],
			mapData: { source, x, y }[],
		}): void {
			this.curLevelData = levelData
			this._creatMonster();
			this._creatMaster();
			EventManager.registerEvent(EVENT_ID.CREAT_MONSTER, Handler.create(this, this._creatRandomMonster));
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

			for (let i: number = GAMEOBJECT_SIGN.MONSTER_ROBOT; i <= GAMEOBJECT_SIGN.MONSTER_Cactus; i++) {
				let varsData: IMonsterVars = <IMonsterVars>{};
				varsData.bornX = 500;
				varsData.bornY = 980;
				varsData.operation = [<IOperation>{
					type: OPERATION_TYPE.MONSTER
				}]
				GameObjectFactory.instance.creatGameObject(i, varsData)
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
		 * 随机创建怪物
		 */
		private _creatRandomMonster(): void {
			let varsData: IMonsterVars = <IMonsterVars>{};
			varsData.bornX = 500;
			varsData.bornY = 925;
			varsData.operation = [<IOperation>{
				type: OPERATION_TYPE.MONSTER
			}]
			GameObjectFactory.instance.creatGameObject(MathUtil.random(GAMEOBJECT_SIGN.MONSTER_1, GAMEOBJECT_SIGN.MONSTER_ROBOT), varsData)
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			let len: number = LevelCreate.inViewMonsterMap.length;
			let map: Dictionary = LevelCreate.inViewMonsterMap.copy();
			for (let i: number = 0; i < len; i++) {
				let monster: Monster = map.values[i];
				GameObjectFactory.instance.recoverGameObject(monster);
			}
			if (Master.instance.MasterPaws) {
				GameObjectFactory.instance.recoverGameObject(Master.instance.MasterPaws);
				Master.instance.MasterPaws = null;
			}

			EventManager.unregisterEvent(EVENT_ID.CREAT_MONSTER, this, this._creatRandomMonster);
		}
	}
}
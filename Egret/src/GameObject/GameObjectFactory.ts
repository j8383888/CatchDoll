/**
 * 游戏对象创建工厂
 * @author suo
 */
module catchDoll {
	export class GameObjectFactory {

		/**
		 * 单例
		 */
		private static _instance: GameObjectFactory = null;
		/**
		 * 对象字典
		 */
		private _objClassDic: SimpleMap<any> = new SimpleMap<any>();
		/**
		 * gid
		 */
		public gid: number = 0;

		constructor() {
			for (let item of TableCenter.instance.MonsterTable) {
				this._objClassDic.set(item.id, Monster);
			}
			for (let item of TableCenter.instance.SceneInteractiveObjectTable) {
				if (item.id == GAMEOBJECT_SIGN.RAMDOM_BOX) {
					this._objClassDic.set(item.id, RandomBox);
				}
				else {
					this._objClassDic.set(item.id, SceneInteractiveObject);
				}
			}
			this._objClassDic.set(GAMEOBJECT_SIGN.PAWS, Paws);
		}

		/**
		 * 获得单例
		 */
		public static get instance(): GameObjectFactory {
			if (this._instance == null) {
				this._instance = new GameObjectFactory();
			}
			return this._instance;
		}

		/**
		 * 创建一个catchDoll
		 */
		public creatGameObject(sign: GAMEOBJECT_SIGN, varsData: IGameObjectVars = null, layerType: LAYER = LAYER.MONSTER): any {
			let gameObj: catchDoll.GameObject = null;
			gameObj = GameObjectPool.instance.tryGetGameObjInPool(sign);
			/*资源池无此资源*/
			if (gameObj == null) {
				let className: any = this._objClassDic.get(sign);
				gameObj = new className();
				gameObj.setData(sign, this.gid, varsData, layerType);
				this._loadConfig(sign, gameObj);
				gameObj.initOther();
			}
			else {
				gameObj.setData(sign, this.gid, varsData, layerType);
			}
			gameObj.initialize();
			this._writeInMap(gameObj, varsData);
			this.gid++;
			return gameObj;
		}

		/**
		 * 对象回收
		 */
		public recoverGameObject(gameObj: GameObject): void {
			if (gameObj == null) {
				console.assert(false, "gameObj为空！")
				return;
			}
			if (egret.is(gameObj, "catchDoll.Monster")) {
				if (LevelCreate.inSenceMonsterMap.remove(gameObj.uID)) {
				}
				else {
					console.assert(false, "逻辑有误")
				}
			}
			else if (egret.is(gameObj, "catchDoll.SceneInteractiveObject")) {
				if (LevelCreate.inSceneInterObjMap.remove(gameObj.uID)) {
				}
				else {
					console.assert(false, "逻辑有误")
				}
			}

			gameObj.uninitialize();
			GameObjectPool.instance.recoverGameObject(gameObj);
		}

		/**
		 * 加载资源
		 */
		private _loadConfig(sign: GAMEOBJECT_SIGN, gameObj: GameObject) {
			let configData: IGameObjectConfig = GameObjectConfigParse.configDic.get(sign);
			if (configData) {
				gameObj.loadConfigAsset(configData.configAsset);
				gameObj.loadConfigData(configData.configData);
			}
			else {
				console.assert(false, "找不到sign为" + sign + "资源配置！")
			}
		}

		/**
		 * 写入字典
		 */
		private _writeInMap(gameObj: GameObject, varsData: IGameObjectVars): void {
			if (egret.is(gameObj, "catchDoll.Monster")) {
				if (LevelCreate.inSenceMonsterMap.isExist(gameObj)) {
					console.assert(false, "逻辑有误")
				}
				else {
					LevelCreate.inSenceMonsterMap.set(gameObj.uID, gameObj)
				}
			}
			else if (egret.is(gameObj, "catchDoll.SceneInteractiveObject")) {
				if (LevelCreate.inSceneInterObjMap.isExist(gameObj)) {
					// console.assert(false, "逻辑有误")
				}
				else {
					LevelCreate.inSceneInterObjMap.set(gameObj.uID, gameObj)
				}
			}

		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._objClassDic.clear();
		}
	}
}
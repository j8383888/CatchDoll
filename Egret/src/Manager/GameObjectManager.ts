/**
 * 游戏对象管理器
 * @author suo
 */
module catchDoll {
	export class GameObjectManager {

		/**
		 * 单例
		 */
		private static _instance: GameObjectManager = null;
		/**
		 * 游戏工厂
		 */
		public gameObjectFactory: catchDoll.GameObjectFactory = GameObjectFactory.instance;
		/**
		 * 游戏资源池
		 */
		public gameObjectPool: catchDoll.GameObjectPool = GameObjectPool.instance;
		/**
		 * 游戏对象配置管理
		 */
		public gameObjectConfig: catchDoll.GameObjectConfigParse = new GameObjectConfigParse()

		public constructor() {
		}

		/**
		 * 获得单例
		 */
		public static get instance(): GameObjectManager {
			if (this._instance == null) {
				this._instance = new GameObjectManager();
			}
			return this._instance;
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this.gameObjectPool.dispose();
			this.gameObjectPool = null;
			this.gameObjectFactory.dispose();
			this.gameObjectFactory = null;
			this.gameObjectConfig.dispose();
			this.gameObjectConfig = null;
		}
	}
}
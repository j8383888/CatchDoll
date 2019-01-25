/**
 * 游戏中心
 * @author suo
 */
module catchDoll {
	export class GameCenter extends egret.DisplayObject {

		/*单例*/
		private static _instance: GameCenter = null;
		/*网络*/
		public webSocket: WebSocket;
		/*事件收发中心*/
		public eventManager: EventManager = EventManager.instance;
		/*数据中心*/
		public dataCenter: DataCenter = DataCenter.instance;
		/*游戏对象管理中心*/
		public gameObjectManager: catchDoll.GameObjectManager;
		/*层级管理器*/
		public layerManager: catchDoll.LayerManager;
		/*操作管理器*/
		public operationManager: catchDoll.OperationManager;
		/*舞台宽*/
		public static stageW: number = 0
		/*舞台高*/
		public static stageH: number = 0;


		public constructor() {
			super();
			this._init();
			this.addEventListener(egret.Event.ENTER_FRAME, this._enterFrame, this);
		}

		private _init(): void {
			Laya.init();
			GameCenter.stageW = egret.MainContext.instance.stage.stageWidth;
			GameCenter.stageH = egret.MainContext.instance.stage.stageHeight;
			this.gameObjectManager = GameObjectManager.instance;
			this.layerManager = LayerManager.instance;
			this.operationManager = OperationManager.instance;
			this.webSocket = WebSocket.instance;
		}


		/**
		 * 获得单例
		 */
		public static get instance(): GameCenter {
			if (this._instance == null) {
				this._instance = new GameCenter();
			}
			return this._instance;
		}

		/**
		 * 退出游戏
		 */
		public _leaveRoom() {
			this.dispose();
		}

		/**
		* 帧事件
		*/
		private _enterFrame(e: egret.Event): void {
			Laya.timer.update();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			UICenter.instance.closeAll();
			this.eventManager.dispose();
			this.eventManager = null;
			this.dataCenter.dispose();
			this.dataCenter = null;
			this.layerManager.dispose();
			this.layerManager = null;
			this.operationManager.dispose();
			this.operationManager = null;
			this.gameObjectManager.dispose();
			this.gameObjectManager = null
			this.webSocket.dispose();
			this.webSocket = null;
			Pool.clearAll();


			this.removeEventListener(egret.Event.ENTER_FRAME, this._enterFrame, this);
		}
	}
}
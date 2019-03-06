/**
 * 操作管理器 广义操作管理器 
 * @author suo
 */
module catchDoll {
	export class OperationManager {

		/**
		 * 单例
		 */
		private static _instance: OperationManager;
		/**
		 * 已注册的操作行为字典
		 */
		private _resgisterOprDic: Dictionary = new Dictionary();
		/**
		 * 操作类型映射字典
		 */
		private _operationClsDic: Dictionary = new Dictionary();
		/**
		 * 注册ID
		 */
		private _registerID: number = -1;


		constructor() {
			this._operationClsDic.set(OPERATION_TYPE.MONSTER, MoveOperation);
			this._operationClsDic.set(OPERATION_TYPE.MASTER, MasterOperation);

			Laya.timer.frameLoop(1, this, this._update);
		}

		/**
		 * 更新
		 */
		private _update(): void {
			let values: BaseOperation[] = this._resgisterOprDic.values;
			for (let item of values) {
				item.enterFrame();
			}

			// let len: number = this._resgisterOprDic.length

			// for (let i: number = 0; i < len; i++) {
			// 	let item: BaseOperation = this._resgisterOprDic.values[i];
			// 	// if (egret.is(item, "catchDoll.MonsterOperation")) {
			// 	item.enterFrame()
			// 	// }
			// }
		}


		/**
		 * 获取单例
		 */
		public static get instance(): OperationManager {
			if (this._instance == void 0) {
				this._instance = new OperationManager();
			}
			return this._instance;
		}


		/**
		 * 对某个对象 注册操作方式 返回注册id用于反注册
		 */
		public registerOperation(gameObj: catchDoll.GameObject, opeartionType: OPERATION_TYPE): number {
			if (gameObj == null) {
				console.assert(false, "注册对象为空！")
			}
			let cls = this._operationClsDic.get(opeartionType);
			if (cls == null) {
				console.assert(false, "operation 未被注册！")
			}
			let registerOperation: BaseOperation = new cls();
			registerOperation.operationType = opeartionType;
			registerOperation.register(gameObj);
			this._registerID++;
			this._resgisterOprDic.set(this._registerID, registerOperation);
			return this._registerID;
		}

		/**
		 * 反注册操作
		 */
		public unregisterOperation(registerID: number): void {
			if (registerID == -1) {
				return;
			}
			let operation: BaseOperation = this._resgisterOprDic.get(registerID);
			if (operation != null) {
				operation.unregister();
				operation = null;
				this._resgisterOprDic.remove(registerID);
			}
			else {
				console.assert(false, "registerID不存在！")
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			Laya.timer.clear(this, this._update);
			this._resgisterOprDic.clear();
			this._resgisterOprDic = null;
			this._operationClsDic.clear();
			this._operationClsDic = null;
		}
	}
}
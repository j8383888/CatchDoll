/**
 * 场景可交互对象
 * @author suo
 */
module catchDoll {
	export class SceneInteractiveObject extends GameObjectCollider {
		public constructor() {
			super();
		}

		/**
		 * 注册操作id
		 */
		private _registerAry: number[] = [];

		/**
         * 初始化
         */
		public initialize(): void {
			super.initialize();
			let varsData: ISenceInteractiveVars = this.varsData as ISenceInteractiveVars;


			if (varsData.operation) {
				for (let i: number = 0; i < varsData.operation.length; i++) {
					this._registerAry.push(OperationManager.instance.registerOperation(this, varsData.operation[i].type));
				}
			}
		}

		/**
		 * 移除行为
		 */
		public unregisterOperation(): void {
			for (let i: number = 0; i < this._registerAry.length; i++) {
				OperationManager.instance.unregisterOperation(this._registerAry[i])
			}
			this._registerAry.length = 0;
		}

		/**
         * 反初始化
         */
		public uninitialize(): void {
			this.unregisterOperation();
			super.uninitialize();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._registerAry.length = 0
			super.dispose();
		}
	}
}
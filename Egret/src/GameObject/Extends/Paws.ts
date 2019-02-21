/**
 * 爪子
 */
module catchDoll {
	export class Paws extends GameObjectCollider {
		/**
		 * 注册操作id
		 */
		private _registerAry: number[] = [];
		/**
		 * 夹子容器
		 */
		public pawsSkinBox: PawsSkinBox;

		public constructor() {
			super();
		}



		/**
		 * 只初始化一次（在loadConfigData之后调用）
		 */
		public initOther(): void {
			this.pawsSkinBox = new PawsSkinBox();
			this.confirmRopeHeight();
			this.addChild(this.pawsSkinBox);
		}

		/**
		 * 校准绳子长度
		 */
		public confirmRopeHeight(): void {
			this.pawsSkinBox.rope.height = this.pawsSkinBox.pawsHead.y - this.pawsSkinBox.headImg.y - 15
		}

		/**
		 * 初始化
		 */
		public initialize(): void {
			super.initialize();
			this._registerAry.push(OperationManager.instance.registerOperation(this, OPERATION_TYPE.MASTER));
		}

		/**
		 * 反初始化
		 */
		public uninitialize(): void {
			for (let i: number = 0; i < this._registerAry.length; i++) {
				OperationManager.instance.unregisterOperation(this._registerAry[i])
			}
			this._registerAry.length = 0;
			super.uninitialize();

		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this.pawsSkinBox.dispose();
			this.pawsSkinBox = null;
			super.dispose()
		}
	}
}
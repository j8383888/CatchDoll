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
		public pawsBody: PawsBody;




		public constructor() {
			super();
		}

		/**
         * 初始化一次
         */
		public loadConfigData(data: IColliderConfigData): void {
			this.pawsBody = new PawsBody();
			for (let i: number = 0; i < data.colliderAry.length; i++) {
				let colliderData: ICollider = data.colliderAry[i];
				let collider: catchDoll.Collider = Collider.creat(colliderData.posX, colliderData.posY, colliderData.radius)
				collider.setParent(this.pawsBody.pawsHead);
				this.colliderAry.push(collider);
			}
		}

		/**
		 * 未捕获动作
		 */
		public noCatchAction(): void {
			egret.Tween.get(this.pawsBody.pawsHead, {
				onChange: () => {
					this.confirmRopeHeight();
				}
			}
			).wait(100).to({ y: this.pawsBody.pawsHeadStartPosY }, 600, egret.Ease.getBackOut(1.3)).call(() => {
				this.pawsBody.isDown = false;
			})
		}



		/**
		 * 只初始化一次（在loadConfigData之后调用）
		 */
		public initOther(): void {
			this.confirmRopeHeight();
			this.addChild(this.pawsBody);
		}

		/**
		 * 校准绳子长度
		 */
		public confirmRopeHeight(): void {
			this.pawsBody.rope.height = this.pawsBody.pawsHead.y - this.pawsBody.headImg.y - 15
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
			this.pawsBody.dispose();
			this.pawsBody = null;
			super.dispose()
		}
	}
}
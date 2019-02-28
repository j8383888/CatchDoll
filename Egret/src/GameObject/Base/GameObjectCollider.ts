/**
 * 带碰撞器的物体对象
 * @author suo
 */
module catchDoll {
	export class GameObjectCollider extends GameObjectRender {

		/**
		 * 碰撞器
		 */
		public colliderAry: catchDoll.Collider[] = [];
		/**
		 * 是否已经发生碰撞
		 */
		public isCollided: boolean = false;


		public constructor() {
			super()
		}

		/**
         * 初始化一次
         */
		public loadConfigData(data: IColliderConfigData): void {
			super.loadConfigData(data);
			for (let i: number = 0; i < data.colliderAry.length; i++) {
				let colliderData: ICollider = data.colliderAry[i];
				let collider: catchDoll.Collider = Collider.creat(colliderData.posX, colliderData.posY, colliderData.radius)
				collider.setParent(this);
				this.colliderAry.push(collider);
			}
		}

		/**
		 * 反初始化
		 */
		public uninitialize(): void {
			this.isCollided = false;


			super.uninitialize();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			if (this.colliderAry.length != 0) {
				for (let i: number = 0; i < this.colliderAry.length; i++) {
					this.colliderAry[i].recover();
				}
				this.colliderAry.length = 0;
			}
			super.dispose();
		}
	}
}
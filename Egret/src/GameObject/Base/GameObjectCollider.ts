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
		 * 是否打开碰撞器
		 */
		public isOpen: boolean = true;
		


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
         * 初始化
         */
		public initialize(): void {
			super.initialize();
			this.isOpen = true;
		}

		/**
		 * 是否相交
		 */
		public static isIntersect(c1: catchDoll.Collider[], c2: catchDoll.Collider[]): boolean {
			let len = c1.length;
			let len2 = c2.length;
			for (let i: number = 0; i < len; i++) {
				let colliderA = c1[i];
				for (let j: number = 0; j < len2; j++) {
					let colliderB = c2[j]
					if (Collider.isIntersect(colliderA, colliderB)) {
						return true;
					}
				}
			}
			return false;
		}

		/**
		 * 反初始化
		 */
		public uninitialize(): void {
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
				this.colliderAry = null;
			}
			super.dispose();
		}
	}
}
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
		 * 陷阱范围
		 */
		public hitMonsterColliderAry: catchDoll.Collider[] = [];
		/**
		 * 打开
		 */
		public isMonsterHitOpen: boolean = false;
		/**
		 * 是否静态
		 */
		public isStatic: boolean = true;
		/**
		 * 动作名字列表
		 */
		public actionNameAry: string[] = []


		/**
         * 初始化一次
         */
		public loadConfigData(data: ISceneInteractiveObjectConfig): void {
			super.loadConfigData(data);
			this.actionNameAry = data.actionNameAry;
			for (let i: number = 0; i < data.hitMonsterColliderAry.length; i++) {
				let colliderData: ICollider = data.hitMonsterColliderAry[i];
				let collider: catchDoll.Collider = Collider.creat(colliderData.posX, colliderData.posY, colliderData.radius)
				collider.setParent(this);
				this.hitMonsterColliderAry.push(collider);
			}
		}

		/**
		 * 播放放大效果
		 */
		public playEnlargeEff(): void {
			this._dragonBones.animation.play("enlarge", 1)
			this._dragonBones.once(dragonBones.EventObject.COMPLETE, this.onEnLargeEffComplete, this)
		}

		/**
		 * 放大效果完毕
		 */
		public onEnLargeEffComplete(): void {
			this._dragonBones.animation.play("loop", 0)
		}

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
			else {
				this.isStatic = true;
				let interObjColliderAry = this.colliderAry
				let interObjColliderAryLen = interObjColliderAry.length;
				for (let m: number = 0; m < interObjColliderAryLen; m++) {
					let interObjCollider = interObjColliderAry[m]
					interObjCollider.setGlobePos();
				}

				let hitMonsterColliderAry = this.hitMonsterColliderAry
				let hitMonsterColliderAryLen = hitMonsterColliderAry.length;
				for (let m: number = 0; m < hitMonsterColliderAryLen; m++) {
					let hitMonsterCollider = hitMonsterColliderAry[m]
					hitMonsterCollider.setGlobePos();
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
			if (this._dragonBones) {
				this._dragonBones.removeDBEventListener(dragonBones.EventObject.COMPLETE, this.onEnLargeEffComplete, this)
			}
			this.unregisterOperation();
			super.uninitialize();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			if (this.hitMonsterColliderAry.length != 0) {
				for (let i: number = 0; i < this.hitMonsterColliderAry.length; i++) {
					this.hitMonsterColliderAry[i].recover();
				}
				this.hitMonsterColliderAry.length = 0;
				this.hitMonsterColliderAry = null;
			}
			this._registerAry.length = 0
			super.dispose();
		}
	}
}
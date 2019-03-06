/**
 * 麻痹陷阱
 * @author suo
 */
module catchDoll {
	export class ParalyticTrap extends SceneInteractiveObject {

		/**
		 * 打开
		 */
		public isOpen: boolean = false;
		/**
		 * 陷阱范围
		 */
		public trapColliderAry: catchDoll.Collider[] = [];

		public constructor() {
			super();
		}

		public initialize(): void {
			super.initialize();

			this.isOpen = false;
			this._dragonBones.animation.gotoAndStopByFrame("start", 1);

		}

		/**
          * 只初始化一次（在loadConfig之后调用）
          */
		public initOther(): void {
			this._dragonBones.animation.timeScale = 0.8;
			let collider: catchDoll.Collider = Collider.creat(0, 0, 10)
			collider.setParent(this);
			this.trapColliderAry.push(collider);
		}


		/**
		 * 打开
		 */
		public onOpen(): void {
			this.isOpen = true;
			this._dragonBones.animation.play("start", 1);
			this._dragonBones.once(dragonBones.EventObject.COMPLETE, this._onComplete, this)
		}

		/**
		 * 播放完毕
		 */
		private _onComplete(): void {
			this._dragonBones.animation.play("loop", 0);
			LevelCreate.InterObjHitMonsterMap.set(this.uID, this);
		}

		/**
		 * 反初始化
		 */
		public uninitialize(): void {
			LevelCreate.InterObjHitMonsterMap.remove(this.uID);
			this._dragonBones.removeDBEventListener(dragonBones.EventObject.COMPLETE, this._onComplete, this)
			super.uninitialize();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			if (this.trapColliderAry.length != 0) {
				for (let i: number = 0; i < this.trapColliderAry.length; i++) {
					this.trapColliderAry[i].recover();
				}
				this.trapColliderAry.length = 0;
				this.trapColliderAry = null;
			}
			super.dispose();
		}
	}
}
/**
 * 麻痹陷阱
 * @author suo
 */
module catchDoll {
	export class ParalyticTrap extends SceneInteractiveObject {


		public constructor() {
			super();
		}

		public initialize(): void {
			super.initialize();
			this.isMonsterHitOpen = false;
			this._dragonBones.animation.gotoAndStopByProgress("enlarge", 100);
		}

		/**
          * 只初始化一次（在loadConfig之后调用）
          */
		public initOther(): void {
			this._dragonBones.animation.timeScale = 0.8;
		}


		/**
		 * 打开
		 */
		public openMonsterHit(): void {
			// this._dragonBones.animation.play("start", 1);
			// this._dragonBones.once(dragonBones.EventObject.COMPLETE, this._onComplete, this)
			this._onComplete();
		}

		/**
		 * 播放放大效果
		 */
		public playEnlargeEff(): void {
			this.isOpen = false;
			this._dragonBones.animation.play("enlarge", 1)
			this._dragonBones.once(dragonBones.EventObject.COMPLETE, this.onEnLargeEffComplete, this)
		}



		/**
		 * 播放完毕
		 */
		private _onComplete(): void {
			this.isMonsterHitOpen = true;
			this._dragonBones.animation.play("loop", 0);
		}

		/**
		 * 关闭
		 */
		public close(): void {
			this.isMonsterHitOpen = false;
			this._dragonBones.animation.gotoAndStopByProgress("enlarge", 100);
		}

		/**
		 * 放大效果完毕
		 */
		public onEnLargeEffComplete(): void {
			this.isMonsterHitOpen = true;
			this._dragonBones.animation.play("loop", 0)
		}

		/**
		 * 反初始化
		 */
		public uninitialize(): void {
			this._dragonBones.removeDBEventListener(dragonBones.EventObject.COMPLETE, this._onComplete, this)
			super.uninitialize();
		}

		/**
		 * 释放
		 */
		public dispose(): void {

			super.dispose();
		}
	}
}
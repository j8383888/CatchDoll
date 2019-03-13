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
			this._dragonBones.animation.gotoAndStopByFrame("start", 1);
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
			
			this.isOpen = false;
			this._dragonBones.animation.play("start", 1);
			this._dragonBones.once(dragonBones.EventObject.COMPLETE, this._onComplete, this)
		}

		

		/**
		 * 播放完毕
		 */
		private _onComplete(): void {
			this.isMonsterHitOpen = true;
			this._dragonBones.animation.play("loop", 0);
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
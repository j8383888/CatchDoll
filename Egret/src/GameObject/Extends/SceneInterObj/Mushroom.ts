module catchDoll {
	export class Mushroom extends SceneInteractiveObject {
		public constructor() {
			super();
		}

		public initialize(): void {
			super.initialize();
			this.isMonsterHitOpen = false;
			this._dragonBones.animation.play(this.actionNameAry[1], 0);
			Laya.timer.once(5000, this, this._onTrigger)
		}

		/**
		 * 触发
		 */
		private _onTrigger(): void {
			this._dragonBones.animation.play(this.actionNameAry[0], 1);
			this._dragonBones.once(dragonBones.EgretEvent.COMPLETE, this._onComplete, this)
		}

		/**
		 * 动画完毕
		 */
		private _onComplete(): void {
			this._dragonBones.animation.play(this.actionNameAry[1], 0);
			Laya.timer.once(5000, this, this._onTrigger);
		}

		public uninitialize(): void {
			this._dragonBones.removeEventListener(dragonBones.EgretEvent.COMPLETE, this._onComplete, this);
			Laya.timer.clear(this, this._onTrigger)
			super.uninitialize();
		}
	}
}
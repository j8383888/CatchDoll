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

			this._dragonBones.animation.gotoAndStopByFrame("start", 1);
			Laya.timer.once(500, this, this._onStart)

		}

		/**
          * 只初始化一次（在loadConfig之后调用）
          */
		public initOther(): void {
			// this._dragonBones.animation.timeScale = 0.5;
		}


		private _onStart(): void {
			this._dragonBones.animation.play("start", 1);
			this._dragonBones.once(dragonBones.EventObject.COMPLETE, this._onComplete, this)
		}

		private _onComplete(): void {
			this._dragonBones.animation.play("loop", 0);
		}

		/**
		 * 反初始化
		 */
		public uninitialize(): void {
			Laya.timer.clear(this, this._onStart);
			this._dragonBones.removeDBEventListener(dragonBones.EventObject.COMPLETE, this._onComplete, this)
			super.uninitialize();
		}
	}
}
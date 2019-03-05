/**
 * 随机箱子
 */
module catchDoll {
	export class RandomBox extends SceneInteractiveObject {


		public constructor() {
			super();
		}

		public initialize(): void {
			super.initialize();
		}

		/**
		 * 播放动画
		 */
		public playDieEff(): void {
			this.imagePlayer.visible = false;

			this._moviePlayer.play("burst", 1, 0, Handler.create(this, this._cb, null, true))
			let varsData: IRandomBox = this.varsData as IRandomBox;
			let random = Math.random()
			for (let item of varsData.carrySubitem) {
				if (random < item.weightOdds) {
					let varsData: ISenceInteractiveVars = <ISenceInteractiveVars>{};
					varsData.bornX = this.x;
					varsData.bornY = this.y
					GameObjectFactory.instance.creatGameObject(item.id, varsData, LAYER.SCENE_INTERACTIVE_LOW)
					break;
				}
			}
		}

		private _cb(): void {
			GameObjectFactory.instance.recoverGameObject(this);
		}
	}
}
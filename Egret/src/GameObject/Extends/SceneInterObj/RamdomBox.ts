/**
 * 随机箱子
 */
module catchDoll {
	export class RandomBox extends SceneInteractiveObject {


		public constructor() {
			super();
		}

		public initOther(): void {
			super.initOther()
		}

		public initialize(): void {
			super.initialize();
			let mov = this._moviePlayer.getMovieClipByKey("burst")
			mov.gotoAndStop(1);
			mov.visible = true;
		}

		/**
		 * 播放动画
		 */
		public playDieEff(): void {

			this._moviePlayer.play("burst", 1, 0, Handler.create(this, this._cb, null, true))
			let randomVarsData: IRandomBox = this.varsData as IRandomBox;
			let random = Math.random()
			for (let item of randomVarsData.carrySubitem) {
				if (random < item.weightOdds) {
					let varsData: ISenceInteractiveVars = <ISenceInteractiveVars>{};
					varsData.bornX = this.x + item.offsetX;
					varsData.bornY = this.y + item.offsetY;
					Laya.timer.once(500, null, () => {
						let gameObj: SceneInteractiveObject = GameObjectFactory.instance.creatGameObject(item.id, varsData, LAYER.SCENE_INTERACTIVE_LOW)
						gameObj.playEnlargeEff();
					})
					break;
				}
			}
		}

		private _cb(): void {
			GameObjectFactory.instance.recoverGameObject(this);
		}
	}
}
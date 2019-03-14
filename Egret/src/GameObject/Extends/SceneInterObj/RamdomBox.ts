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
			this._moviePlayer.y -= 40
		}

		public initialize(): void {
			super.initialize();
			this.imagePlayer.visible = true
		}

		/**
		 * 播放动画
		 */
		public playDieEff(): void {
			this.imagePlayer.visible = false;

			this._moviePlayer.play("burst", 1, 0, Handler.create(this, this._cb, null, true))
			let randomVarsData: IRandomBox = this.varsData as IRandomBox;
			let random = Math.random()
			for (let item of randomVarsData.carrySubitem) {
				if (random < item.weightOdds) {
					let varsData: ISenceInteractiveVars = <ISenceInteractiveVars>{};
					varsData.bornX = this.x + item.offsetX;
					varsData.bornY = this.y + item.offsetY;
					let gameObj = GameObjectFactory.instance.creatGameObject(item.id, varsData, LAYER.SCENE_INTERACTIVE_LOW)
					if (item.id == GAMEOBJECT_SIGN.PARALYTIC_TRAP) {
						let paralyticTrap = gameObj as ParalyticTrap
						paralyticTrap.isOpen = false;
						Laya.timer.once(500, null, () => {
							paralyticTrap.openMonsterHit();
						})
					}

					break;
				}
			}
		}

		private _cb(): void {
			GameObjectFactory.instance.recoverGameObject(this);
		}
	}
}
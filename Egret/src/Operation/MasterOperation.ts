/**
 * 主角控制器
 */
module catchDoll {
	export class MasterOperation extends BaseOperation {

		/**
		 * 宿主对象
		 */
		public _gameObj: Paws;;
		/**
		 * 是否向左
		 */
		private _isLeft: boolean = false;


		public constructor() {
			super();
		}

		/**
	 	 * 注册
	 	 */
		public register(gameObj: catchDoll.GameObject): void {
			this._gameObj = gameObj as Paws;
			EventManager.registerEvent(EVENT_ID.MASTER_MOVE, Handler.create(this, this._masterMove));
			EventManager.registerEvent(EVENT_ID.MASTER_DOWN, Handler.create(this, this._masterDown));
		}

		/**
		 * 下钩子
		 */
		private _masterDown(): void {
			if (this._gameObj.isDown) {
				return;
			}
			this._gameObj.isDown = true;
			LevelCreate.instance.isCheck = true;
			// Laya.timer.once(600, null, () => {
			// 	this._gameObj.downEff.gotoAndPlay(1, 1);
			// 	this._gameObj.downEff.once(egret.MovieClipEvent.COMPLETE, () => {
			// 		this._gameObj.downEff.gotoAndStop(1);
			// 	}, null)
			// })
			egret.Tween.get(this._gameObj.pawsSkinBox.pawsHead, {
				onChange: () => {
					this._gameObj.confirmRopeHeight();
				}
			}).wait(100).to({ y: 660 }, 500, egret.Ease.quadIn).call(() => {
				LevelCreate.instance.isCheck = false;
				this._noCatchAction();
			});
		}

		private _noCatchAction(): void {
			egret.Tween.get(this._gameObj.pawsSkinBox.pawsHead, {
				onChange: () => {
					this._gameObj.confirmRopeHeight();
				}
			}
			).wait(300).to({ y: this._gameObj.pawsSkinBox.pawsHeadStartPosY }, 600, egret.Ease.getBackOut(1.3)).call(() => {
				this._gameObj.isDown = false;
			})
		}


		/**
		 * 玩家移动
		 */
		private _masterMove(isLeft: boolean): void {
			this._isLeft = isLeft
		}


		/**
         * 反注册
         */
		public unregister(): void {
			// Laya.timer.clear(this, this._addMonster)
			egret.Tween.removeTweens(this._gameObj.pawsSkinBox.pawsHead);
			this._gameObj.pawsSkinBox.pawsHead.y = this._gameObj.pawsSkinBox.pawsHeadStartPosY
			this._gameObj.confirmRopeHeight();

			EventManager.unregisterEvent(EVENT_ID.MASTER_MOVE, this, this._masterMove);
			EventManager.unregisterEvent(EVENT_ID.MASTER_DOWN, this, this._masterDown);
		}

		/**
		 * 帧循环
		 */
		public enterFrame(): void {
			if (this._gameObj.isDown) {
				return;
			}
			let moveSpeed: number = 2.5;
			if (this._isLeft) {
				if (this._gameObj.x - moveSpeed > 10) {
					this._gameObj.x -= moveSpeed
				}
				else {
					this._isLeft = false;
				}
			}
			else {
				if (this._gameObj.x + moveSpeed < GameCenter.stageW - 20) {
					this._gameObj.x += moveSpeed
				}
				else {
					this._isLeft = true;
				}
			}
		}
	}
}
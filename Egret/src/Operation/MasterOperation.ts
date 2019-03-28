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
			EventManager.registerEvent(EVENT_ID.MASTER_DOWN, Handler.create(this, this._masterDown));
			EventManager.registerEvent(EVENT_ID.MASTER_LEFT_RIGHT, Handler.create(this, this._masterRightLeft));
		}

		private _masterRightLeft(isLeft: boolean): void {
			this._isLeft = isLeft;
		}

		/**
		 * 下钩子
		 */
		private _masterDown(): void {
			if (this._gameObj.pawsBody.isDown) {
				return;
			}
			this._gameObj.pawsBody.isDown = true;
			this._gameObj.isOpen = true;

			egret.Tween.get(this._gameObj.pawsBody.pawsHead, {
				onChange: () => {
					this._gameObj.confirmRopeHeight();
				}
			}).wait(this._gameObj.pawsBody.actionBefore * 1000).to({ y: 780 }, 1000, egret.Ease.quadIn).wait(100).call(() => {
				this._gameObj.isOpen = false;
				this._gameObj.noCatchActionFast();
			});
		}


		/**
         * 反注册
         */
		public unregister(): void {

			egret.Tween.removeTweens(this._gameObj.pawsBody.pawsHead);
			this._gameObj.pawsBody.pawsHead.y = this._gameObj.pawsBody.pawsHeadStartPosY
			this._gameObj.confirmRopeHeight();

			EventManager.unregisterEvent(EVENT_ID.MASTER_DOWN, this, this._masterDown);
			EventManager.unregisterEvent(EVENT_ID.MASTER_LEFT_RIGHT, this, this._masterRightLeft);
		}

		/**
		 * 帧循环
		 */
		public enterFrame(): void {
			if (this._gameObj.pawsBody.isDown) {
				return;
			}

			let moveSpeed: number = 4;
			if (this._isLeft) {
				if (this._gameObj.x - moveSpeed > 10) {
					this._gameObj.x -= moveSpeed
				}
				else {
					this._isLeft = false;
				}
			}
			else {
				if (this._gameObj.x + moveSpeed < 720 - 20) {
					this._gameObj.x += moveSpeed
				}
				else {
					this._isLeft = true;
				}
			}
			// if (this._gameObj.x > 1920 - value || this._gameObj.x < value) {
			// 	return;
			// }
			// if (this._isLeft) {
			// 	this._sceneBox.x += moveSpeed;
			// 	this._monsterBox.x += moveSpeed;
			// }
			// else {
			// 	this._sceneBox.x -= moveSpeed;
			// 	this._monsterBox.x -= moveSpeed;

			// }
		}
	}
}
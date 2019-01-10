module catchDoll {
	export class MonsterOperation extends BaseOperation {

		/**
		 * 宿主对象
		 */
		public _gameObj: Monster;
		/**
		 * 是否反转
		 */
		public isReverse: boolean = false;

		public constructor() {
			super();
		}

		/**
	 	 * 注册
	 	 */
		public register(gameObj: catchDoll.GameObject): void {
			this._gameObj = gameObj as Monster;
		}

		/**
         * 反注册
         */
		public unregister(): void {
		}

		/**
		 * 帧循环
		 */
		public enterFrame(): void {
			if (this._gameObj.x > GameCenter.stageW) {
				this.isReverse = true;
			}
			else if (this._gameObj.x < 0) {
				this.isReverse = false;
			}
			if (this.isReverse) {
				if (this._gameObj.imagePlayer) {
					this._gameObj.imagePlayer.scaleX = -1;
				}
				this._gameObj.x -= this._gameObj.speed;
			}
			else {
				if (this._gameObj.imagePlayer) {
					this._gameObj.imagePlayer.scaleX = 1;
				}
				this._gameObj.x += this._gameObj.speed;
			}
		}
	}
}
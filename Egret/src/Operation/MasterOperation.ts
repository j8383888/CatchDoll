/**
 * 主角控制器
 */
module catchDoll {
	export class MasterOperation extends BaseOperation {

		/**
		 * 宿主对象
		 */
		public _gameObj: Paws;
		/**
		 * 正在下钩子
		 */
		private _isDown: boolean = false;
		/**
		 * 是否向左
		 */
		private _isLeft: boolean = false;
		/**
		 * 抓住的娃娃
		 */
		private _catchMonster: Monster = null;

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
			if (this._isDown) {
				return;
			}
			this._isDown = true;
			// Laya.timer.once(600, null, () => {
			// 	this._gameObj.downEff.gotoAndPlay(1, 1);
			// 	this._gameObj.downEff.once(egret.MovieClipEvent.COMPLETE, () => {
			// 		this._gameObj.downEff.gotoAndStop(1);
			// 	}, null)
			// })
			this._catchMonster = null;
			egret.Tween.get(this._gameObj.pawsHead, {
				onChange: () => {
					this._gameObj.confirmRopeHeight();
				}
			}).wait(100).to({ y: 660 }, 500, egret.Ease.quadIn).call(() => {
				let monsterMap: Dictionary = LevelCreate.inSenceMonsterMap;
				let globePosx: number = this._gameObj.x;
				for (let i: number = 0; i < monsterMap.length; i++) {
					let monster: Monster = monsterMap.values[i];
					let monsterGlobePosx: number = monster.x;
					egret.log("钩子跟怪的距离：" + Math.abs(monsterGlobePosx - globePosx));
					if (Math.abs(monsterGlobePosx - globePosx) <= 60) {
						this._catchMonster = monster;
						break;
					}
				}
				if (this._catchMonster) {
					/*血条缩短*/
					let targetWidth: number = 0;
					this._catchMonster.life -= this._gameObj.hurt;

					if (this._catchMonster.life <= 0) {
						this._catchMonster.life = 0;
						targetWidth = 0;
						this._catchMonster.x = this._gameObj.x;
						this._catchMonster.y = this._gameObj.pawsHead.y + 300;
						this._catchMonster.unregisterOperation();
					}
					else {
						egret.log(this._catchMonster.life + " " + this._catchMonster.maxLife + " " + this._catchMonster.haemalStrandWidth)
						targetWidth = this._catchMonster.life / this._catchMonster.maxLife * this._catchMonster.haemalStrandWidth;
					}
					egret.log("targetWidth:" + targetWidth)
					egret.Tween.get(this._catchMonster.haemalStrand).to({ width: targetWidth }, 300, egret.Ease.quadIn).call(() => {
						if (targetWidth == 0) {
							egret.Tween.get(this._gameObj.pawsHead, {
								onChange: this._pwdUpAction,
								onChangeObj: this
							}).wait(200).to({ y: this._gameObj.pawsHeadStartPosY }, 600, egret.Ease.quadIn).call(() => {
								GameObjectFactory.instance.recoverGameObject(this._catchMonster);
								this._catchMonster = null;
								this._isDown = false;
					 			/*抓住了就2s后再创建一个*/
								// Laya.timer.once(2000, this, this._addMonster)

							});
						}
						else {
							this._noCatchAction();
						}
					});
				}
				else {
					this._noCatchAction();
				}
			});

		}

		private _noCatchAction(): void {
			egret.Tween.get(this._gameObj.pawsHead, {
				onChange: () => {
					this._gameObj.confirmRopeHeight();
				}
			}
			).wait(300).to({ y: this._gameObj.pawsHeadStartPosY }, 600, egret.Ease.getBackOut(1.3)).call(() => {
				this._isDown = false;
			})
		}

		/**
		 * 爪子上提动作
		 */
		private _pwdUpAction(): void {

			this._gameObj.confirmRopeHeight();
			if (this._catchMonster) {
				this._catchMonster.x = this._gameObj.x;
				this._catchMonster.y = this._gameObj.pawsHead.y + 300;
			}
		}

		// /**
		//  * 添加一个怪物
		//  */
		// private _addMonster(): void {
		// 	EventManager.fireEvent(EVENT_ID.CREAT_MONSTER);
		// }


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
			egret.Tween.removeTweens(this._gameObj.pawsHead);
			this._gameObj.pawsHead.y = this._gameObj.pawsHeadStartPosY
			this._gameObj.confirmRopeHeight();
			if (this._catchMonster) {
				egret.Tween.removeTweens(this._catchMonster.haemalStrand)
				this._catchMonster = null;
			}
			EventManager.unregisterEvent(EVENT_ID.MASTER_MOVE, this, this._masterMove);
			EventManager.unregisterEvent(EVENT_ID.MASTER_DOWN, this, this._masterDown);
		}

		/**
		 * 帧循环
		 */
		public enterFrame(): void {
			if (this._isDown) {
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
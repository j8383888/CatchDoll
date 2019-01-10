/**
 * 战斗控制器
 * 鱼跃此时海，花开彼岸天
 * @author suo
 */
module catchDoll {
	export class BattleSceneControl extends BaseUIControl {
		/*视图*/
		private _view: BattleSceneView;
		/**
		 * 时间值
		 */
		private _timeNum: number = 30;

		public constructor() {
			super();
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this._view = this._viewCenter.getView(BattleSceneView);
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			catchDoll.LevelCreate.instance.init();
			this._view.rightBtn.mouseClickHandler = Handler.create(this, this._clickRightBtn);
			this._view.leftBtn.mouseClickHandler = Handler.create(this, this._clickLeftBtn);
			this._view.middleBtn.mouseClickHandler = Handler.create(this, this._clickMiddleBtn);
			this._view.returnBtn.mouseClickHandler = Handler.create(this, this._clickReturnBtn);
			this._view.timeLabel.text = this._timeNum.toString();
			Laya.timer.loop(1000, this, this._updateTime)

			this._view.propBtn1.mouseClickHandler = Handler.create(null, () => {
				this._view.propBtn1.visible = false;
				this._view.propBtn2.root.scaleX = this._view.propBtn2.root.scaleY = 0;
				for (let i: number = 1; i < 5; i++) {
					let item: eui.Image = this._view.skin["prop" + i] as eui.Image;
					item.scaleX = item.scaleY = 0;
				}

				egret.Tween.get(this._view.propBox).to({ x: 0 }, 500, egret.Ease.quadIn).call(() => {
					egret.Tween.get(this._view.propBtn2.root).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
					for (let i: number = 1; i < 5; i++) {
						let item: eui.Image = this._view.skin["prop" + i] as eui.Image;
						egret.Tween.get(item).wait(i * 100).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
					}
				});
			});

			this._view.propBtn2.mouseClickHandler = Handler.create(null, () => {
				this._view.propBtn2.enabled = false;
				egret.Tween.get(this._view.propBox).to({ x: -this._view.propBox.width }, 500, egret.Ease.quadIn).call(() => {
					this._view.propBtn1.visible = true;
					this._view.propBtn2.enabled = true;
				});
			});
		}

		/**
		 * 更新时间
		 */
		private _updateTime(): void {
			this._timeNum--;
			if (this._timeNum < 0) {
				SimpleUICenter.instance.openUI(SIMPLE_UI.SettlePanel, { starNum: 3, itemID: 1 });
				Laya.timer.clear(this, this._updateTime)
			}
			else if (this._timeNum < 5) {
				this._view.timeLabel.text = this._timeNum.toString();
				this._view.timeLabel.textColor = ColorUtil.COLOR_RED;
				egret.Tween.get(this._view.timeLabel).to({ scaleX: 1.5, scaleY: 1.5 }, 500, egret.Ease.quadIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.quadIn);
			}
			else {
				this._view.timeLabel.text = this._timeNum.toString();
				this._view.timeLabel.textColor = ColorUtil.COLOR_WHITE;
			}
		}

		/**
		 * 点击返回按钮
		 */
		private _clickReturnBtn(): void {
			LevelCreate.instance.dispose();
			UICenter.instance.closeUI(commonUI.BattleScene);
			UICenter.instance.openUI(commonUI.SelectLevel);
		}

		/**
		 * 点击右按钮
		 */
		private _clickMiddleBtn(): void {
			EventManager.fireEvent(EVENT_ID.MASTER_DOWN);
		}

		/**
		 * 点击右按钮
		 */
		private _clickRightBtn(): void {
			EventManager.fireEvent(EVENT_ID.MASTER_MOVE, false);
		}

		/**
		 * 点击右按钮
		 */
		private _clickLeftBtn(): void {
			EventManager.fireEvent(EVENT_ID.MASTER_MOVE, true);
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			Laya.timer.clear(this, this._updateTime)
			egret.Tween.removeTweens(this._view.timeLabel)
			this._view = null;
			super.dispose();
		}
	}
}
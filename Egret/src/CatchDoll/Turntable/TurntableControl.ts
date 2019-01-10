/**
 * 控制器模板
 * @author suo
 */
module catchDoll {
	export class TurntableControl extends BaseUIControl {
		/*视图*/
		private _view: TurntableView;
		/*获奖视图*/
		private _gainView: TurntableGainPanelView;

		public constructor() {
			super();
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this._view = this._viewCenter.getView(TurntableView);
			this._gainView = this._viewCenter.getView(TurntableGainPanelView);
			this._view.startBtn.mouseClickHandler = Handler.create(this, this._onClickStartBtn);
		}

		/**
		 * 点击开始按钮
		 */
		private _onClickStartBtn(): void {
			this._view.showEff()
			egret.Tween.removeTweens(this._view.getFont)
			this._view.commonCloseBtn.enabled = false;
			this._view.startBtn.enabled = false;
			let award: TURNTABLE_AWARD = MathUtil.random(TURNTABLE_AWARD.COIN_1, TURNTABLE_AWARD.COIN_15);
			let roundNum: number = 30;
			let endRotation: number = 360 * roundNum + TurntableData.awardMap.get(award).rotation;
			egret.Tween.get(this._view.eff).to({ frameRate: 60 }, roundNum * 100, egret.Ease.quadIn).to({ frameRate: 5 }, roundNum * 100, egret.Ease.quadOut);
			egret.Tween.get(this._view.turnTableBody).to({ rotation: endRotation }, roundNum * 200, egret.Ease.cubicInOut).wait(800).call(() => {
				this._view.hideEff()
				this._view.showCloseEff(Handler.create(null, () => {
					this._gainView.addToStage();
					this._gainView.showResult(award);
				}))
			});
		}

		/**
		 * 显示时
		 */
		public onShow(): void {

		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._view = null;
			this._gainView = null;
			super.dispose();
		}
	}
}
/**
 * 控制器模板
 * @author suo
 */
module catchDoll {
	export class BattleEnterPanelControl extends BaseUIControl {
		/*视图*/
		private _view: BattleEnterPanelView;

		public constructor() {
			super();
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this._view = this._viewCenter.getView(BattleEnterPanelView);
			this._view.startBtn.mouseClickHandler = Handler.create(this, this._onClickStart)
		}

		/**
		 * 点击开始
		 */
		private _onClickStart(): void {
			this._view.startBtn.enabled = false;
			let coin: egret.MovieClip = Pool.getItemByCreateFun(Pool.rotationCoin, Handler.create(UIUtil, UIUtil.creatMovieClip, ["coinRotation"], true));
			coin.gotoAndPlay(1, -1);
			coin.x = 205;
			coin.y = 50;
			let targetX: number = this._view.endPos.localToGlobal().x;
			let targetY: number = this._view.endPos.localToGlobal().y;
			LayerManager.instance.addToLayer(coin, LAYER.EFFECT);
			egret.Tween.get(coin).to({ x: targetX, y: targetY }, 1000, egret.Ease.quadIn).call(() => {

				Master.instance.sendItemUpdateMsg(PROP_ID.MONEY, -2);
			}).wait(1000).call(() => {
				coin.stop();
				LayerManager.instance.removeFromLayer(coin, LAYER.EFFECT);
				UICenter.instance.closeUI(commonUI.WorldMap);
				UICenter.instance.closeUI(commonUI.BattleEnterPanel);
				UICenter.instance.openUI(commonUI.BattleScene);
			});
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this._view.closeBtnHandler = Handler.create(null, () => { UICenter.instance.closeUI(commonUI.BattleEnterPanel) }, null, true);
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._view = null;
			super.dispose();
		}
	}
}
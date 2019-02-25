/**
 * 控制器模板
 * @author suo
 */
module catchDoll {
	export class WorldMapControl extends BaseUIControl {
		/*视图*/
		private _view: WorldMapView;

		public constructor() {
			super();
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this._view = this._viewCenter.getView(WorldMapView);

		}

		/**
		 * 点击选择关卡按钮
		 */
		private _onClickLevelBtn(): void {
			UICenter.instance.openUI(commonUI.BattleEnterPanel);
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			let view: FunctionUIView = UICenter.instance.getManager(commonUI.FunctionUI).getView(FunctionUIView);
			view.visible = true;

			for (let item of this._view.chapterBtns) {
				item.mouseClickHandler = Handler.create(this, this._onClickChapter)
			}

			this._view.rankBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.rankPanel);
			})
			this._view.turnTableBtn.mouseClickHandler = Handler.create(this, this._onClicTurnTable)
			this._view.shopBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.ShopPanel);
			})
			this._view.inventBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.SettlePanel, { starNum: 3, itemID: 1 });
			})
		}

		private _onClickChapter(btn: Button): void {
			let chapterID = btn.data;
			SimpleUICenter.instance.openUI(SIMPLE_UI.BattleSelect, chapterID)

		}

		/**
		 * 点击转盘按钮
		 */
		private _onClicTurnTable(): void {
			UICenter.instance.openUI(commonUI.TurnTable)
		}



		/**
		 * 释放
		 */
		public dispose(): void {
			let view: FunctionUIView = UICenter.instance.getManager(commonUI.FunctionUI).getView(FunctionUIView);
			view.visible = false;
			this._view = null;
			super.dispose();
		}
	}
}
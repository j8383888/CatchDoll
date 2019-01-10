/**
 * 转盘获得面板控制器
 * @author suo
 */
module catchDoll {
	export class TurntableGainPanelControl extends BaseUIControl {
		/*视图*/
		private _view: TurntableGainPanelView;

		public constructor() {
			super();
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this._view = this._viewCenter.getView(TurntableGainPanelView);

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
			super.dispose();
		}
	}
}
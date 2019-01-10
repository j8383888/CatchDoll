/**
 * 控制器模板
 * @author suo
 */
module catchDoll {
	export class SetUpPanelControl extends BaseUIControl{
		/*视图*/
		private _view:SetUpPanelView;

		public constructor() {
			super();
		}

		/**
		 * 初始化
		 */
		public onInit():void{
			this._view = this._viewCenter.getView(SetUpPanelView); 
		}

		/**
		 * 显示时
		 */
		public onShow():void{
		}

		/**
		 * 释放
		 */
		public dispose():void{
			this._view = null;
			super.dispose();
		}
	}
}
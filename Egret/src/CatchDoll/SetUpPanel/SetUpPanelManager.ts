/**
 * 管理器模板
 * @author suo
 */
module catchDoll {
	export class SetUpPanelManager extends BaseUIManager{
		public constructor() {
			super();
			this.addControl(SetUpPanelControl);
			this.addView(SetUpPanelView);
		}
	}
}
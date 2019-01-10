/**
 * 管理器模板
 * @author suo
 */
module catchDoll {
	export class RegisterPanelManager extends BaseUIManager{
		public constructor() {
			super();
			this.addControl(RegisterPanelControl);
			this.addView(RegisterPanelView);
		}
	}
}
/**
 * 管理器模板
 * @author suo
 */
module catchDoll {
	export class TurntableManager extends BaseUIManager {
		public constructor() {
			super();
			this.addControl(TurntableControl);
			this.addView(TurntableView);
			this.addControl(TurntableGainPanelControl);
			this.addView(TurntableGainPanelView);
		}
	}
}
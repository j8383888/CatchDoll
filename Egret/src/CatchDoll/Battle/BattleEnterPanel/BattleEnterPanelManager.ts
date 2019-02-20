/**
 * 管理器模板
 * @author suo
 */
module catchDoll {
	export class BattleEnterPanelManager extends BaseUIManager {
		public constructor() {
			super();
			this.addControl(BattleEnterPanelControl);
			this.addView(BattleEnterPanelView);
		}
	}
}
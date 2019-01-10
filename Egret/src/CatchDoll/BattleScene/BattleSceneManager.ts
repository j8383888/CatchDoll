/**
 * 管理器模板
 * @author suo
 */
module catchDoll {
	export class BattleSceneManager extends BaseUIManager{
		public constructor() {
			super();
			this.addControl(BattleSceneControl);
			this.addView(BattleSceneView);
		}
	}
}
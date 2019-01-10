/**
 * 管理器模板
 * @author suo
 */
module catchDoll {
	export class StartSceneManager extends BaseUIManager {
		public constructor() {
			super();
			this.addControl(StartSceneControl);
			this.addView(StartSceneView);
		}
	}
}
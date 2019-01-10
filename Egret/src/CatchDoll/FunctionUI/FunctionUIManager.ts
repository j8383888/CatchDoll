/**
 * 管理器模板
 * @author suo
 */
module catchDoll {
	export class FunctionUIManager extends BaseUIManager {
		public constructor() {
			super();
			this.addControl(FunctionUIControl);
			this.addView(FunctionUIView);
		}
	}
}
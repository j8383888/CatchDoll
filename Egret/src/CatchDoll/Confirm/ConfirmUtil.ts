module catchDoll {
	export class ConfirmUtil {
		public constructor() {
		}

		/**
		 * 显示确认面板
		 */
		public static showPanel(msg: string) {
			SimpleUICenter.instance.openUI(SIMPLE_UI.ConfirmPanel, msg);
		}
	}
}
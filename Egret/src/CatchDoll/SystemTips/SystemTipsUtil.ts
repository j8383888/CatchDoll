module catchDoll {
	export class SystemTipsUtil {

		public constructor() {
		}

		public static showTips(msg: string): void {
			SimpleUICenter.instance.openUI(SIMPLE_UI.SystemTips, msg)
		}
	}
}
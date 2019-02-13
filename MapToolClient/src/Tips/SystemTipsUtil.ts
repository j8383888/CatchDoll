class SystemTipsUtil {

	public constructor() {
	}

	public static showTips(msg: string): void {
		new SystemTips(msg);
	}
}
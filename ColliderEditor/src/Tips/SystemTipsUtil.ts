class SystemTipsUtil {

	public constructor() {
	}

	public static showTips(msg: string, color: number = ColorUtil.COLOR_WHITE): void {
		new SystemTips(msg, color);
	}
}
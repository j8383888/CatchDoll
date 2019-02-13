class SystemTips extends eui.Component {

	/**
	 * 消息文本
	 */
	public msgLabel: eui.Label;
	/**
	 * 打开参数
	 */
	public openParam: string;

	public constructor(msg: string) {
		super()
		this.openParam = msg;
		this.skinName = "SystemTipsSkin";
		this.onInit();
		this.onShow();
	}

	/**
	 * 初始化
	 */
	public onInit(): void {
		MapEditor.instance.addChild(this);
	}

	/**
	 * 显示时
	 */
	public onShow(): void {
		this.msgLabel.text = this.openParam;
		this.y = egret.MainContext.instance.stage.stageHeight;
		egret.Tween.get(this).to({ y: (egret.MainContext.instance.stage.stageHeight - this.height) / 2 }, 400, egret.Ease.quadOut).wait(1500).to({ y: 0 - this.height }, 400, egret.Ease.quadIn).call(() => {
			this.onHide();
		})
	}

	/**
	 * 隐藏时
	 */
	public onHide(): void {
		MapEditor.instance.removeChild(this)
	}

	/**
	 * 释放
	 */
	public dispose(): void {
	}
}
/**
 * 确认面板
 * @author suo 
 */
module catchDoll {
	export class ConfirmPanel extends BasePopPanel implements IBaseSimpleUI {

		public openParam: string;
		/**
		 * 消息文本
		 */
		public msgLabel: eui.Label;

		public constructor() {
			super(POP_EFFECT.CENTER, true)
			this.skinName = "ConfirmSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.msgLabel.text = this.openParam;
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage(LAYER.LOADING);
			this.closeBtnHandler = Handler.create(null, () => {
				SimpleUICenter.instance.closeUI(SIMPLE_UI.ConfirmPanel)
			})
		}

		/**
		 * 隐藏时
		 */
		public onHide(): void {

		}

		/**
		 * 释放
		 */
		public dispose(): void {
			super.dispose();
		}
	}
}
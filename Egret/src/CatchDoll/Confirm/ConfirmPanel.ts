/**
 * 确认面板
 * @author suo 
 */
module catchDoll {
	export class ConfirmPanel extends BasePopPanel implements IBaseSimpleUI {

		/**
		 * 打开参数
		 */
		public openParam: { msg: string, confirm?: Handler };
		/**
		 * 消息文本
		 */
		public msgLabel: eui.Label;
		/**
		 * 确认按钮
		 */
		public confirmBtn: Button;

		public constructor() {
			super(POP_EFFECT.CENTER, true)
			this.skinName = "ConfirmSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.confirmBtn = new Button(this.skin["_confirmBtn"])

		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage(LAYER.LOADING);
			if (this.openParam.confirm) {
				this.confirmBtn.mouseClickHandler = this.openParam.confirm
			}
			else {
				this.confirmBtn.mouseClickHandler = Handler.create(null, () => {
					SimpleUICenter.instance.closeUI(SIMPLE_UI.ConfirmPanel)
				})
			}
			this.msgLabel.text = this.openParam.msg;
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
			this.confirmBtn.dispose();
			this.confirmBtn = null;
			super.dispose();
		}
	}
}
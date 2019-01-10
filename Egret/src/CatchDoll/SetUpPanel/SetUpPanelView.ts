/**
 * 视图模板
 * @author suo
 */
module catchDoll {
	export class SetUpPanelView extends BasePopPanel implements BaseUIView {



		public constructor() {
			super(POP_EFFECT.CENTER, true);
			this.skinName = "SetUpSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
		}

		/**
		 * 展示时
		 */
		public onShow(): void {
			this.addToStage();
			this.closeBtnHandler = Handler.create(null, () => { UICenter.instance.closeUI(commonUI.SetUpPanel) })
		}

		/**
		 * 清除
		 */
		public clear(): void {

		}

		/**
		 * 隐藏时
		 */
		public onHide(): void {

		}

		/**
		 * 释放时
		 */
		public dispose(): void {
			super.dispose();
		}
	}
}
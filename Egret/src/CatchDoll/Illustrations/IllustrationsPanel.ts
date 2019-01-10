/**
 * 
 * @author suo 
 */
module catchDoll {
	export class IllustrationsPanel extends BasePopPanel implements IBaseSimpleUI {


		public constructor() {
			super();
			this.skinName = "illustrationsPanelSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage();
			this.closeBtnHandler = Handler.create(null, () => {
				SimpleUICenter.instance.closeUI(SIMPLE_UI.illustrations);
			}, null, true)
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
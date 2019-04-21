/**
 * 
 * @author suo 
 */
module catchDoll {
	export class LoginAward extends BasePopPanel implements IBaseSimpleUI {

		/**
		 * 项容器
		 */
		public itemGroup: eui.Group;

		public constructor() {
			super(POP_EFFECT.CENTER, true)
			this.skinName = "LoginAwardSkin";
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
				SimpleUICenter.instance.closeUI(SIMPLE_UI.LoginAward);
			}, null, true)

			for (let i: number = 0; i < 7; i++) {
				let item = new LoginAwardItem();
			}
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
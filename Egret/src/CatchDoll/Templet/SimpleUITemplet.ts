/**
 * 
 * @author suo 
 */
module catchDoll {
	export class SimpleUITemplet extends BasePopPanel implements IBaseSimpleUI {

		

		public constructor() {
			super()
			this.skinName = "";
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
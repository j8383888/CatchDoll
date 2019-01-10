/**
 * 视图模板
 * @author suo
 */
module catchDoll {
	export class TempletView extends BasePopPanel implements BaseUIView {

		
		

		public constructor() {
			super();
			this.skinName = "";
		}

		/**
		 * 初始化
		 */
		public onInit():void{
		}

		/**
		 * 展示时
		 */
		public onShow():void{

		}

		/**
		 * 清除
		 */
		public clear():void{

		}

		/**
		 * 隐藏时
		 */
		public onHide():void{

		}

		/**
		 * 释放时
		 */
		public dispose():void{
			super.dispose();
		}
	}
}
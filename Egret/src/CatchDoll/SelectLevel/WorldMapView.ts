/**
 * 选择关卡视图
 * @author suo
 */
module catchDoll {
	export class WorldMapView extends BasePopPanel implements BaseUIView {


		/**
		 * 战斗按钮
		 */
		public battleBtn: Button;
		/**
		 * 图鉴按钮
		 */
		public illustrationsBtn: Button;


		public constructor() {
			super();
			this.skinName = "WorldMapSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.battleBtn = new Button(this.skin["_battleBtn"]);
			this.illustrationsBtn = new Button(this.skin["_illustrationsBtn"]);
		}



		/**
		 * 展示时
		 */
		public onShow(): void {

			this.addToStage(LAYER.SCENE);
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


			this.battleBtn.dispose();
			this.battleBtn = null;
			this.illustrationsBtn.dispose();
			this.illustrationsBtn = null;
			super.dispose();
		}
	}
}
/**
 * 视图模板
 * @author suo
 */
module catchDoll {
	export class StartSceneView extends BasePopPanel implements BaseUIView {

		/**
		 * 开始按钮
		 */
		public startBtn: Button;

		public bg: eui.Image;

		public customFilter: egret.CustomFilter;

		public constructor() {
			super();
			this.skinName = "StartSceneSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.startBtn = new Button(this.skin["_startBtn"]);
			this.startBtn.enabled = false;

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
			this.startBtn.dispose();
			this.startBtn = null;
			super.dispose();
		}
	}
}
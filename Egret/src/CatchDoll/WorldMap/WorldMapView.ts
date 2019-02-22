/**
 * 选择关卡视图
 * @author suo
 */
module catchDoll {
	export class WorldMapView extends BasePopPanel implements BaseUIView {


		/**
		 * 战斗按钮
		 */
		public chapterBtns: Button[] = [];

		/**
		 * 风车
		 */
		public fengche: egret.MovieClip;

		/**
		 * 滑动条
		 */
		public scroller: eui.Scroller;

		public scrollerTool: ScollerTool;


		public constructor() {
			super();
			this.skinName = "WorldMapSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			for (let i: number = 1; i <= 2; i++) {
				let btn = new Button(this.skin["_chapterBtn" + i]);
				btn.data = i;
				this.chapterBtns.push(btn);
			}
			this.fengche = UIUtil.creatMovieClip("fengche");
			this.fengche.gotoAndPlay(1, -1);
			this.fengche.x = 107;
			this.fengche.y = 25;
		}



		/**
		 * 展示时
		 */
		public onShow(): void {
			this.scrollerTool = new ScollerTool(this.scroller, 720, false);
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

			for (let item of this.chapterBtns) {
				item.dispose();
				item = null;
			}
			this.chapterBtns.length = 0
			this.chapterBtns = null;
			super.dispose();
		}
	}
}
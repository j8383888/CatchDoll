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
		 * 滑动条
		 */
		public scroller: eui.Scroller;

		public scrollerTool: ScollerTool;
		/**
		 * 左按钮
		 */
		public shopBtn: Button;
		
		/**
		 * 排行榜
		 */
		public rankBtn: Button;
		/**
		 * 邀请按钮
		 */
		public inventBtn: Button
		/**
		 * 转盘按钮
		 */
		public turnTableBtn: Button;
		



		public constructor() {
			super();
			this.skinName = "WorldMapSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			for (let i: number = 1; i <= 3; i++) {
				let group = this.skin["_chapterBtn" + i] as eui.Group
				let btn = new Button(group);
				btn.data = i;
				if (i == 1) {
					let gouhuo = UIUtil.creatMovieClip("effect_1");
					gouhuo.gotoAndPlay(1, -1);
					gouhuo.x = 408;
					gouhuo.y = 300;
					gouhuo.blendMode = egret.BlendMode.ADD;
					gouhuo.frameRate = 12
					group.addChild(gouhuo);

					let xiaozhu = UIUtil.creatMovieClip("effect_2");
					xiaozhu.gotoAndPlay(1, -1);
					xiaozhu.x = 350;
					xiaozhu.y = 320;
					group.addChild(xiaozhu);
				}

				if (i == 2) {
					let fengche = UIUtil.creatMovieClip("fengche");
					fengche.gotoAndPlay(1, -1);
					fengche.x = 320;
					fengche.y = 170;
					group.addChild(fengche);
				}
				this.chapterBtns.push(btn);
			}

			this.shopBtn = new Button(this.skin["_shopBtn"]);
			
			this.rankBtn = new Button(this.skin["_rankBtn"]);
			this.inventBtn = new Button(this.skin["_inventBtn"]);
			this.turnTableBtn = new Button(this.skin["_turnTableBtn"]);

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
			this.shopBtn.dispose();
			this.shopBtn = null;
			this.turnTableBtn.dispose();
			this.turnTableBtn = null;
			
			this.rankBtn.dispose();
			this.rankBtn = null;
			this.inventBtn.dispose();
			this.inventBtn = null;
			super.dispose();
		}
	}
}
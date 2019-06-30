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
		/**
		 * 灯光光影
		 */
		public eff1: egret.MovieClip;
		/**
		 * 方块特效
		 */
		public eff2: egret.MovieClip;

		public topImg: eui.Image;
		public bottomImg: eui.Image;
		public gameBtn1: Button;
		public gameBtn2: Button;
		public gameBtn3: Button;
		public group: eui.Group;
		public cloud1: eui.Image;
		public cloud2: eui.Image;
		public cloud3: eui.Image;
		public cloud4: eui.Image;
		public cube1: eui.Image;
		public cube2: eui.Image;
		public cube3: eui.Image;
		public balloon: eui.Image;





		public constructor() {
			super(POP_EFFECT.NORMAL, false);
			this.skinName = "WorldMapSkin";
		}

		/**
		 * 适配 
		 */
		protected _onResize(): void {
			this.height = GameCenter.stageH;
			if (GameCenter.stageH > 1600) {
				this.bottomImg.height = this.topImg.height = (GameCenter.stageH - 1600) / 2 + 2;
				this.bottomImg.visible = this.topImg.visible = true;
			}
			else {
				this.bottomImg.visible = this.topImg.visible = false;
			}
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
			this.gameBtn1 = new Button(this.skin["_gameBtn1"]);
			this.gameBtn2 = new Button(this.skin["_gameBtn2"]);
			this.gameBtn3 = new Button(this.skin["_gameBtn3"]);

			this.eff1 = UIUtil.creatMovieClip("eff_1");
			this.eff1.scaleX = this.eff1.scaleY = 3;
			this.eff1.x = 560;
			this.eff1.y = 1160;
			this.eff1.blendMode = egret.BlendMode.ADD;
			this.eff1.gotoAndPlay(1, -1);
			this.skin["contentBox"].addChild(this.eff1);

			this.eff2 = UIUtil.creatMovieClip("eff_2");
			this.eff2.gotoAndPlay(1, -1);
			this.eff2.x = 150;
			this.eff2.y = 80
			this.eff2.scaleX = this.eff2.scaleY = 2;
			this.eff2.blendMode = egret.BlendMode.ADD;
			this.skin["_gameBtn2"].addChild(this.eff2);

			this._onResize();

			let startX: number = this.cloud1.x;
			let endX: number = this.cloud1.x + 10;
			egret.Tween.get(this.cloud1, { loop: true }).to({ x: endX }, 2000).to({ x: startX }, 2000)

			let startX2: number = this.cloud2.x;
			let endX2: number = this.cloud2.x - 8;
			egret.Tween.get(this.cloud2, { loop: true }).to({ x: endX2 }, 1800).to({ x: startX2 }, 1800)

			let startX3: number = this.cloud3.x;
			let endX3: number = this.cloud3.x + 12;
			egret.Tween.get(this.cloud3, { loop: true }).to({ x: endX3 }, 2000).to({ x: startX3 }, 2000)

			let startX4: number = this.cloud4.x
			let endX4: number = this.cloud4.x + 12;
			egret.Tween.get(this.cloud4, { loop: true }).to({ x: endX4 }, 2000).to({ x: startX4 }, 2000)

			UIUtil.setScaleTween(this.balloon, 1.05, 0.95, 2000)

			let startY5: number = this.cube1.y
			let endY5: number = this.cube1.y + 12;
			egret.Tween.get(this.cube1, { loop: true }).to({ y: endY5 }, 2000).to({ y: startY5 }, 2000);

			let startY6: number = this.cube2.y
			let endY6: number = this.cube2.y - 8;
			egret.Tween.get(this.cube2, { loop: true }).to({ y: endY6 }, 1500).to({ y: startY6 }, 1500);

			let startY7: number = this.cube3.y
			let endY7: number = this.cube3.y - 10;
			egret.Tween.get(this.cube3, { loop: true }).to({ y: endY7 }, 2000).to({ y: startY7 }, 2000)
		}



		/**
		 * 展示时
		 */
		public onShow(): void {
			this.scrollerTool = new ScollerTool(this.scroller, 720, false);
			this.addToStage(LAYER.WorldMap);
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
			egret.Tween.removeTweens(this.cloud1);
			egret.Tween.removeTweens(this.cloud2);
			egret.Tween.removeTweens(this.cloud3);
			egret.Tween.removeTweens(this.cloud4);
			egret.Tween.removeTweens(this.cube1);
			egret.Tween.removeTweens(this.cube2);
			egret.Tween.removeTweens(this.cube3);
			egret.Tween.removeTweens(this.balloon);

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
			this.gameBtn1.dispose();
			this.gameBtn1 = null;
			this.gameBtn2.dispose();
			this.gameBtn2 = null;
			this.gameBtn3.dispose();
			this.gameBtn3 = null;
			super.dispose();
		}
	}
}
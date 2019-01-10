/**
 * 视图模板
 * @author suo
 */
module catchDoll {
	export class BattleSceneView extends BasePopPanel implements BaseUIView {

		/**
		 * 右按钮
		 */
		public rightBtn: Button;
		/**
		 * 左按钮
		 */
		public leftBtn: Button;
		/**
		 * 中间按钮
		 */
		public middleBtn: Button;
		/**
		 * 返回按钮
		 */
		public returnBtn: Button;
		/**
		 * 时间文本
		 */
		public timeLabel: eui.Label;
		/**
		 * 左侧展开按钮
		 */
		public propBtn1: Button;
		/**
		 * 左侧收拢按钮
		 */
		public propBtn2: Button;
		/**
		 * 道具展开面板容器
		 */
		public propBox: eui.Group;
		/**
		 * 窗帘效果
		 */
		public curtainEffL: egret.MovieClip;
		/**
		 * 窗帘效果
		 */
		public curtainEffR: egret.MovieClip;




		public constructor() {
			super();
			this.skinName = "BattleSceneSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {

			this.rightBtn = new Button(this.skin["_rightBtn"])
			this.leftBtn = new Button(this.skin["_leftBtn"])
			this.middleBtn = new Button(this.skin["_middleBtn"])
			this.returnBtn = new Button(this.skin["_returnBtn"])
			this.propBtn1 = new Button(this.skin["_propBtn1"])
			this.propBtn2 = new Button(this.skin["_propBtn2"])
			this.curtainEffL = UIUtil.creatMovieClip("curtainEff");
			// this.curtainEffL.gotoAndPlay(1, 1);
			// this.curtainEffL.scaleY = 1.2
			// this.curtainEffL.scaleX = - 1.2
			// this.addChild(this.curtainEffL);

			// this.curtainEffR = UIUtil.creatMovieClip("curtainEff");
			// this.curtainEffR.gotoAndPlay(1, 1);
			// this.curtainEffR.scaleX = this.curtainEffR.scaleY = 1.2
			// this.addChild(this.curtainEffR);

		}

		/**
		 * 展示时
		 */
		public onShow(): void {
			this.addToStage(LAYER.BATTLE);

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

			this.rightBtn.dispose();
			this.rightBtn = null;
			this.leftBtn.dispose();
			this.leftBtn = null;
			this.middleBtn.dispose();
			this.middleBtn = null;
			this.returnBtn.dispose();
			this.returnBtn = null;
			this.propBtn1.dispose();
			this.propBtn1 = null;
			this.propBtn2.dispose();
			this.propBtn2 = null;
			super.dispose();
		}
	}
}
/**
 * 视图模板
 * @author suo
 */
module catchDoll {
	export class BattleSceneView extends BasePopPanel implements BaseUIView {

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
		 * 背景
		 */
		public bgSource: eui.Image;
		/**
		 * 按钮组
		 */
		public btnGroup: eui.Group;
		/**
		 * 下按钮
		 */
		public downOp: Button;
		public rightOp: Button;
		public leftOp: Button;
		public leftRect: eui.Rect;
		public rightRect: eui.Rect;
		public downRect: eui.Rect;

		public btnLeftEff: egret.MovieClip;
		public btnRightEff: egret.MovieClip;
		public btnDownEff: egret.MovieClip;

		public constructor() {
			super();
			this.skinName = "BattleSceneSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.returnBtn = new Button(this.skin["_returnBtn"])
			this.propBtn1 = new Button(this.skin["_propBtn1"])
			this.propBtn2 = new Button(this.skin["_propBtn2"])
			this.downOp = new Button(this.skin["_downOp"])
			this.rightOp = new Button(this.skin["_rightOp"])
			this.leftOp = new Button(this.skin["_leftOp"])

			this.btnLeftEff = UIUtil.creatMovieClip("btnLeftRightEff");
			this.btnLeftEff.frameRate = 8;
			this.btnLeftEff.visible = false;
			this.btnLeftEff.scaleX = 1;
			this.btnLeftEff.x = 80;
			this.btnLeftEff.y = 1203;
			this.btnGroup.addChild(this.btnLeftEff)
			this.btnRightEff = UIUtil.creatMovieClip("btnLeftRightEff");
			this.btnRightEff.frameRate = 8;
			this.btnRightEff.visible = false;
			this.btnRightEff.x = 640;
			this.btnRightEff.scaleX = -1;
			this.btnRightEff.y = 1203;
			this.btnGroup.addChild(this.btnRightEff)
			this.btnDownEff = UIUtil.creatMovieClip("btnDownEff");
			this.btnDownEff.visible = false;
			this.btnDownEff.frameRate = 8;
			this.btnDownEff.x = 360
			this.btnDownEff.y = 1190;
			this.btnGroup.addChild(this.btnDownEff)

		}

		/**
		 * 展示时
		 */
		public onShow(): void {
			this.addToStage(LAYER.BATTLE_LOW);
			LayerManager.instance.addToLayer(this.btnGroup, LAYER.BATTLE_HIGH)
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
			LayerManager.instance.removeFromLayer(this.btnGroup, LAYER.BATTLE_HIGH)
			this.returnBtn.dispose();
			this.returnBtn = null;
			this.propBtn1.dispose();
			this.propBtn1 = null;
			this.propBtn2.dispose();
			this.propBtn2 = null;
			this.downOp.dispose();
			this.downOp = null;
			this.rightOp.dispose();
			this.rightOp = null;
			this.leftOp.dispose();
			this.leftOp = null;
			this.btnLeftEff.stop();
			this.btnLeftEff = null;
			this.btnRightEff.stop();
			this.btnRightEff = null;
			this.btnDownEff.stop();
			this.btnDownEff = null;

			super.dispose();
		}
	}
}
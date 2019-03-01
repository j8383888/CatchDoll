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
		public battleSceneBox: eui.Group;
		public sceneImgBox: eui.Group;
		public monsterBox: eui.Group;

		public downRect:eui.Rect




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
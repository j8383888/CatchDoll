/**
 * 视图模板
 * @author suo
 */
module catchDoll {
	export class BattleEnterPanelView extends BasePopPanel implements BaseUIView {

		/**
		 * 开始按钮
		 */
		public startBtn: Button;
		/**
		 * 金币消失位置
		 */
		public endPos:eui.Rect

		public constructor() {
			super();
			this.skinName = "BattleEnterPanelSkin";
		}



		/**
		 * 初始化
		 */
		public onInit(): void {
			this.startBtn = new Button(this.skin["_startBtn"],null,true,true);
		}

		/**
		 * 展示时
		 */
		public onShow(): void {
			this.addToStage(LAYER.POP);
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
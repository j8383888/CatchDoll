/**
 * 视图模板
 * @author suo
 */
module catchDoll {
	export class TurntableView extends BasePopPanel implements BaseUIView {

		/**
		 * 开始按钮
		 */
		public startBtn: Button;
		/**
		 * 转盘身体
		 */
		public turnTableBody: eui.Group
		/**
		 * 获得文字
		 */
		public getFont: eui.Image;
		/**
		 * 灯光效果
		 */
		public eff: egret.MovieClip;
		/**
		 * 中心点
		 */
		public centerPoint: { x, y } = { x: 319.5, y: 319 };

		public constructor() {
			super(POP_EFFECT.CENTER, true);
			this.skinName = "TurntableSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.startBtn = new Button(this.skin["_startBtn"])
		}

		/**
		 * 展示时
		 */
		public onShow(): void {
			this.addToStage();
			this.commonCloseBtn = new Button(this.skin["closeBtn"]);
			this.commonCloseBtn.mouseClickHandler = Handler.create(this, this.showCloseEff, [Handler.create(null, () => {
				UICenter.instance.closeUI(commonUI.TurnTable);
			}, null, true)], )
			this.setScaleTween(this.getFont);

			this.eff = UIUtil.creatMovieClip("TurntableLamp");
			this.addChild(this.eff);
			this.eff.visible = false;
			this.eff.blendMode = egret.BlendMode.ADD;
			this.eff.frameRate = 5;
			this.eff.x = 330;
			this.eff.y = 350;
			this.eff.scaleX = this.eff.scaleY = 2;
		}

		/**
		 * 显示特效
		 */
		public showEff(): void {
			this.eff.visible = true;
			this.eff.gotoAndPlay(1, -1);
		}

		/**
		 * 隐藏特效
		 */
		public hideEff(): void {
			this.eff.visible = false;
			this.eff.stop();
		}
		/**
	 	 * 设置对象缩放动画
		 */
		public setScaleTween(target: egret.DisplayObject, scaleXGene: number = 1, scaleYGene: number = 1, durationTime: number = 600): void {
			egret.Tween.get(target).to({ scaleX: 1.1 * scaleXGene, scaleY: 1.1 * scaleYGene }, durationTime, egret.Ease.backOut).call(() => {
				egret.Tween.get(target).to({ scaleX: 0.9 * scaleXGene, scaleY: 0.9 * scaleYGene }, durationTime, egret.Ease.backIn).call(this.setScaleTween, this, [target, scaleXGene, scaleYGene, durationTime])
			}, this);
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
			egret.Tween.removeTweens(this.getFont)
			this.startBtn.dispose();
			this.startBtn = null;
			this.eff.stop();
			this.eff = null;
			super.dispose();
		}
	}
}
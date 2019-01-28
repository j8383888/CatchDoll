module catchDoll {
	export class SystemTips extends eui.Component implements IBaseSimpleUI {

		/**
		 * 消息文本
		 */
		public msgLabel: eui.Label;
		/**
		 * 打开参数
		 */
		public openParam: string;

		public constructor() {
			super()
			this.skinName = "SystemTipsSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			LayerManager.instance.addToLayer(this, LAYER.EFFECT)
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.msgLabel.text = this.openParam;
			this.y = GameCenter.stageH;
			egret.Tween.get(this).to({ y: (GameCenter.stageH - this.height) / 2 }, 400, egret.Ease.quadOut).wait(3000).to({ y: 0 - this.height }, 400, egret.Ease.quadIn).call(() => {
				SimpleUICenter.instance.closeUI(SIMPLE_UI.SystemTips);
			})
		}

		/**
		 * 隐藏时
		 */
		public onHide(): void {
			LayerManager.instance.removeFromLayer(this, LAYER.EFFECT)
		}

		/**
		 * 释放
		 */
		public dispose(): void {
		}
	}
}
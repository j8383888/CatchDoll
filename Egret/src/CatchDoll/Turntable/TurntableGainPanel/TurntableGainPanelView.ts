/**
 * 转盘获得面板视图
 * @author suo
 */
module catchDoll {
	export class TurntableGainPanelView extends BasePopPanel implements BaseUIView {

		/**
		 * 奖励描述文本
		 */
		public awardDec: eui.Label;
		/**
		 * 奖励图片
		 */
		public awardImg: eui.Image;


		public constructor() {
			super(POP_EFFECT.CENTER, true);
			this.skinName = "TurntableGainPanelSkin";
		}

		/**
		 * 显示结果
		 */
		public showResult(awardKey: TURNTABLE_AWARD): void {
			let data: Object = TurntableData.awardMap.get(awardKey)
			this.awardImg.source = data["source"];
			this.awardDec.text = data["dec"];
			Master.instance.sendItemUpdateMsg(ITEM_ID.MONEY, data["money"]);
			this.closeBtnHandler = Handler.create(null, () => { UICenter.instance.closeUI(commonUI.TurnTable) }, null, true);
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
		}

		/**
		 * 展示时
		 */
		public onShow(): void {
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
			super.dispose();
		}
	}
}
/**
 * 排行版
 * @author suo 
 */
module catchDoll {
	export class RankPanel extends BasePopPanel implements IBaseSimpleUI {
		/**
		 * 最大项数
		 */
		private readonly MAX_NUM: number = 10;
		/**
		 * 项盒子
		 */
		public listGroup: eui.Group;


		public constructor() {
			super(POP_EFFECT.CENTER,true);
			this.skinName = "RankPanelSkin"
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			for (let i: number = 0; i < this.MAX_NUM; i++) {
				let item: RankItem = new RankItem();
				item.setData("玩家名字", 999999, i + 1);
				this.listGroup.addChild(item);
			}
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage(LAYER.POP);
			this.closeBtnHandler = Handler.create(null, () => { SimpleUICenter.instance.closeUI(SIMPLE_UI.rankPanel) }, null, true)
		}

		/**
		 * 隐藏时
		 */
		public onHide(): void {

		}

		/**
		 * 释放
		 */
		public dispose(): void {
			super.dispose();
		}
	}
}
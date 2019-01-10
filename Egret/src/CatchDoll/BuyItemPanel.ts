/**
 * 购买道具面板
 * @author suo 
 */
module catchDoll {
	export class BuyItemPanel extends BasePopPanel implements IBaseSimpleUI {
		/**
		 * 道具图片
		 */
		private itemImg: eui.Image;
		/**
		 * 道具名字
		 */
		private itemName: eui.Label;

		/**
		 * 减少按钮
		 */
		private decBtn: Button;
		/**
		 * 增加按钮
		 */
		private incBtn: Button;
		/**
		 * 道具数量文本
		 */
		private numLabel: eui.Label;
		/**
		 * 购买按钮
		 */
		private buyBtn: Button;
		/**
		 * 道具数量
		 */
		private itemNum: number = 1;
		/**
		 * 价格
		 */
		private itemPrice: eui.Label;
		/**
		 * 道具ID
		 */
		public openParam: number;
		/**
		 * 道具数据
		 */
		public data: table.PropTable;

		public constructor() {
			super()
			this.skinName = "BuyItemPanelSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.buyBtn = new Button(this.skin["_buyBtn"])
			this.decBtn = new Button(this.skin["_decBtn"])
			this.incBtn = new Button(this.skin["_incBtn"])
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage();
			let data: table.PropTable = TableCenter.instance.getPropDataByID(this.openParam);
			this.data = data;
			this.itemImg.source = data.source;
			this.itemName.text = data.name;
			this.itemPrice.text = data.price.toString();
			this.closeBtnHandler = Handler.create(null, () => {
				SimpleUICenter.instance.closeUI(SIMPLE_UI.buyItemPanel);
			}, null, true)

			this.incBtn.mouseClickHandler = Handler.create(null, () => {
				this.itemNum = UIUtil.circleAdd(this.itemNum, 1, 10);
				this.numLabel.text = "X" + this.itemNum.toString();
				this.itemPrice.text = (this.itemNum * this.data.price).toString();
			})
			this.decBtn.mouseClickHandler = Handler.create(null, () => {
				this.itemNum--;
				if (this.itemNum <= 0) {
					this.itemNum = 10
				}
				this.itemPrice.text = (this.itemNum * this.data.price).toString();
				this.numLabel.text = "X" + this.itemNum.toString();
			})
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
			this.data = null;
			this.buyBtn.dispose();
			this.buyBtn = null;
			this.decBtn.dispose();
			this.decBtn = null;
			this.incBtn.dispose();
			this.incBtn = null;
			super.dispose();
		}
	}
}
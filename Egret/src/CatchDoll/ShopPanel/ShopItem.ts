/**
 * 商品项
 */
module catchDoll {
	export class ShopItem extends eui.Component {

		public itemID: number = 0;

		public buyBtn: Button;

		public hotFlag: eui.Image;
		/**
		 * 图片
		 */
		public itemImg: eui.Image;
		/**
		 * 价格
		 */
		public price: eui.Label;

		public constructor() {
			super();
			this.skinName = "ShopItemSkin";
		}

		/**
		 * 设置数据
		 */
		public setData(id: number, isHot: boolean): void {
			this.itemID = id;
			let data: table.PropTable = TableCenter.instance.getPropDataByID(id);
			this.hotFlag.visible = isHot;
			this.itemImg.source = data.source;
			this.price.text = "X" + data.price.toString();
			this.buyBtn = new Button(this.skin["_buyBtn"]);
			this.buyBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.buyItemPanel, this.itemID);
			})
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this.buyBtn.dispose();
			this.buyBtn = null;
		}
	}
}
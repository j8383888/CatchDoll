/**
 * 商店
 * @author suo 
 */
module catchDoll {
	export class ShopPanel extends BasePopPanel implements IBaseSimpleUI {

		/**
		 * 切换按钮组
		 */
		private _toggleButtonGroup: ToggleButtonGroup = new ToggleButtonGroup();
		/**
		 * 视图1
		 */
		private diamondBox: eui.Group;
		/**
		 * 视图2
		 */
		private itemBox: eui.Group;
		/**
		 * 选中背景
		 */
		private readonly SELECT_BG_SOURCE: string = "shopPanel_12";
		/**
		 * 未选中背景
		 */
		private readonly UN_SELECT_BG_SOURCE: string = "shopPanel_11";
		/**
		 * 按钮组
		 */
		public buyBtnGroup: Button[] = [];
		/**
		 * 道具组
		 */
		public itemList:ShopItem[] = [];

		public constructor() {
			super(POP_EFFECT.CENTER, true)
			this.skinName = "ShopPanelSkin"
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			let toggle1: ToggleButton = new ToggleButton(this.skin["switchBtn1"])
			let toggle2: ToggleButton = new ToggleButton(this.skin["switchBtn2"])
			toggle1.selectHandler = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle1).source = this.SELECT_BG_SOURCE;
				this.diamondBox.visible = true;
			})
			toggle1.cancelHanlder = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle1).source = this.UN_SELECT_BG_SOURCE;
				this.diamondBox.visible = false;
			})
			toggle2.selectHandler = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle2).source = this.SELECT_BG_SOURCE;
				this.itemBox.visible = true;

			})
			toggle2.cancelHanlder = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle2).source = this.UN_SELECT_BG_SOURCE;
				this.itemBox.visible = false;
			})

			this._toggleButtonGroup.push(toggle1);
			this._toggleButtonGroup.push(toggle2);

			let table: table.shopTable[] = TableCenter.instance.ShopTable;
			for (let item of table) {
				let shopitem: ShopItem = new ShopItem();
				shopitem.setData(item.itemID, Boolean(item.isHot));
				this.itemBox.addChild(shopitem);
				this.itemList.push(shopitem);
			}
		}

		/**
		 * 获得切换按钮背景
		 */
		private _getSwitchBtnBG(btn: Button): eui.Image {
			return (btn.root as eui.Group).getChildAt(0) as eui.Image
		}

		/**
		 * 展示时
		 */
		public onShow(): void {
			this.addToStage(LAYER.POP);
			this._toggleButtonGroup.clickByIndex = 0;
			this.closeBtnHandler = Handler.create(null, () => { SimpleUICenter.instance.closeUI(SIMPLE_UI.ShopPanel) }, null, true)
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
			for(let item of this.itemList){
				item.dispose();
				item = null;
			}
			this.itemList.length = 0;
			this.itemList = null;
			this._toggleButtonGroup.dispose();
			this._toggleButtonGroup = null;
			super.dispose();
		}
	}
}
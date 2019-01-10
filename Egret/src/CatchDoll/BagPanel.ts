/**
 * 背包
 * @author suo 
 */
module catchDoll {
	export class BagPanel extends BasePopPanel implements IBaseSimpleUI {

		/**
		 * 切换按钮组
		 */
		private _toggleButtonGroup: ToggleButtonGroup = new ToggleButtonGroup();

		/**
		 * 选中背景
		 */
		private readonly SELECT_BG_SOURCE: string = "bagPanel_10";
		/**
		 * 未选中背景
		 */
		private readonly UN_SELECT_BG_SOURCE: string = "bagPanel_8";

		public constructor() {
			super(POP_EFFECT.CENTER, true);
			this.skinName = "BagPanelSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {

			for (let i: number = 1; i < 5; i++) {
				let toggle: ToggleButton = new ToggleButton(this.skin["switchBtn" + i]);
				toggle.selectHandler = Handler.create(null, () => {
					let bg: eui.Image = this._getSwitchBtnBG(toggle);
					bg.source = this.SELECT_BG_SOURCE;
					bg.width = 200;
					this._getSwitchBtnFont(toggle).x = 45;
				})
				toggle.cancelHanlder = Handler.create(null, () => {
					let bg: eui.Image = this._getSwitchBtnBG(toggle);
					bg.source = this.UN_SELECT_BG_SOURCE;
					bg.width = 159;
					this._getSwitchBtnFont(toggle).x = 23;
				})
				this._toggleButtonGroup.push(toggle);
			}
		}

		/**
		 * 获得切换按钮背景
		 */
		private _getSwitchBtnBG(btn: Button): eui.Image {
			return (btn.root as eui.Group).getChildAt(0) as eui.Image
		}

		/**
		 * 获得切换按钮字
		 */
		private _getSwitchBtnFont(btn: Button): eui.Image {
			return (btn.root as eui.Group).getChildAt(1) as eui.Image
		}

		/**
		 * 自适应
		 */
		public _selfAdaption() {
			if (this.skin["bg"] != null) {
				this._panelWidth = this.skin["bg"].width;
				this._panelHeight = this.skin["bg"].height;
				this._panelX = this.skin["bg"].x;
				this._panelY = this.skin["bg"].y;

			} else {
				this._panelWidth = this.width;
				this._panelHeight = this.height;
			}
			this._posX = (GameCenter.stageW - this._panelWidth) / 2 - this._panelX - 100;
			this._posY = (GameCenter.stageH - this._panelHeight) / 2 - this._panelY;
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage();
			this._toggleButtonGroup.clickByIndex = 0;
			this.closeBtnHandler = Handler.create(null, () => { SimpleUICenter.instance.closeUI(SIMPLE_UI.bagPanel) }, null, false)
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
			this._toggleButtonGroup.dispose();
			this._toggleButtonGroup = null;
		}
	}
}
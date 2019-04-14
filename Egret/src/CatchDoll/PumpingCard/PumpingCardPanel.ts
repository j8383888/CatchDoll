/**
 * 抽卡
 * @author suo 
 */
module catchDoll {
	export class PumpingCardPanel extends BasePopPanel implements IBaseSimpleUI {

		/**
		 * 单抽
		 */
		public oneBuy: Button;
		/**
		 * 十连
		 */
		public tenBuy: Button;

		private _oneBuyDragon: dragonBones.EgretArmatureDisplay;

		private _oneTenDragon: dragonBones.EgretArmatureDisplay;
		public dragonPos: eui.Rect;


		public constructor() {
			super()
			this.skinName = "PumpingCardPanelSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.oneBuy = new Button(this.skin["_oneBuy"])
			this.tenBuy = new Button(this.skin["_tenBuy"])
			this.oneBuy.mouseClickHandler = Handler.create(this, this._onOneBuy)
			this.tenBuy.mouseClickHandler = Handler.create(this, this._onTenBuy)
			this._oneBuyDragon = UIUtil.creatDragonbones("lvxiang_ske");
			this._oneBuyDragon.x = this.dragonPos.x;
			this._oneBuyDragon.y = this.dragonPos.y;
			this._oneBuyDragon.animation.play("lv-loop");
			this.addChild(this._oneBuyDragon);


			this._oneTenDragon = UIUtil.creatDragonbones("hongxiang_ske");
		}

		/**
		 * 十连抽
		 */
		private _onTenBuy(): void {

		}

		/**
		 * 单抽
		 */
		private _onOneBuy(): void {
			this._oneBuyDragon.animation.play("lv-Skill");
			Laya.timer.once(800, this, this._showCard)
		}

		/**
		 * 显示牌
		 */
		private _showCard(): void {
			let card = new PumpingCardItem();
			card.setData(MathUtil.random(1, 19))
			egret.Tween.get(card).set({ alpha: 0, x: this.dragonPos.x, y: this.dragonPos.y - 10, scaleX: 0.5, scaleY: 0.5 }).to({ alpha: 1, y: this.dragonPos.y - 200, scaleX: 1, scaleY: 1 }, 1000).wait(2000).to({
				alpha: 0
			}, 200).call(() => {
				card.dispose();
				this.removeChild(card);
			})
			this.addChild(card);
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage();
			this.closeBtnHandler = Handler.create(null, () => {
				SimpleUICenter.instance.closeUI(SIMPLE_UI.PumpingCard);
			}, null, true)
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
			this._oneBuyDragon.dispose();
			this._oneBuyDragon = null;
			this._oneTenDragon.dispose();
			this._oneTenDragon = null;
			this.oneBuy.dispose();
			this.oneBuy = null;
			this.tenBuy.dispose();
			this.tenBuy = null;
			super.dispose();
		}
	}
}
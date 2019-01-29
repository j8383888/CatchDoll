/**
 * 控制器模板
 * @author suo
 */
module catchDoll {
	export class FunctionUIControl extends BaseUIControl {
		/*视图*/
		private _view: FunctionUIView;

		public constructor() {
			super();
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this._view = this._viewCenter.getView(FunctionUIView);4
		}

		private _onClick(btn: Button): void {
			if (btn == this._view.menuBtn) {
				SimpleUICenter.instance.openUI(SIMPLE_UI.BattleSelect);
			}
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this._view.menuBtn.mouseClickHandler = Handler.create(this, this._onClick);
			this._view.turnTableBtn.mouseClickHandler = Handler.create(this, this._onClicTurnTable)
			this._view.registerBtn.mouseClickHandler = Handler.create(this, this._onClicRegister)
			this._view.setUpBtn.mouseUpHandler = Handler.create(this, this._onClicSetUp)
			this._view.rankBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.rankPanel);
			})
			this._view.taskBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.taskPanel);
			})
			this._view.shopBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.ShopPanel);
			})
			this._view.bagBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.bagPanel);
			})
			this._view.inventBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.SettlePanel, { starNum: 3, itemID: 1 });
			})
			this._view.furlBtn.mouseClickHandler = Handler.create(null, () => {
				egret.Tween.removeTweens(this._view.leftMenu)
				if (this._view.furlBtn.root.scaleX == 0.6) {
					this._view.furlBtn.root.scaleX = -0.6;
					// egret.Tween.get(this._view.shopBtn.root, null, null, true).to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.quadIn);
					// egret.Tween.get(this._view.rankBtn.root, null, null, true).to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.quadIn);
					// egret.Tween.get(this._view.turnTableBtn.root, null, null, true).to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.quadIn);

					egret.Tween.get(this._view.leftMenuBg).to({ height: 110 }, 500, egret.Ease.quadIn)
					egret.Tween.get(this._view.scroller).to({ height: 0 }, 500, egret.Ease.quadIn)
				}
				else {
					this._view.furlBtn.root.scaleX = 0.6;
					egret.Tween.get(this._view.leftMenuBg).to({ height: 546 }, 500, egret.Ease.quadIn);
					egret.Tween.get(this._view.scroller).to({ height: 436 }, 500, egret.Ease.quadIn)
				}
			})



			this._view.rightBtn.mouseClickHandler = Handler.create(null, () => {
				egret.Tween.get(this._view.bottomMenu, null, null, true).to({ x: GameCenter.stageW }, 500, egret.Ease.quadIn).call(() => {
					this._view.leftBtn.visible = true;
				});
			});
			this._view.leftBtn.mouseClickHandler = Handler.create(null, () => {
				this._view.leftBtn.visible = false;
				this._view.rightBtn.root.scaleX = this._view.rightBtn.root.scaleY = 0;
				let len: number = this._view.bottomBtnGroup.numChildren;
				for (let i: number = 0; i < len; i++) {
					let index: number = i + 1;
					let item: eui.Group = this._view.bottomBtnGroup.getChildByName("btn" + index) as eui.Group;
					item.scaleX = item.scaleY = 0;
				}
				egret.Tween.get(this._view.bottomMenu, null, null, true).to({ x: 0 }, 500, egret.Ease.quadIn).call(() => {
					egret.Tween.get(this._view.rightBtn.root).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
					for (let i: number = 0; i < len; i++) {
						let btnIndex: number = i + 1
						let btn = this._view.bottomBtnGroup.getChildByName("btn" + btnIndex);
						egret.Tween.get(btn).wait(i * 200).to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.backOut);
					}
				});
			});

		}

		/**
		 * 点击设置按钮
		 */
		private _onClicSetUp(): void {
			UICenter.instance.openUI(commonUI.SetUpPanel)
		}

		/**
		 * 点击签到按钮
		 */
		private _onClicRegister(): void {
			UICenter.instance.openUI(commonUI.RegisterPanel)
		}

		/**
		 * 点击转盘按钮
		 */
		private _onClicTurnTable(): void {
			UICenter.instance.openUI(commonUI.TurnTable)
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._view = null;
			super.dispose();
		}
	}
}
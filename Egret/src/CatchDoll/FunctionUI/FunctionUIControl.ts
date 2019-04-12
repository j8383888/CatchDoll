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
			this._view = this._viewCenter.getView(FunctionUIView);
		}

		private _onClick(btn: Button): void {
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this._view.menuBtn.mouseClickHandler = Handler.create(this, this._onClick);

			this._view.registerBtn.mouseClickHandler = Handler.create(this, this._onClicRegister)
			this._view.setUpBtn.mouseUpHandler = Handler.create(this, this._onClicSetUp)
			this._view.taskBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.taskPanel);
			})
			this._view.illustratedBtn.mouseClickHandler = Handler.create(null, () => {
				SimpleUICenter.instance.openUI(SIMPLE_UI.illustrations);
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
		 * 释放
		 */
		public dispose(): void {
			this._view = null;
			super.dispose();
		}
	}
}
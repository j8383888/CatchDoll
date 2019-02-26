/**
 * 结算面板
 * @author suo 
 */
module catchDoll {
	export class SettlePanel extends BasePopPanel implements IBaseSimpleUI {
		/**
		 * 奖励列表
		 */
		public itemGroup: eui.Group;
		/**
		 * 下拉容器
		 */
		private _pullDownBox: eui.Group;
		/**
		 * 星星数
		 */
		public openParam: { starNum: number, itemID: number };

		public constructor() {
			super(POP_EFFECT.CENTER, true);
			this.skinName = "SettlePanelSkin"
		}

		/**
		 * 初始化
		 */
		public onInit(): void {

		}

		/**
		 * 获得切换按钮背景
		 */
		private _getSwitchBtnBG(btn: Button): eui.Image {
			return (btn.root as eui.Group).getChildAt(0) as eui.Image
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage();
			this.closeBtnHandler = Handler.create(null, () => {
				LevelCreate.instance.dispose();
				SimpleUICenter.instance.closeUI(SIMPLE_UI.SettlePanel);
				UICenter.instance.closeUI(commonUI.BattleScene);
				UICenter.instance.openUI(commonUI.WorldMap);
			}, null, true)

			let rope1: eui.Image = this.skin["rope1"];
			let rope2: eui.Image = this.skin["rope2"];
			rope1.height = rope2.height = 1;

			for (let i: number = 0; i < 3; i++) {
				let star: eui.Image = this.skin["star" + (i + 1)];
				star.alpha = 0;
			}
			let endPosY: number = this._pullDownBox.y;
			this._pullDownBox.alpha = 0;
			this._pullDownBox.y -= 230;

			Laya.timer.once(300, null, () => {
				egret.Tween.get(rope1).to({ height: 230 }, 800, egret.Ease.getBackOut(2.3));
				egret.Tween.get(rope2).to({ height: 230 }, 800, egret.Ease.getBackOut(2.3));
				egret.Tween.get(this._pullDownBox).set({ alpha: 0.3 }).to({ alpha: 1 }, 800, egret.Ease.quadIn);
				egret.Tween.get(this._pullDownBox).to({ y: endPosY }, 800, egret.Ease.getBackOut(2.3))
				Laya.timer.once(300, null, () => {

					for (let i: number = 0; i < this.openParam.starNum; i++) {
						let starBurstEff = UIUtil.creatMovieClip("starBurst");

						/*对齐星星*/
						if (i == 0) {
							starBurstEff.x = 80;
							starBurstEff.y = 70;
						}
						else if (i == 1) {
							starBurstEff.x = 80;
							starBurstEff.y = 70;
						}
						else if (i == 2) {
							starBurstEff.x = 100;
							starBurstEff.y = 100;
							starBurstEff.scaleX = starBurstEff.scaleY = 1.3;
						}
						let star: eui.Image = this.skin["star" + (i + 1)];
						let startScale: number = star.scaleX
						star.scaleX = star.scaleY = star.scaleX * 4;

						egret.Tween.get(star).wait(i * 500).set({ alpha: 0.3 }).to({ alpha: 1, scaleX: startScale, scaleY: startScale }, 500, egret.Ease.backIn)
						Laya.timer.once(i * 500 + 400, null, () => {
							let group: eui.Group = this.skin["starBox" + (i + 1)];
							group.addChild(starBurstEff);
							starBurstEff.gotoAndPlay(1, 1);
							starBurstEff.once(egret.MovieClipEvent.COMPLETE, () => {
								starBurstEff.visible = false;
							}, null)
						})

					}
				})
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
			super.dispose();
		}
	}
}
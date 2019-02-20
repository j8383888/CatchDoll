/**
 * 
 * @author suo 
 */
module catchDoll {
	export class BattleSelectLevel extends BasePopPanel implements IBaseSimpleUI {
		/**
		 * 滑动条
		 */
		private scroller: eui.Scroller;
		/**
		 * 间距
		 */
		private leading: number = 180

		public itemGroup: eui.Group;

		private _lastItem: eui.Image;

		private _lastIndex: number = 0;

		public offsetRate: number = 0.3



		public constructor() {
			super()
			this.skinName = "BattleSelectLevelSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			let middle = this.scroller.width / 2;
			this.scroller.addEventListener(eui.UIEvent.CHANGE, this._onChange, this);
			this.scroller.addEventListener(eui.UIEvent.CHANGE_START, this._onChangeStart, this);
			this.scroller.addEventListener(eui.UIEvent.CHANGE_END, this._onChangeEnd, this);
			this._onChange();
		}

		private _onChangeStart(): void {
			egret.Tween.removeTweens(this.scroller.viewport);
		}

		private _onChangeEnd(): void {
			let scrollH = (this._lastIndex - 2) * this.leading
			egret.Tween.get(this.scroller.viewport).to({ scrollH: scrollH }, 200, egret.Ease.quadIn);
		}

		/**
		 * 改变
		 */
		private _onChange(): void {
			let scrollH = this.scroller.viewport.scrollH
			let index = scrollH / this.leading;
			let indexUint = Math.floor(scrollH / this.leading);
			let DValue = index - indexUint;
			let maxIndex = this.itemGroup.numElements;

			if (index >= 0 && index < maxIndex) {
				if (DValue > (1 - this.offsetRate) || DValue < this.offsetRate) {
					indexUint += 2;
					if (DValue > (1 - this.offsetRate)) {
						indexUint += 1;
					}

					if (indexUint >= maxIndex) {
						indexUint = maxIndex - 2;
					}
					let item = this.itemGroup.getChildAt(indexUint) as eui.Image;
					if (this._lastItem && this._lastItem != item) {
						this._lastItem.scaleX = this._lastItem.scaleY = 1;
					}
					item.scaleX = item.scaleY = 1.5;
					this._lastItem = item;
					this._lastIndex = indexUint;
				}
			}
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage();
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
			this.scroller.removeEventListener(eui.UIEvent.CHANGE, this._onChange, this);
			this.scroller.removeEventListener(eui.UIEvent.CHANGE_START, this._onChange, this);
			this.scroller.removeEventListener(eui.UIEvent.CHANGE_END, this._onChange, this);
			super.dispose();
		}
	}
}
module catchDoll {
	export class ScollerTool {
		public scroller: eui.Scroller;
		public itemGroup: eui.Group;
		private _lastIndex: number;
		private _lastItem: any;
		public leading: number = 0;
		public offsetRate: number = 0.4;
		private _isScale: boolean = false;

		public constructor(scroller: eui.Scroller, leading: number, isScale: boolean = false) {
			this.scroller = scroller
			this.leading = leading;
			this._isScale = isScale;
			this.itemGroup = scroller.getChildAt(0) as eui.Group;
			this.scroller.addEventListener(eui.UIEvent.CHANGE, this._onChange, this);
			this.scroller.addEventListener(eui.UIEvent.CHANGE_START, this._onChangeStart, this);
			this.scroller.addEventListener(eui.UIEvent.CHANGE_END, this._onChangeEnd, this);
		}

		private _onChangeStart(): void {
			egret.Tween.removeTweens(this.scroller.viewport);
		}

		private _onChangeEnd(): void {
			let scrollH = (this._lastIndex) * this.leading
			egret.Tween.get(this.scroller.viewport).to({ scrollH: scrollH }, 200, egret.Ease.quadIn);
		}

		/**
		 * 改变
		 */
		private _onChange(): void {
			let scrollH = this.scroller.viewport.scrollH
			let index = scrollH / this.leading;
			let indexUint = Math.floor(index);
			let DValue = index - indexUint;
			let numElements = this.itemGroup.numElements;
			console.log(index);
			if (index > 0 && index < numElements) {
				if (DValue > (1 - this.offsetRate) || DValue < this.offsetRate) {
					if (DValue > (1 - this.offsetRate)) {
						indexUint += 1;
					}

					if (indexUint >= numElements) {
						indexUint = numElements - 1;
					}
					let item = this.itemGroup.getChildAt(indexUint) as BattleLevelItem;
					if (this._isScale) {
						if (this._lastItem && this._lastItem != item) {
							this._lastItem.scaleX = this._lastItem.scaleY = 0.6;
						}
						item.scaleX = item.scaleY = 1;
					}
					this._lastItem = item;
					this._lastIndex = indexUint;
				}
			}
			else if (index <= 0) {
				let item = this.itemGroup.getChildAt(0) as BattleLevelItem;
				if (this._isScale) {
					if (this._lastItem && this._lastItem != item) {
						this._lastItem.scaleX = this._lastItem.scaleY = 0.6;
					}
					item.scaleX = item.scaleY = 1;
				}
				this._lastItem = item;
				this._lastIndex = 0;
			}
			else {
				let item = this.itemGroup.getChildAt(numElements - 1) as BattleLevelItem;
				if (this._isScale) {
					if (this._lastItem && this._lastItem != item) {
						this._lastItem.scaleX = this._lastItem.scaleY = 0.6;
					}
					item.scaleX = item.scaleY = 1;
				}
				this._lastItem = item;
				this._lastIndex = numElements - 1;
			}
		}

		public dispose(): void {
			this.scroller.removeEventListener(eui.UIEvent.CHANGE, this._onChange, this);
			this.scroller.removeEventListener(eui.UIEvent.CHANGE_START, this._onChangeStart, this);
			this.scroller.removeEventListener(eui.UIEvent.CHANGE_END, this._onChangeEnd, this);
		}
	}
}
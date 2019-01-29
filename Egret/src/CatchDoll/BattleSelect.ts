/**
 * 
 * @author suo 
 */
module catchDoll {
	export class BattleSelect extends BasePopPanel implements IBaseSimpleUI {
		/**
		 * 滑动条
		 */
		private scroller: eui.Scroller;
		/**
		 * 间距
		 */
		private leading: number = 300

		public itemGroup: eui.Group;

		private lastItem: eui.Image;

		public offsetRate: number = 0.3



		public constructor() {
			super()
			this.skinName = "BattleSelectSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			let middle = this.scroller.width / 2;
			this.scroller.addEventListener(egret.Event.CHANGE, this._onChange, this);
			
			this._onChange();
		}

		/**
		 * 改变
		 */
		private _onChange(): void {
			let scrollH = this.scroller.viewport.scrollH
			let index = scrollH / this.leading;
			let indexUint = Math.floor(scrollH / this.leading);
			let DValue = index - indexUint;

			if (index >= 0 && index < 5) {
				if (DValue > (1 - this.offsetRate) || DValue < this.offsetRate) {
					index++;
					if (DValue > (1 - this.offsetRate)) {
						index += 1;
					}

					if (index >= 5) {
						index = 4
					}
					let item = this.itemGroup.getChildAt(index) as eui.Image;
					if (this.lastItem && this.lastItem != item) {
						this.lastItem.scaleX = this.lastItem.scaleY = 1;

					}
					item.scaleX = item.scaleY = 2;
					this.lastItem = item;
				}
				// else {
				// 	if (this.lastItem) {
				// 		this.lastItem.scaleX = this.lastItem.scaleY = 1;
				// 		this.lastItem = null;
				// 	}
				// }
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
			this.scroller.removeEventListener(egret.Event.CHANGE, this._onChange, this);
			super.dispose();
		}
	}
}
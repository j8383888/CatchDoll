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
		private leading: number = 240

		public itemGroup: eui.Group;

		private lastItem: eui.Image;

		public offsetRate:number = 0.25



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
		}

		/**
		 * 改变
		 */
		private _onChange(e: egret.Event): void {
			let scrollH = this.scroller.viewport.scrollH
			let index = scrollH / 180 + 1;
			let indexUint = Math.floor(scrollH / this.leading) + 1;
			let DValue = index - indexUint;

			if (index > 0 && index < 5 && (DValue > (1-this.offsetRate) || DValue < this.offsetRate)) {
				if (DValue > 0.9) {
					index += 1;

				}
				if (this.lastItem) {
					this.lastItem.scaleX = this.lastItem.scaleY = 1;
				}
				if (index >= 5) {
					index = 4
				}
				let item = this.itemGroup.getChildAt(index) as eui.Image;
				item.scaleX = item.scaleY = 2;
				this.lastItem = item;
			}


			if (scrollH < 0) {
			}
			else {
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
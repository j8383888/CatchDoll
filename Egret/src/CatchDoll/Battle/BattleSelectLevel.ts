/**
 * 
 * @author suo 
 */
module catchDoll {
	export class BattleSelectLevelPanel extends BasePopPanel implements IBaseSimpleUI {
		/**
		 * 滑动条
		 */
		private scroller: eui.Scroller;
		/**
		 * 间距
		 */
		private leading: number = 240

		public itemGroup: eui.Group;

		private _lastItem: BattleLevelItem;

		private _lastIndex: number = 0;

		public offsetRate: number = 0.3
		/**
		 * 章节ID
		 */
		public openParam: number = 0;

		public levelAry: BattleLevelItem[] = []
		/**
		 * 偏移X
		 */
		private _offsetX: number = 30 + 180 / 2;

		public constructor() {
			super(POP_EFFECT.CENTER, true)
			this.skinName = "BattleSelectLevelSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			let middle = this.scroller.width / 2;

			let datas = TableCenter.instance.getLevelsByChapterID(this.openParam);
			let len = datas.length

			let group = new eui.Group();
			group.width = 300 * 0.6;
			group.height = 420 * 0.6
			this.itemGroup.addChild(group);
			group.x = this._offsetX
			for (let i: number = 0; i < len; i++) {
				let levelData = datas[i];
				let level = new BattleLevelItem();
				level.setData(levelData);
				this.itemGroup.addChild(level);
				level.scaleX = level.scaleY = 0.6;
				level.y = this.itemGroup.height / 2;
				level.x = this._offsetX + (i + 1) * (180 + 60);
			}

			let group2 = new eui.Group();
			group2.width = 300 * 0.6;
			group2.height = 420 * 0.6
			this.itemGroup.addChild(group2);
			group2.x = this._offsetX + (len + 1) * (180 + 60);

			this.scroller.addEventListener(eui.UIEvent.CHANGE, this._onChange, this);
			this.scroller.addEventListener(eui.UIEvent.CHANGE_START, this._onChangeStart, this);
			this.scroller.addEventListener(eui.UIEvent.CHANGE_END, this._onChangeEnd, this);
			this._onChange();
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
					indexUint += 1;
					if (DValue > (1 - this.offsetRate)) {
						indexUint += 1;
					}

					if (indexUint >= numElements) {
						indexUint = numElements - 1;
					}
					let item = this.itemGroup.getChildAt(indexUint) as BattleLevelItem;
					if (this._lastItem && this._lastItem != item) {
						this._lastItem.scaleX = this._lastItem.scaleY = 0.6;
					}
					item.scaleX = item.scaleY = 1;
					this._lastItem = item;
					this._lastIndex = indexUint - 1;
				}
			}
			else if (index <= 0) {
				let item = this.itemGroup.getChildAt(1) as BattleLevelItem;
				if (this._lastItem && this._lastItem != item) {
					this._lastItem.scaleX = this._lastItem.scaleY = 0.6;
				}
				item.scaleX = item.scaleY = 1;
				this._lastItem = item;
				this._lastIndex = 0;
			}
			else {
				let item = this.itemGroup.getChildAt(numElements - 2) as BattleLevelItem;
				if (this._lastItem && this._lastItem != item) {
					this._lastItem.scaleX = this._lastItem.scaleY = 0.6;
				}
				item.scaleX = item.scaleY = 1;
				this._lastItem = item;
				this._lastIndex = 0;
			}
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage();
			this.closeBtnHandler = Handler.create(null, () => { SimpleUICenter.instance.closeUI(SIMPLE_UI.BattleSelect) });
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
			for (let item of this.levelAry) {
				item.dispose();
				item = null;
			}
			this.levelAry.length = 0;
			this.levelAry = null
			super.dispose();
		}
	}
}
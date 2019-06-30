/**
 * 
 * @author suo 
 */
module catchDoll {
	export class BattleChapterPanel extends BasePopPanel implements IBaseSimpleUI {

		/**
		 * 战斗按钮
		 */
		public chapterBtns: Button[] = [];



		public constructor() {
			super()
			this.skinName = "BattleChapterPanelSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			for (let i: number = 1; i <= 4; i++) {
				let group = this.skin["_chapterBtn" + i] as eui.Group
				let btn = new Button(group);
				btn.data = i;
				this.chapterBtns.push(btn);
				btn.mouseClickHandler = Handler.create(this, this._onClickChapter)
			}
		}

		/**
		 * 点击章节
		 */
		private _onClickChapter(btn: Button): void {
			let chapterID = btn.data;
			SimpleUICenter.instance.openUI(SIMPLE_UI.BattleSelect, chapterID)
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage(LAYER.BattleChapter);
			this.closeBtnHandler = Handler.create(null, () => { SimpleUICenter.instance.closeUI(SIMPLE_UI.BattleChapter) });
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
			for (let item of this.chapterBtns) {
				item.dispose();
				item = null;
			}
			super.dispose();
		}
	}
}
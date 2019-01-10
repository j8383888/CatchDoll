/**
 * 详细任务面板
 * @author suo 
 */
module catchDoll {
	export class TaskTreasureItem extends eui.Component {

		/**
		 * 任务描述
		 */
		public taskDec: eui.Label;
		/**
		 * 领取按钮
		 */
		public getBtn: Button;
		/**
		 * 星级盒子
		 */
		public starBox: eui.Group;
		/**
		 * 宝箱图标
		 */
		public treasureImg: eui.Image

		public constructor() {
			super();
			this.skinName = "TaskTreasureItemSkin"
		}

		/**
		 * 设置数据
		 */
		public setData(id: number, state?: TASK_STATE): void {
			let data: table.TreasureTable = ConfigParse.getWholeByProperty(TableCenter.instance.treasureTable, "id", id.toString());
			for (let i: number = 0; i < data.level; i++) {
				let img: eui.Image = new eui.Image();
				img.source = "otherRes2_47";
				this.starBox.addChild(img);
			}
			this.treasureImg.source = data.render[0];
			this.taskDec.text = data.condition;
			this.getBtn = new Button(this.skin["_getBtn"]);
		}


		/**
		 * 释放
		 */
		public dispose(): void {
			this.getBtn.dispose();
			this.getBtn = null;
		}
	}
}
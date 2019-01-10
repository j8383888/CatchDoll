/**
 * 详细任务面板
 * @author suo 
 */
module catchDoll {
	export class TaskItem extends eui.Component {

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

		public constructor() {
			super();
			this.skinName = "TaskItemSkin"
		}

		/**
		 * 设置数据
		 */
		public setData(id: number, state?: TASK_STATE): void {
			let data: table.TaskTable = ConfigParse.getWholeByProperty(TableCenter.instance.TaskTable, "id", id.toString());
			for (let i: number = 0; i < data.taskLevel; i++) {
				let img: eui.Image = new eui.Image();
				img.source = "otherRes2_47";
				this.starBox.addChild(img);
			}
			this.taskDec.text = data.taskContent;
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
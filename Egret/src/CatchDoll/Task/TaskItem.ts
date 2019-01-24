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
		/**
		 * 任务ID
		 */
		public taskID: number;

		public constructor() {
			super();
			this.skinName = "TaskItemSkin";
		}

		/**
		 * 设置数据
		 */
		public setData(task: Cmd.TaskUpdate_CS.ITaskInfo): void {
			this.taskID = task.taskID;
			let data: table.TaskTable = ConfigParse.getWholeByProperty(TableCenter.instance.TaskTable, "id", task.taskID.toString());
			this.starBox.removeChildren()
			for (let i: number = 0; i < data.taskLevel; i++) {
				let img: eui.Image = new eui.Image();
				img.source = "otherRes2_47";
				this.starBox.addChild(img);
			}
			this.taskDec.text = data.taskContent;
			this.getBtn = new Button(this.skin["_getBtn"]);
			if (task.taskState == 0) {
				this.getBtn.setLabel("未完成", 30, -1, -1)
				this.getBtn.enabled = false;
			}
			else if (task.taskState == 1) {
				this.getBtn.setLabel("领取", 30, -1, -1)
				this.getBtn.enabled = true;
			}
			else if (task.taskState == 2) {
				this.getBtn.setLabel("已完成", 30, -1, -1)
				this.getBtn.enabled = false;
			}
			this.getBtn.mouseClickHandler = Handler.create(null, () => {
				let cmd: Cmd.AcheiveTask_CS = new Cmd.AcheiveTask_CS();
				cmd.taskID = this.taskID;
				WebSocket.instance.sendMsg(cmd)
			}, null, true)
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
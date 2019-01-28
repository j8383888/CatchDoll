/**
 * 任务面板
 * @author suo 
 */
module catchDoll {
	export class TaskPanel extends BasePopPanel implements IBaseSimpleUI {

		/**
		 * 切换按钮组
		 */
		private _toggleButtonGroup: ToggleButtonGroup = new ToggleButtonGroup();
		/**
		 * 宝箱容器
		 */
		public treasureBox: eui.Group;
		/**
		 * 任务容器
		 */
		public taskBox: eui.Group;
		/**
		 * itemList
		 */
		public itemList: TaskItem[] = []
		/**
		 * treasureItemList
		 */
		public treasureItemList: TaskTreasureItem[] = [];
		/**
		 * 时间文本
		 */
		public timeLabel: eui.Label;

		public refreshBtn: Button;


		public constructor() {
			super(POP_EFFECT.CENTER, true);
			this.skinName = "TaskPanelSkin";


		}

		/**
		 * 更新任务
		 */
		private _update(): void {
			let time = (Master.instance.taskData.endTime - Master.instance.serveTime) / 1000
			if (time > 0) {
				this.timeLabel.text = GlobeTool.formatTime_HHMMSS(time);
			}
			let taskData: Cmd.ITaskUpdate_CS = Master.instance.taskData;
			let len: number = this.itemList.length;
			for (let i: number = 0; i < len; i++) {
				this.itemList[i].setData(taskData.taskInfo[i])
			}

		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			Laya.timer.loop(1000, this, this._update)
			EventManager.registerEvent(EVENT_ID.TaskUpdate_CS, Handler.create(this, this._update));
			this.refreshBtn = new Button(this.skin["_refreshBtn"]);
			this.refreshBtn.mouseClickHandler = Handler.create(null, () => {
				if (GlobeTool.getProp(PROP_ID.DIAMOND) < 2) {
					SystemTipsUtil.showTips("钻石不足！");
					return;
				}
				let cmd: Cmd.RefreshTask_C = new Cmd.RefreshTask_C();
				WebSocket.instance.sendMsg(cmd);
			})
			let toggle1: ToggleButton = new ToggleButton(this.skin["switchBtn1"])
			let toggle2: ToggleButton = new ToggleButton(this.skin["switchBtn2"])
			toggle1.selectHandler = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle1).source = "otherRes2_38";
				this._getSwitchBtnBG2(toggle1).source = "otherRes2_42";
				this.taskBox.visible = true;
				toggle1.x = 38
				toggle1.y = 0;
			})
			toggle1.cancelHanlder = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle1).source = "otherRes2_39";
				this._getSwitchBtnBG2(toggle1).source = "otherRes2_43";
				this.taskBox.visible = false;
				toggle1.x = 38
				toggle1.y = 66;
			})
			toggle2.selectHandler = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle2).source = "otherRes2_34";
				this._getSwitchBtnBG2(toggle2).source = "otherRes2_32";
				toggle2.x = 300
				toggle2.y = 0;
				this.treasureBox.visible = true;
			})
			toggle2.cancelHanlder = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle2).source = "otherRes2_35";
				this._getSwitchBtnBG2(toggle2).source = "otherRes2_33";
				toggle2.x = 400
				toggle2.y = 66;
				this.treasureBox.visible = false;
			})

			this._toggleButtonGroup.push(toggle1);
			this._toggleButtonGroup.push(toggle2);

			for (let i: number = 0; i < 3; i++) {
				let item: TaskItem = new TaskItem();
				this.taskBox.addChild(item);
				this.itemList.push(item);
			}
			let data2: table.TreasureTable[] = TableCenter.instance.treasureTable;
			for (let i: number = 0; i < 3; i++) {
				let item: TaskTreasureItem = new TaskTreasureItem();
				item.setData(data2[i].id)
				this.treasureBox.addChild(item);
				this.treasureItemList.push(item);
			}

			this._update();
		}

		/**
		 * 获得切换按钮背景
		 */
		private _getSwitchBtnBG(btn: Button): eui.Image {
			return (btn.root as eui.Group).getChildAt(0) as eui.Image
		}

		/**
		 * 获得切换按钮背景
		 */
		private _getSwitchBtnBG2(btn: Button): eui.Image {
			return (btn.root as eui.Group).getChildAt(1) as eui.Image
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this._toggleButtonGroup.clickByIndex = 0;
			this.addToStage();
			this.closeBtnHandler = Handler.create(null, () => { SimpleUICenter.instance.closeUI(SIMPLE_UI.taskPanel) }, null, false);
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
			this.refreshBtn.dispose();
			this.refreshBtn = null;
			Laya.timer.clear(this, this._update)
			for (let item of this.itemList) {
				item.dispose();
				item = null;
			}
			this.itemList.length = 0;
			this.itemList = null;
			for (let item of this.treasureItemList) {
				item.dispose();
				item = null;
			}
			EventManager.unregisterEvent(EVENT_ID.TaskUpdate_CS, this, this._update);
			this.treasureItemList.length = 0;
			this.treasureItemList = null;
			super.dispose();
		}
	}
}
/**
 * 全局工具
 * @author suo
 */
module catchDoll {
	export class GlobeTool {



		public constructor() {
		}

		/**
		 * 获得玩家道具数量
		 */
		public static getProp(propID: number): number {
			let propData: Cmd.IItemInfo_CS[] = Master.instance.itemData;
			for (let item of propData) {
				if (item.itemID == propID) {
					return item.itemNum;
				}
			}
		}


		/**
		 * 设置任务状态
		 */
		public static setTaskItem(taskID: number, taskState: number): void {
			let taskData = Master.instance.taskData;
			for (let item of taskData.taskInfo) {
				if (item.taskID == taskID) {
					item.taskState = taskState;
				}
			}
		}

		public static formatTime_DDHHMM(totalSeconds: number): string {
			if (totalSeconds <= 0) {
				return "";
			}

			var timeString: string = "";
			var day: number = Math.floor(totalSeconds / 86400);
			var hour: number = Math.floor((totalSeconds - day * 86400) / 3600)
			var minutes: number = Math.floor((totalSeconds - day * 86400 - hour * 3600) / 60);

			if (day > 0) {
				timeString += day.toString() + "天";
			}

			if (hour < 10) {
				timeString += "0" + hour.toString() + "小时";
			}
			else if (hour != 0) {
				timeString += hour.toString() + "小时";
			}

			if (minutes < 10) {
				timeString += "0" + minutes.toString() + "分";
			}
			else if (minutes != 0) {
				timeString += minutes.toString() + "分";
			}

			return timeString;
		}

		public static formatTime_HHMMSS(totalSeconds: number): string {
			var timeString: string = ""
			var hour: number = Math.floor(totalSeconds / 3600);
			var minutes: number = Math.floor((totalSeconds - hour * 3600) / 60);
			var seconds: number = Math.floor(totalSeconds - hour * 3600) % 60
			if (hour < 10) {
				timeString += "0" + hour.toString();
			} else {
				timeString += "" + hour;
			}
			if (minutes < 10) {
				timeString += ":0" + minutes.toString();
			} else {
				timeString += ":" + minutes;
			}
			if (seconds < 10) {
				timeString += ":0" + seconds.toString();
			} else {
				timeString += ":" + seconds;
			}
			return timeString;
		}
	}

	export enum ITEM_ID {
		MONEY = 1,
		DIMOND = 2,
		HONOR = 3,
	}
}
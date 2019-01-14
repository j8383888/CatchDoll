import { Cmd } from "../../protobuf/common";
export class TaskMgr {
    private static _taskMgr: TaskMgr = null;
    private _taskTimer: any = null;
    private _ws = null;
    /**
     * 获取单例
     */
    public static getInstance(): TaskMgr {
        if (!this._taskMgr) {
            this._taskMgr = new TaskMgr();
        }
        return this._taskMgr;
    };
    constructor() {

    };
    /**
     *  任务刷新计时
     */
    public taskTimer(): void {
        this._taskTimer = setInterval(() => {
            var time = new Date();
            var hour = time.getHours();
            var min = time.getMinutes();
            var ys = hour % 2;
            if (ys == 0) {
                if (min < 2 || min > 58) {
                    this.pushTaskList();       
                } else {
                    console.log(`还有${60 - min}分钟刷新任务列表`);
                }
            } else {
                console.log(`还有${ys}小时${60 - min}分钟刷新任务列表`);
            }
        }, 1000);
    };
    /**
     * 清空任务计时
     */
    public clealTsskTimer(): void {
        if (this._taskTimer) {
            clearInterval(this._taskTimer);
            this._taskTimer = null;
        }
    };
    /**
     *  推送任务列表
     */
    public pushTaskList(): void {
        let data: Cmd.TaskUpdate_CS = new Cmd.TaskUpdate_CS();
        let taskInfo: Cmd.TaskUpdate_CS.TaskInfo = new Cmd.TaskUpdate_CS.TaskInfo();
        data.uid = 1;
        taskInfo.taskID = 2;
        taskInfo.taskState = Cmd.TASK_STATE.undone;
        data.taskInfo.push(taskInfo);
        for (let index in this._ws.connectMap) {
            console.log(index);
        }
        // this._target.sendMsg(1, data);
    };
};
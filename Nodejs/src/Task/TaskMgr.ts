/**
 *  任务系统管理类，任何任务有关放在这
 */
import { Cmd } from "../../protobuf/common";
import { Utils } from "../util/Utils";
import { MyWebSocket } from "../MyWebSocket";
export class TaskMgr {
    private static _taskMgr: TaskMgr = null;
    private _taskTimer: any = null;
    private _ws = null;
    private _taskNum: number = 3;
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
            this.pushTaskList();      
            if (ys == 0) {
                if (min < 2 || min > 58) {
                    this.pushTaskList();       
                } else {
                    // console.log(`还有${60 - min}分钟刷新任务列表`);
                }
            } else {
                // console.log(`还有${ys}小时${60 - min}分钟刷新任务列表`);
            }
        }, 2000);
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
        let cmd: Cmd.TaskUpdate_CS = new Cmd.TaskUpdate_CS();
        let taskInfo: Cmd.TaskUpdate_CS.TaskInfo = new Cmd.TaskUpdate_CS.TaskInfo();
        Utils.getInstance().getFile("../resource/table/TaskTable.json", (data) => {
            console.log('任务列表', data);
            const curTaskIndex = [];
            const func = () => {
                if (curTaskIndex.length >= this._taskNum) {
                    console.log("刷新的任务下表列表：", curTaskIndex);
                    curTaskIndex.forEach((item) => {
                        // console.log("任务： ", data[item - 1]);
                        taskInfo.taskID = data[item - 1].id;
                        taskInfo.taskState = Cmd.TASK_STATE.undone;
                        cmd.taskInfo.push(taskInfo);
                        // MyWebSocket.instance.connectMap
                    });
                } else {
                    let canAdd = true;
                    const curNum = Utils.getInstance().getRandom(1, data.length);
                    curTaskIndex.forEach((item) => {
                        if (item == curNum) {
                            canAdd = false;
                        }
                    });
                    if (canAdd) {
                        curTaskIndex.push(curNum);
                    }
                    func();
                }
            };
            func();
        });
        // this._target.sendMsg(1, data);
    };
};
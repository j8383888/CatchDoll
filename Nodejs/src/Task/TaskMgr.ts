/**
 *  任务系统管理类，任何任务有关放在这
 */
import { Cmd } from "../../protobuf/common";
import { MyWebSocket } from "../WebSocket/MyWebSocket";
import { PlayerCenter } from "../PlayerCenter";
export class TaskMgr {
    private static _taskMgr: TaskMgr = null;
    private _taskTimer: NodeJS.Timer = null;
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
            let date = new Date();
            var min = date.getUTCMinutes();
            let second = date.getUTCSeconds();
            if (min == 0 && second == 0) {
                this._pushTaskList()
            }
        }, 1000)

        
        // console.log(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 25, date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds()), Date.now())
    };
    /**
     * 清空任务计时
     */
    public clealTaskTimer(): void {
        if (this._taskTimer) {
            clearInterval(this._taskTimer);
            this._taskTimer = null;
        }
    };
    /**
     *  推送任务列表
     */
    private _pushTaskList(): void {
        let len = MyWebSocket.instance.connectMap.length;
        for (let i: number = 0; i < len; i++) {
            let uid = MyWebSocket.instance.connectMap.keys[i];

            let cmd: Cmd.TaskUpdate_CS = new Cmd.TaskUpdate_CS();
            cmd.taskInfo = PlayerCenter.getRamdomTasks()
            let date = new Date();
            let endTime = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1, 0, 0, 0)
            cmd.endTime = endTime;
            MyWebSocket.instance.sendMsg(uid, cmd);
        }
    };
};
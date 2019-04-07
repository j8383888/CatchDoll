import * as $protobuf from "protobufjs";

export namespace Cmd {

    interface ILogin_C {
        account: string;
        password: string;
        uid?: (string|null);
    }

    class Login_C implements ILogin_C {
        constructor(properties?: Cmd.ILogin_C);
        public account: string;
        public password: string;
        public uid: string;
    }

    interface IPlayerInfo_S {
        uid: string;
        itemInfo?: (Cmd.IItemInfo_CS[]|null);
        taskInfo: Cmd.ITaskUpdate_CS;
        serveTime: number;
    }

    class PlayerInfo_S implements IPlayerInfo_S {
        constructor(properties?: Cmd.IPlayerInfo_S);
        public uid: string;
        public itemInfo: Cmd.IItemInfo_CS[];
        public taskInfo: Cmd.ITaskUpdate_CS;
        public serveTime: number;
    }

    interface IItemInfo_CS {
        itemID: number;
        itemNum?: (number|null);
        itemUpdateNum?: (number|null);
    }

    class ItemInfo_CS implements IItemInfo_CS {
        constructor(properties?: Cmd.IItemInfo_CS);
        public itemID: number;
        public itemNum: number;
        public itemUpdateNum: number;
    }

    interface IItemUpdate_CS {
        itemInfo?: (Cmd.IItemInfo_CS[]|null);
    }

    class ItemUpdate_CS implements IItemUpdate_CS {
        constructor(properties?: Cmd.IItemUpdate_CS);
        public itemInfo: Cmd.IItemInfo_CS[];
    }

    interface IHeartbeat_CS {
        uid: string;
    }

    class Heartbeat_CS implements IHeartbeat_CS {
        constructor(properties?: Cmd.IHeartbeat_CS);
        public uid: string;
    }

    interface ITaskUpdate_CS {
        taskInfo?: (Cmd.TaskUpdate_CS.ITaskInfo[]|null);
        endTime: number;
    }

    class TaskUpdate_CS implements ITaskUpdate_CS {
        constructor(properties?: Cmd.ITaskUpdate_CS);
        public taskInfo: Cmd.TaskUpdate_CS.ITaskInfo[];
        public endTime: number;
    }

    namespace TaskUpdate_CS {

        interface ITaskInfo {
            taskID: number;
            taskState: number;
        }

        class TaskInfo implements ITaskInfo {
            constructor(properties?: Cmd.TaskUpdate_CS.ITaskInfo);
            public taskID: number;
            public taskState: number;
        }
    }

    interface IRefreshTask_C {
    }

    class RefreshTask_C implements IRefreshTask_C {
        constructor(properties?: Cmd.IRefreshTask_C);
    }

    interface IGetTaskAward_C {
        taskID: number;
    }

    class GetTaskAward_C implements IGetTaskAward_C {
        constructor(properties?: Cmd.IGetTaskAward_C);
        public taskID: number;
    }

    interface ISameUidLogin_S {
    }

    class SameUidLogin_S implements ISameUidLogin_S {
        constructor(properties?: Cmd.ISameUidLogin_S);
    }

    interface IServeTips_S {
        tips: string;
    }

    class ServeTips_S implements IServeTips_S {
        constructor(properties?: Cmd.IServeTips_S);
        public tips: string;
    }
}

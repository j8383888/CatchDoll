import * as $protobuf from "protobufjs";

export namespace Cmd {

    interface ILogin_C {
        account: string;
        password: string;
        uid?: (number|null);
    }

    class Login_C implements ILogin_C {
        constructor(properties?: Cmd.ILogin_C);
        public account: string;
        public password: string;
        public uid: number;
    }

    interface IPlayerInfo_S {
        uid: number;
        itemInfo?: (Cmd.IItemInfo_CS[]|null);
        taskInfo: Cmd.ITaskUpdate_CS;
        serveTime: number;
    }

    class PlayerInfo_S implements IPlayerInfo_S {
        constructor(properties?: Cmd.IPlayerInfo_S);
        public uid: number;
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
        uid: number;
        itemInfo?: (Cmd.IItemInfo_CS[]|null);
    }

    class ItemUpdate_CS implements IItemUpdate_CS {
        constructor(properties?: Cmd.IItemUpdate_CS);
        public uid: number;
        public itemInfo: Cmd.IItemInfo_CS[];
    }

    interface IHeartbeat_CS {
        uid: number;
    }

    class Heartbeat_CS implements IHeartbeat_CS {
        constructor(properties?: Cmd.IHeartbeat_CS);
        public uid: number;
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

    interface IAcheiveTask_CS {
        taskID: number;
    }

    class AcheiveTask_CS implements IAcheiveTask_CS {
        constructor(properties?: Cmd.IAcheiveTask_CS);
        public taskID: number;
    }

    interface ISameUidLogin_S {
        uid: number;
    }

    class SameUidLogin_S implements ISameUidLogin_S {
        constructor(properties?: Cmd.ISameUidLogin_S);
        public uid: number;
    }
}

import * as $protobuf from "protobufjs";

/** Namespace Cmd. */
export namespace Cmd {

    /** Properties of a Login_C. */
    interface ILogin_C {

        /** Login_C account */
        account: string;

        /** Login_C password */
        password: string;

        /** Login_C uid */
        uid?: (number|null);
    }

    /** Represents a Login_C. */
    class Login_C implements ILogin_C {

        /**
         * Constructs a new Login_C.
         * @param [properties] Properties to set
         */
        constructor(properties?: Cmd.ILogin_C);

        /** Login_C account. */
        public account: string;

        /** Login_C password. */
        public password: string;

        /** Login_C uid. */
        public uid: number;

        /**
         * Creates a Login_C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Login_C
         */
        public static fromObject(object: { [k: string]: any }): Cmd.Login_C;

        /**
         * Creates a plain object from a Login_C message. Also converts values to other types if specified.
         * @param message Login_C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Cmd.Login_C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Login_C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemInfo_CS. */
    interface IItemInfo_CS {

        /** ItemInfo_CS itemID */
        itemID: number;

        /** ItemInfo_CS itemNum */
        itemNum?: (number|null);

        /** ItemInfo_CS itemUpdateNum */
        itemUpdateNum?: (number|null);
    }

    /** Represents an ItemInfo_CS. */
    class ItemInfo_CS implements IItemInfo_CS {

        /**
         * Constructs a new ItemInfo_CS.
         * @param [properties] Properties to set
         */
        constructor(properties?: Cmd.IItemInfo_CS);

        /** ItemInfo_CS itemID. */
        public itemID: number;

        /** ItemInfo_CS itemNum. */
        public itemNum: number;

        /** ItemInfo_CS itemUpdateNum. */
        public itemUpdateNum: number;

        /**
         * Creates an ItemInfo_CS message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemInfo_CS
         */
        public static fromObject(object: { [k: string]: any }): Cmd.ItemInfo_CS;

        /**
         * Creates a plain object from an ItemInfo_CS message. Also converts values to other types if specified.
         * @param message ItemInfo_CS
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Cmd.ItemInfo_CS, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemInfo_CS to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerInfo_S. */
    interface IPlayerInfo_S {

        /** PlayerInfo_S uid */
        uid: number;

        /** PlayerInfo_S itemInfo */
        itemInfo?: (Cmd.IItemInfo_CS[]|null);
    }

    /** Represents a PlayerInfo_S. */
    class PlayerInfo_S implements IPlayerInfo_S {

        /**
         * Constructs a new PlayerInfo_S.
         * @param [properties] Properties to set
         */
        constructor(properties?: Cmd.IPlayerInfo_S);

        /** PlayerInfo_S uid. */
        public uid: number;

        /** PlayerInfo_S itemInfo. */
        public itemInfo: Cmd.IItemInfo_CS[];

        /**
         * Creates a PlayerInfo_S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerInfo_S
         */
        public static fromObject(object: { [k: string]: any }): Cmd.PlayerInfo_S;

        /**
         * Creates a plain object from a PlayerInfo_S message. Also converts values to other types if specified.
         * @param message PlayerInfo_S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Cmd.PlayerInfo_S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerInfo_S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemUpdate_CS. */
    interface IItemUpdate_CS {

        /** ItemUpdate_CS uid */
        uid: number;

        /** ItemUpdate_CS itemInfo */
        itemInfo?: (Cmd.IItemInfo_CS[]|null);
    }

    /** Represents an ItemUpdate_CS. */
    class ItemUpdate_CS implements IItemUpdate_CS {

        /**
         * Constructs a new ItemUpdate_CS.
         * @param [properties] Properties to set
         */
        constructor(properties?: Cmd.IItemUpdate_CS);

        /** ItemUpdate_CS uid. */
        public uid: number;

        /** ItemUpdate_CS itemInfo. */
        public itemInfo: Cmd.IItemInfo_CS[];

        /**
         * Creates an ItemUpdate_CS message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemUpdate_CS
         */
        public static fromObject(object: { [k: string]: any }): Cmd.ItemUpdate_CS;

        /**
         * Creates a plain object from an ItemUpdate_CS message. Also converts values to other types if specified.
         * @param message ItemUpdate_CS
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Cmd.ItemUpdate_CS, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemUpdate_CS to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Heartbeat_CS. */
    interface IHeartbeat_CS {

        /** Heartbeat_CS uid */
        uid: number;
    }

    /** Represents a Heartbeat_CS. */
    class Heartbeat_CS implements IHeartbeat_CS {

        /**
         * Constructs a new Heartbeat_CS.
         * @param [properties] Properties to set
         */
        constructor(properties?: Cmd.IHeartbeat_CS);

        /** Heartbeat_CS uid. */
        public uid: number;

        /**
         * Creates a Heartbeat_CS message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Heartbeat_CS
         */
        public static fromObject(object: { [k: string]: any }): Cmd.Heartbeat_CS;

        /**
         * Creates a plain object from a Heartbeat_CS message. Also converts values to other types if specified.
         * @param message Heartbeat_CS
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Cmd.Heartbeat_CS, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Heartbeat_CS to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TaskUpdate_CS. */
    interface ITaskUpdate_CS {

        /** TaskUpdate_CS uid */
        uid: number;

        /** TaskUpdate_CS taskInfo */
        taskInfo?: (Cmd.TaskUpdate_CS.ITaskInfo[]|null);

        /** TaskUpdate_CS remainTime */
        remainTime: number;
    }

    /** Represents a TaskUpdate_CS. */
    class TaskUpdate_CS implements ITaskUpdate_CS {

        /**
         * Constructs a new TaskUpdate_CS.
         * @param [properties] Properties to set
         */
        constructor(properties?: Cmd.ITaskUpdate_CS);

        /** TaskUpdate_CS uid. */
        public uid: number;

        /** TaskUpdate_CS taskInfo. */
        public taskInfo: Cmd.TaskUpdate_CS.ITaskInfo[];

        /** TaskUpdate_CS remainTime. */
        public remainTime: number;

        /**
         * Creates a TaskUpdate_CS message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskUpdate_CS
         */
        public static fromObject(object: { [k: string]: any }): Cmd.TaskUpdate_CS;

        /**
         * Creates a plain object from a TaskUpdate_CS message. Also converts values to other types if specified.
         * @param message TaskUpdate_CS
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Cmd.TaskUpdate_CS, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskUpdate_CS to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace TaskUpdate_CS {

        /** Properties of a TaskInfo. */
        interface ITaskInfo {

            /** TaskInfo taskID */
            taskID: number;

            /** TaskInfo taskState */
            taskState: Cmd.TASK_STATE;
        }

        /** Represents a TaskInfo. */
        class TaskInfo implements ITaskInfo {

            /**
             * Constructs a new TaskInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: Cmd.TaskUpdate_CS.ITaskInfo);

            /** TaskInfo taskID. */
            public taskID: number;

            /** TaskInfo taskState. */
            public taskState: Cmd.TASK_STATE;

            /**
             * Creates a TaskInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TaskInfo
             */
            public static fromObject(object: { [k: string]: any }): Cmd.TaskUpdate_CS.TaskInfo;

            /**
             * Creates a plain object from a TaskInfo message. Also converts values to other types if specified.
             * @param message TaskInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Cmd.TaskUpdate_CS.TaskInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TaskInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** TASK_STATE enum. */
    enum TASK_STATE {
        undone = 0,
        done = 1
    }

    /** Properties of a SameUidLogin_S. */
    interface ISameUidLogin_S {

        /** SameUidLogin_S uid */
        uid: number;
    }

    /** Represents a SameUidLogin_S. */
    class SameUidLogin_S implements ISameUidLogin_S {

        /**
         * Constructs a new SameUidLogin_S.
         * @param [properties] Properties to set
         */
        constructor(properties?: Cmd.ISameUidLogin_S);

        /** SameUidLogin_S uid. */
        public uid: number;

        /**
         * Creates a SameUidLogin_S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SameUidLogin_S
         */
        public static fromObject(object: { [k: string]: any }): Cmd.SameUidLogin_S;

        /**
         * Creates a plain object from a SameUidLogin_S message. Also converts values to other types if specified.
         * @param message SameUidLogin_S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Cmd.SameUidLogin_S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SameUidLogin_S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

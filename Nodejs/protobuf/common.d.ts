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

        /** TaskUpdate_CS taskID */
        taskID: number;

        /** TaskUpdate_CS taskState */
        taskState: number;
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

        /** TaskUpdate_CS taskID. */
        public taskID: number;

        /** TaskUpdate_CS taskState. */
        public taskState: number;

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

    /** TASK_STATE enum. */
    enum TASK_STATE {
        undone = 0,
        done = 1
    }
}

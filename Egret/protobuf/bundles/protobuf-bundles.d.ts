type Long = protobuf.Long;

/** Namespace Cmd. */
declare namespace Cmd {

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
         * Encodes the specified Login_C message. Does not implicitly {@link Cmd.Login_C.verify|verify} messages.
         * @param message Login_C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.ILogin_C, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Login_C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Login_C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.Login_C;
    }

    /** Properties of a PlayerInfo_S. */
    interface IPlayerInfo_S {

        /** PlayerInfo_S uid */
        uid: number;

        /** PlayerInfo_S itemInfo */
        itemInfo?: (Cmd.IItemInfo_CS[]|null);

        /** PlayerInfo_S taskInfo */
        taskInfo: Cmd.ITaskUpdate_CS;

        /** PlayerInfo_S serveTime */
        serveTime: number;
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

        /** PlayerInfo_S taskInfo. */
        public taskInfo: Cmd.ITaskUpdate_CS;

        /** PlayerInfo_S serveTime. */
        public serveTime: number;

        /**
         * Encodes the specified PlayerInfo_S message. Does not implicitly {@link Cmd.PlayerInfo_S.verify|verify} messages.
         * @param message PlayerInfo_S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.IPlayerInfo_S, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a PlayerInfo_S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerInfo_S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.PlayerInfo_S;
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
         * Encodes the specified ItemInfo_CS message. Does not implicitly {@link Cmd.ItemInfo_CS.verify|verify} messages.
         * @param message ItemInfo_CS message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.IItemInfo_CS, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemInfo_CS message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemInfo_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.ItemInfo_CS;
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
         * Encodes the specified ItemUpdate_CS message. Does not implicitly {@link Cmd.ItemUpdate_CS.verify|verify} messages.
         * @param message ItemUpdate_CS message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.IItemUpdate_CS, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemUpdate_CS message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemUpdate_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.ItemUpdate_CS;
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
         * Encodes the specified Heartbeat_CS message. Does not implicitly {@link Cmd.Heartbeat_CS.verify|verify} messages.
         * @param message Heartbeat_CS message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.IHeartbeat_CS, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Heartbeat_CS message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Heartbeat_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.Heartbeat_CS;
    }

    /** Properties of a TaskUpdate_CS. */
    interface ITaskUpdate_CS {

        /** TaskUpdate_CS taskInfo */
        taskInfo?: (Cmd.TaskUpdate_CS.ITaskInfo[]|null);

        /** TaskUpdate_CS endTime */
        endTime?: (number|null);
    }

    /** Represents a TaskUpdate_CS. */
    class TaskUpdate_CS implements ITaskUpdate_CS {

        /**
         * Constructs a new TaskUpdate_CS.
         * @param [properties] Properties to set
         */
        constructor(properties?: Cmd.ITaskUpdate_CS);

        /** TaskUpdate_CS taskInfo. */
        public taskInfo: Cmd.TaskUpdate_CS.ITaskInfo[];

        /** TaskUpdate_CS endTime. */
        public endTime: number;

        /**
         * Encodes the specified TaskUpdate_CS message. Does not implicitly {@link Cmd.TaskUpdate_CS.verify|verify} messages.
         * @param message TaskUpdate_CS message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.ITaskUpdate_CS, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TaskUpdate_CS message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskUpdate_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.TaskUpdate_CS;
    }

    namespace TaskUpdate_CS {

        /** Properties of a TaskInfo. */
        interface ITaskInfo {

            /** TaskInfo taskID */
            taskID: number;

            /** TaskInfo taskState */
            taskState: number;
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
            public taskState: number;

            /**
             * Encodes the specified TaskInfo message. Does not implicitly {@link Cmd.TaskUpdate_CS.TaskInfo.verify|verify} messages.
             * @param message TaskInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Cmd.TaskUpdate_CS.ITaskInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a TaskInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TaskInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.TaskUpdate_CS.TaskInfo;
        }
    }

    /** Properties of an AcheiveTask_CS. */
    interface IAcheiveTask_CS {

        /** AcheiveTask_CS taskID */
        taskID: number;
    }

    /** Represents an AcheiveTask_CS. */
    class AcheiveTask_CS implements IAcheiveTask_CS {

        /**
         * Constructs a new AcheiveTask_CS.
         * @param [properties] Properties to set
         */
        constructor(properties?: Cmd.IAcheiveTask_CS);

        /** AcheiveTask_CS taskID. */
        public taskID: number;

        /**
         * Encodes the specified AcheiveTask_CS message. Does not implicitly {@link Cmd.AcheiveTask_CS.verify|verify} messages.
         * @param message AcheiveTask_CS message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.IAcheiveTask_CS, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an AcheiveTask_CS message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AcheiveTask_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.AcheiveTask_CS;
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
         * Encodes the specified SameUidLogin_S message. Does not implicitly {@link Cmd.SameUidLogin_S.verify|verify} messages.
         * @param message SameUidLogin_S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.ISameUidLogin_S, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SameUidLogin_S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SameUidLogin_S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.SameUidLogin_S;
    }
}

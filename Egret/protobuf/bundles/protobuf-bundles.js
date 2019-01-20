var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Cmd = (function() {

    /**
     * Namespace Cmd.
     * @exports Cmd
     * @namespace
     */
    var Cmd = {};

    Cmd.Login_C = (function() {

        /**
         * Properties of a Login_C.
         * @memberof Cmd
         * @interface ILogin_C
         * @property {string} account Login_C account
         * @property {string} password Login_C password
         * @property {number|null} [uid] Login_C uid
         */

        /**
         * Constructs a new Login_C.
         * @memberof Cmd
         * @classdesc Represents a Login_C.
         * @implements ILogin_C
         * @constructor
         * @param {Cmd.ILogin_C=} [properties] Properties to set
         */
        function Login_C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Login_C account.
         * @member {string} account
         * @memberof Cmd.Login_C
         * @instance
         */
        Login_C.prototype.account = "";

        /**
         * Login_C password.
         * @member {string} password
         * @memberof Cmd.Login_C
         * @instance
         */
        Login_C.prototype.password = "";

        /**
         * Login_C uid.
         * @member {number} uid
         * @memberof Cmd.Login_C
         * @instance
         */
        Login_C.prototype.uid = 0;

        /**
         * Encodes the specified Login_C message. Does not implicitly {@link Cmd.Login_C.verify|verify} messages.
         * @function encode
         * @memberof Cmd.Login_C
         * @static
         * @param {Cmd.ILogin_C} message Login_C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login_C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.uid);
            return writer;
        };

        /**
         * Decodes a Login_C message from the specified reader or buffer.
         * @function decode
         * @memberof Cmd.Login_C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Cmd.Login_C} Login_C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login_C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Cmd.Login_C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.password = reader.string();
                    break;
                case 3:
                    message.uid = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("account"))
                throw $util.ProtocolError("missing required 'account'", { instance: message });
            if (!message.hasOwnProperty("password"))
                throw $util.ProtocolError("missing required 'password'", { instance: message });
            return message;
        };

        return Login_C;
    })();

    Cmd.PlayerInfo_S = (function() {

        /**
         * Properties of a PlayerInfo_S.
         * @memberof Cmd
         * @interface IPlayerInfo_S
         * @property {number} uid PlayerInfo_S uid
         * @property {Array.<Cmd.IItemInfo_CS>|null} [itemInfo] PlayerInfo_S itemInfo
         * @property {Cmd.ITaskUpdate_CS} taskInfo PlayerInfo_S taskInfo
         * @property {number} serveTime PlayerInfo_S serveTime
         */

        /**
         * Constructs a new PlayerInfo_S.
         * @memberof Cmd
         * @classdesc Represents a PlayerInfo_S.
         * @implements IPlayerInfo_S
         * @constructor
         * @param {Cmd.IPlayerInfo_S=} [properties] Properties to set
         */
        function PlayerInfo_S(properties) {
            this.itemInfo = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfo_S uid.
         * @member {number} uid
         * @memberof Cmd.PlayerInfo_S
         * @instance
         */
        PlayerInfo_S.prototype.uid = 0;

        /**
         * PlayerInfo_S itemInfo.
         * @member {Array.<Cmd.IItemInfo_CS>} itemInfo
         * @memberof Cmd.PlayerInfo_S
         * @instance
         */
        PlayerInfo_S.prototype.itemInfo = $util.emptyArray;

        /**
         * PlayerInfo_S taskInfo.
         * @member {Cmd.ITaskUpdate_CS} taskInfo
         * @memberof Cmd.PlayerInfo_S
         * @instance
         */
        PlayerInfo_S.prototype.taskInfo = null;

        /**
         * PlayerInfo_S serveTime.
         * @member {number} serveTime
         * @memberof Cmd.PlayerInfo_S
         * @instance
         */
        PlayerInfo_S.prototype.serveTime = 0;

        /**
         * Encodes the specified PlayerInfo_S message. Does not implicitly {@link Cmd.PlayerInfo_S.verify|verify} messages.
         * @function encode
         * @memberof Cmd.PlayerInfo_S
         * @static
         * @param {Cmd.IPlayerInfo_S} message PlayerInfo_S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo_S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.itemInfo != null && message.itemInfo.length)
                for (var i = 0; i < message.itemInfo.length; ++i)
                    $root.Cmd.ItemInfo_CS.encode(message.itemInfo[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            $root.Cmd.TaskUpdate_CS.encode(message.taskInfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.serveTime);
            return writer;
        };

        /**
         * Decodes a PlayerInfo_S message from the specified reader or buffer.
         * @function decode
         * @memberof Cmd.PlayerInfo_S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Cmd.PlayerInfo_S} PlayerInfo_S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo_S.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Cmd.PlayerInfo_S();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int32();
                    break;
                case 2:
                    if (!(message.itemInfo && message.itemInfo.length))
                        message.itemInfo = [];
                    message.itemInfo.push($root.Cmd.ItemInfo_CS.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.taskInfo = $root.Cmd.TaskUpdate_CS.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.serveTime = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("uid"))
                throw $util.ProtocolError("missing required 'uid'", { instance: message });
            if (!message.hasOwnProperty("taskInfo"))
                throw $util.ProtocolError("missing required 'taskInfo'", { instance: message });
            if (!message.hasOwnProperty("serveTime"))
                throw $util.ProtocolError("missing required 'serveTime'", { instance: message });
            return message;
        };

        return PlayerInfo_S;
    })();

    Cmd.ItemInfo_CS = (function() {

        /**
         * Properties of an ItemInfo_CS.
         * @memberof Cmd
         * @interface IItemInfo_CS
         * @property {number} itemID ItemInfo_CS itemID
         * @property {number|null} [itemNum] ItemInfo_CS itemNum
         * @property {number|null} [itemUpdateNum] ItemInfo_CS itemUpdateNum
         */

        /**
         * Constructs a new ItemInfo_CS.
         * @memberof Cmd
         * @classdesc Represents an ItemInfo_CS.
         * @implements IItemInfo_CS
         * @constructor
         * @param {Cmd.IItemInfo_CS=} [properties] Properties to set
         */
        function ItemInfo_CS(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ItemInfo_CS itemID.
         * @member {number} itemID
         * @memberof Cmd.ItemInfo_CS
         * @instance
         */
        ItemInfo_CS.prototype.itemID = 0;

        /**
         * ItemInfo_CS itemNum.
         * @member {number} itemNum
         * @memberof Cmd.ItemInfo_CS
         * @instance
         */
        ItemInfo_CS.prototype.itemNum = 0;

        /**
         * ItemInfo_CS itemUpdateNum.
         * @member {number} itemUpdateNum
         * @memberof Cmd.ItemInfo_CS
         * @instance
         */
        ItemInfo_CS.prototype.itemUpdateNum = 0;

        /**
         * Encodes the specified ItemInfo_CS message. Does not implicitly {@link Cmd.ItemInfo_CS.verify|verify} messages.
         * @function encode
         * @memberof Cmd.ItemInfo_CS
         * @static
         * @param {Cmd.IItemInfo_CS} message ItemInfo_CS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemInfo_CS.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.itemID);
            if (message.itemNum != null && message.hasOwnProperty("itemNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.itemNum);
            if (message.itemUpdateNum != null && message.hasOwnProperty("itemUpdateNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.itemUpdateNum);
            return writer;
        };

        /**
         * Decodes an ItemInfo_CS message from the specified reader or buffer.
         * @function decode
         * @memberof Cmd.ItemInfo_CS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Cmd.ItemInfo_CS} ItemInfo_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemInfo_CS.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Cmd.ItemInfo_CS();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.itemID = reader.int32();
                    break;
                case 2:
                    message.itemNum = reader.int32();
                    break;
                case 3:
                    message.itemUpdateNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("itemID"))
                throw $util.ProtocolError("missing required 'itemID'", { instance: message });
            return message;
        };

        return ItemInfo_CS;
    })();

    Cmd.ItemUpdate_CS = (function() {

        /**
         * Properties of an ItemUpdate_CS.
         * @memberof Cmd
         * @interface IItemUpdate_CS
         * @property {number} uid ItemUpdate_CS uid
         * @property {Array.<Cmd.IItemInfo_CS>|null} [itemInfo] ItemUpdate_CS itemInfo
         */

        /**
         * Constructs a new ItemUpdate_CS.
         * @memberof Cmd
         * @classdesc Represents an ItemUpdate_CS.
         * @implements IItemUpdate_CS
         * @constructor
         * @param {Cmd.IItemUpdate_CS=} [properties] Properties to set
         */
        function ItemUpdate_CS(properties) {
            this.itemInfo = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ItemUpdate_CS uid.
         * @member {number} uid
         * @memberof Cmd.ItemUpdate_CS
         * @instance
         */
        ItemUpdate_CS.prototype.uid = 0;

        /**
         * ItemUpdate_CS itemInfo.
         * @member {Array.<Cmd.IItemInfo_CS>} itemInfo
         * @memberof Cmd.ItemUpdate_CS
         * @instance
         */
        ItemUpdate_CS.prototype.itemInfo = $util.emptyArray;

        /**
         * Encodes the specified ItemUpdate_CS message. Does not implicitly {@link Cmd.ItemUpdate_CS.verify|verify} messages.
         * @function encode
         * @memberof Cmd.ItemUpdate_CS
         * @static
         * @param {Cmd.IItemUpdate_CS} message ItemUpdate_CS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemUpdate_CS.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.itemInfo != null && message.itemInfo.length)
                for (var i = 0; i < message.itemInfo.length; ++i)
                    $root.Cmd.ItemInfo_CS.encode(message.itemInfo[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes an ItemUpdate_CS message from the specified reader or buffer.
         * @function decode
         * @memberof Cmd.ItemUpdate_CS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Cmd.ItemUpdate_CS} ItemUpdate_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemUpdate_CS.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Cmd.ItemUpdate_CS();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int32();
                    break;
                case 2:
                    if (!(message.itemInfo && message.itemInfo.length))
                        message.itemInfo = [];
                    message.itemInfo.push($root.Cmd.ItemInfo_CS.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("uid"))
                throw $util.ProtocolError("missing required 'uid'", { instance: message });
            return message;
        };

        return ItemUpdate_CS;
    })();

    Cmd.Heartbeat_CS = (function() {

        /**
         * Properties of a Heartbeat_CS.
         * @memberof Cmd
         * @interface IHeartbeat_CS
         * @property {number} uid Heartbeat_CS uid
         */

        /**
         * Constructs a new Heartbeat_CS.
         * @memberof Cmd
         * @classdesc Represents a Heartbeat_CS.
         * @implements IHeartbeat_CS
         * @constructor
         * @param {Cmd.IHeartbeat_CS=} [properties] Properties to set
         */
        function Heartbeat_CS(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Heartbeat_CS uid.
         * @member {number} uid
         * @memberof Cmd.Heartbeat_CS
         * @instance
         */
        Heartbeat_CS.prototype.uid = 0;

        /**
         * Encodes the specified Heartbeat_CS message. Does not implicitly {@link Cmd.Heartbeat_CS.verify|verify} messages.
         * @function encode
         * @memberof Cmd.Heartbeat_CS
         * @static
         * @param {Cmd.IHeartbeat_CS} message Heartbeat_CS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Heartbeat_CS.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            return writer;
        };

        /**
         * Decodes a Heartbeat_CS message from the specified reader or buffer.
         * @function decode
         * @memberof Cmd.Heartbeat_CS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Cmd.Heartbeat_CS} Heartbeat_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Heartbeat_CS.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Cmd.Heartbeat_CS();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("uid"))
                throw $util.ProtocolError("missing required 'uid'", { instance: message });
            return message;
        };

        return Heartbeat_CS;
    })();

    Cmd.TaskUpdate_CS = (function() {

        /**
         * Properties of a TaskUpdate_CS.
         * @memberof Cmd
         * @interface ITaskUpdate_CS
         * @property {Array.<Cmd.TaskUpdate_CS.ITaskInfo>|null} [taskInfo] TaskUpdate_CS taskInfo
         * @property {number} endTime TaskUpdate_CS endTime
         */

        /**
         * Constructs a new TaskUpdate_CS.
         * @memberof Cmd
         * @classdesc Represents a TaskUpdate_CS.
         * @implements ITaskUpdate_CS
         * @constructor
         * @param {Cmd.ITaskUpdate_CS=} [properties] Properties to set
         */
        function TaskUpdate_CS(properties) {
            this.taskInfo = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TaskUpdate_CS taskInfo.
         * @member {Array.<Cmd.TaskUpdate_CS.ITaskInfo>} taskInfo
         * @memberof Cmd.TaskUpdate_CS
         * @instance
         */
        TaskUpdate_CS.prototype.taskInfo = $util.emptyArray;

        /**
         * TaskUpdate_CS endTime.
         * @member {number} endTime
         * @memberof Cmd.TaskUpdate_CS
         * @instance
         */
        TaskUpdate_CS.prototype.endTime = 0;

        /**
         * Encodes the specified TaskUpdate_CS message. Does not implicitly {@link Cmd.TaskUpdate_CS.verify|verify} messages.
         * @function encode
         * @memberof Cmd.TaskUpdate_CS
         * @static
         * @param {Cmd.ITaskUpdate_CS} message TaskUpdate_CS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TaskUpdate_CS.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.taskInfo != null && message.taskInfo.length)
                for (var i = 0; i < message.taskInfo.length; ++i)
                    $root.Cmd.TaskUpdate_CS.TaskInfo.encode(message.taskInfo[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.endTime);
            return writer;
        };

        /**
         * Decodes a TaskUpdate_CS message from the specified reader or buffer.
         * @function decode
         * @memberof Cmd.TaskUpdate_CS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Cmd.TaskUpdate_CS} TaskUpdate_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TaskUpdate_CS.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Cmd.TaskUpdate_CS();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.taskInfo && message.taskInfo.length))
                        message.taskInfo = [];
                    message.taskInfo.push($root.Cmd.TaskUpdate_CS.TaskInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.endTime = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("endTime"))
                throw $util.ProtocolError("missing required 'endTime'", { instance: message });
            return message;
        };

        TaskUpdate_CS.TaskInfo = (function() {

            /**
             * Properties of a TaskInfo.
             * @memberof Cmd.TaskUpdate_CS
             * @interface ITaskInfo
             * @property {number} taskID TaskInfo taskID
             * @property {number} taskState TaskInfo taskState
             */

            /**
             * Constructs a new TaskInfo.
             * @memberof Cmd.TaskUpdate_CS
             * @classdesc Represents a TaskInfo.
             * @implements ITaskInfo
             * @constructor
             * @param {Cmd.TaskUpdate_CS.ITaskInfo=} [properties] Properties to set
             */
            function TaskInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TaskInfo taskID.
             * @member {number} taskID
             * @memberof Cmd.TaskUpdate_CS.TaskInfo
             * @instance
             */
            TaskInfo.prototype.taskID = 0;

            /**
             * TaskInfo taskState.
             * @member {number} taskState
             * @memberof Cmd.TaskUpdate_CS.TaskInfo
             * @instance
             */
            TaskInfo.prototype.taskState = 0;

            /**
             * Encodes the specified TaskInfo message. Does not implicitly {@link Cmd.TaskUpdate_CS.TaskInfo.verify|verify} messages.
             * @function encode
             * @memberof Cmd.TaskUpdate_CS.TaskInfo
             * @static
             * @param {Cmd.TaskUpdate_CS.ITaskInfo} message TaskInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TaskInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.taskID);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.taskState);
                return writer;
            };

            /**
             * Decodes a TaskInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Cmd.TaskUpdate_CS.TaskInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Cmd.TaskUpdate_CS.TaskInfo} TaskInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TaskInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Cmd.TaskUpdate_CS.TaskInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.taskID = reader.int32();
                        break;
                    case 2:
                        message.taskState = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("taskID"))
                    throw $util.ProtocolError("missing required 'taskID'", { instance: message });
                if (!message.hasOwnProperty("taskState"))
                    throw $util.ProtocolError("missing required 'taskState'", { instance: message });
                return message;
            };

            return TaskInfo;
        })();

        return TaskUpdate_CS;
    })();

    Cmd.SameUidLogin_S = (function() {

        /**
         * Properties of a SameUidLogin_S.
         * @memberof Cmd
         * @interface ISameUidLogin_S
         * @property {number} uid SameUidLogin_S uid
         */

        /**
         * Constructs a new SameUidLogin_S.
         * @memberof Cmd
         * @classdesc Represents a SameUidLogin_S.
         * @implements ISameUidLogin_S
         * @constructor
         * @param {Cmd.ISameUidLogin_S=} [properties] Properties to set
         */
        function SameUidLogin_S(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SameUidLogin_S uid.
         * @member {number} uid
         * @memberof Cmd.SameUidLogin_S
         * @instance
         */
        SameUidLogin_S.prototype.uid = 0;

        /**
         * Encodes the specified SameUidLogin_S message. Does not implicitly {@link Cmd.SameUidLogin_S.verify|verify} messages.
         * @function encode
         * @memberof Cmd.SameUidLogin_S
         * @static
         * @param {Cmd.ISameUidLogin_S} message SameUidLogin_S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SameUidLogin_S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            return writer;
        };

        /**
         * Decodes a SameUidLogin_S message from the specified reader or buffer.
         * @function decode
         * @memberof Cmd.SameUidLogin_S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Cmd.SameUidLogin_S} SameUidLogin_S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SameUidLogin_S.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Cmd.SameUidLogin_S();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("uid"))
                throw $util.ProtocolError("missing required 'uid'", { instance: message });
            return message;
        };

        return SameUidLogin_S;
    })();

    return Cmd;
})();
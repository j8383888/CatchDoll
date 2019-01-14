/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $util = $protobuf.util;

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
         * Creates a Login_C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Cmd.Login_C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Cmd.Login_C} Login_C
         */
        Login_C.fromObject = function fromObject(object) {
            if (object instanceof $root.Cmd.Login_C)
                return object;
            var message = new $root.Cmd.Login_C();
            if (object.account != null)
                message.account = String(object.account);
            if (object.password != null)
                message.password = String(object.password);
            if (object.uid != null)
                message.uid = object.uid | 0;
            return message;
        };

        /**
         * Creates a plain object from a Login_C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Cmd.Login_C
         * @static
         * @param {Cmd.Login_C} message Login_C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Login_C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.account = "";
                object.password = "";
                object.uid = 0;
            }
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            return object;
        };

        /**
         * Converts this Login_C to JSON.
         * @function toJSON
         * @memberof Cmd.Login_C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Login_C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Login_C;
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
         * Creates an ItemInfo_CS message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Cmd.ItemInfo_CS
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Cmd.ItemInfo_CS} ItemInfo_CS
         */
        ItemInfo_CS.fromObject = function fromObject(object) {
            if (object instanceof $root.Cmd.ItemInfo_CS)
                return object;
            var message = new $root.Cmd.ItemInfo_CS();
            if (object.itemID != null)
                message.itemID = object.itemID | 0;
            if (object.itemNum != null)
                message.itemNum = object.itemNum | 0;
            if (object.itemUpdateNum != null)
                message.itemUpdateNum = object.itemUpdateNum | 0;
            return message;
        };

        /**
         * Creates a plain object from an ItemInfo_CS message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Cmd.ItemInfo_CS
         * @static
         * @param {Cmd.ItemInfo_CS} message ItemInfo_CS
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ItemInfo_CS.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.itemID = 0;
                object.itemNum = 0;
                object.itemUpdateNum = 0;
            }
            if (message.itemID != null && message.hasOwnProperty("itemID"))
                object.itemID = message.itemID;
            if (message.itemNum != null && message.hasOwnProperty("itemNum"))
                object.itemNum = message.itemNum;
            if (message.itemUpdateNum != null && message.hasOwnProperty("itemUpdateNum"))
                object.itemUpdateNum = message.itemUpdateNum;
            return object;
        };

        /**
         * Converts this ItemInfo_CS to JSON.
         * @function toJSON
         * @memberof Cmd.ItemInfo_CS
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ItemInfo_CS.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ItemInfo_CS;
    })();

    Cmd.PlayerInfo_S = (function() {

        /**
         * Properties of a PlayerInfo_S.
         * @memberof Cmd
         * @interface IPlayerInfo_S
         * @property {number} uid PlayerInfo_S uid
         * @property {Array.<Cmd.IItemInfo_CS>|null} [itemInfo] PlayerInfo_S itemInfo
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
         * Creates a PlayerInfo_S message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Cmd.PlayerInfo_S
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Cmd.PlayerInfo_S} PlayerInfo_S
         */
        PlayerInfo_S.fromObject = function fromObject(object) {
            if (object instanceof $root.Cmd.PlayerInfo_S)
                return object;
            var message = new $root.Cmd.PlayerInfo_S();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.itemInfo) {
                if (!Array.isArray(object.itemInfo))
                    throw TypeError(".Cmd.PlayerInfo_S.itemInfo: array expected");
                message.itemInfo = [];
                for (var i = 0; i < object.itemInfo.length; ++i) {
                    if (typeof object.itemInfo[i] !== "object")
                        throw TypeError(".Cmd.PlayerInfo_S.itemInfo: object expected");
                    message.itemInfo[i] = $root.Cmd.ItemInfo_CS.fromObject(object.itemInfo[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfo_S message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Cmd.PlayerInfo_S
         * @static
         * @param {Cmd.PlayerInfo_S} message PlayerInfo_S
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfo_S.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.itemInfo = [];
            if (options.defaults)
                object.uid = 0;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.itemInfo && message.itemInfo.length) {
                object.itemInfo = [];
                for (var j = 0; j < message.itemInfo.length; ++j)
                    object.itemInfo[j] = $root.Cmd.ItemInfo_CS.toObject(message.itemInfo[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerInfo_S to JSON.
         * @function toJSON
         * @memberof Cmd.PlayerInfo_S
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfo_S.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerInfo_S;
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
         * Creates an ItemUpdate_CS message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Cmd.ItemUpdate_CS
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Cmd.ItemUpdate_CS} ItemUpdate_CS
         */
        ItemUpdate_CS.fromObject = function fromObject(object) {
            if (object instanceof $root.Cmd.ItemUpdate_CS)
                return object;
            var message = new $root.Cmd.ItemUpdate_CS();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.itemInfo) {
                if (!Array.isArray(object.itemInfo))
                    throw TypeError(".Cmd.ItemUpdate_CS.itemInfo: array expected");
                message.itemInfo = [];
                for (var i = 0; i < object.itemInfo.length; ++i) {
                    if (typeof object.itemInfo[i] !== "object")
                        throw TypeError(".Cmd.ItemUpdate_CS.itemInfo: object expected");
                    message.itemInfo[i] = $root.Cmd.ItemInfo_CS.fromObject(object.itemInfo[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ItemUpdate_CS message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Cmd.ItemUpdate_CS
         * @static
         * @param {Cmd.ItemUpdate_CS} message ItemUpdate_CS
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ItemUpdate_CS.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.itemInfo = [];
            if (options.defaults)
                object.uid = 0;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.itemInfo && message.itemInfo.length) {
                object.itemInfo = [];
                for (var j = 0; j < message.itemInfo.length; ++j)
                    object.itemInfo[j] = $root.Cmd.ItemInfo_CS.toObject(message.itemInfo[j], options);
            }
            return object;
        };

        /**
         * Converts this ItemUpdate_CS to JSON.
         * @function toJSON
         * @memberof Cmd.ItemUpdate_CS
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ItemUpdate_CS.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
         * Creates a Heartbeat_CS message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Cmd.Heartbeat_CS
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Cmd.Heartbeat_CS} Heartbeat_CS
         */
        Heartbeat_CS.fromObject = function fromObject(object) {
            if (object instanceof $root.Cmd.Heartbeat_CS)
                return object;
            var message = new $root.Cmd.Heartbeat_CS();
            if (object.uid != null)
                message.uid = object.uid | 0;
            return message;
        };

        /**
         * Creates a plain object from a Heartbeat_CS message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Cmd.Heartbeat_CS
         * @static
         * @param {Cmd.Heartbeat_CS} message Heartbeat_CS
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Heartbeat_CS.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.uid = 0;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            return object;
        };

        /**
         * Converts this Heartbeat_CS to JSON.
         * @function toJSON
         * @memberof Cmd.Heartbeat_CS
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Heartbeat_CS.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Heartbeat_CS;
    })();

    Cmd.TaskUpdate_CS = (function() {

        /**
         * Properties of a TaskUpdate_CS.
         * @memberof Cmd
         * @interface ITaskUpdate_CS
         * @property {number} uid TaskUpdate_CS uid
         * @property {Array.<Cmd.TaskUpdate_CS.ITaskInfo>|null} [taskInfo] TaskUpdate_CS taskInfo
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
         * TaskUpdate_CS uid.
         * @member {number} uid
         * @memberof Cmd.TaskUpdate_CS
         * @instance
         */
        TaskUpdate_CS.prototype.uid = 0;

        /**
         * TaskUpdate_CS taskInfo.
         * @member {Array.<Cmd.TaskUpdate_CS.ITaskInfo>} taskInfo
         * @memberof Cmd.TaskUpdate_CS
         * @instance
         */
        TaskUpdate_CS.prototype.taskInfo = $util.emptyArray;

        /**
         * Creates a TaskUpdate_CS message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Cmd.TaskUpdate_CS
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Cmd.TaskUpdate_CS} TaskUpdate_CS
         */
        TaskUpdate_CS.fromObject = function fromObject(object) {
            if (object instanceof $root.Cmd.TaskUpdate_CS)
                return object;
            var message = new $root.Cmd.TaskUpdate_CS();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.taskInfo) {
                if (!Array.isArray(object.taskInfo))
                    throw TypeError(".Cmd.TaskUpdate_CS.taskInfo: array expected");
                message.taskInfo = [];
                for (var i = 0; i < object.taskInfo.length; ++i) {
                    if (typeof object.taskInfo[i] !== "object")
                        throw TypeError(".Cmd.TaskUpdate_CS.taskInfo: object expected");
                    message.taskInfo[i] = $root.Cmd.TaskUpdate_CS.TaskInfo.fromObject(object.taskInfo[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TaskUpdate_CS message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Cmd.TaskUpdate_CS
         * @static
         * @param {Cmd.TaskUpdate_CS} message TaskUpdate_CS
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TaskUpdate_CS.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.taskInfo = [];
            if (options.defaults)
                object.uid = 0;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.taskInfo && message.taskInfo.length) {
                object.taskInfo = [];
                for (var j = 0; j < message.taskInfo.length; ++j)
                    object.taskInfo[j] = $root.Cmd.TaskUpdate_CS.TaskInfo.toObject(message.taskInfo[j], options);
            }
            return object;
        };

        /**
         * Converts this TaskUpdate_CS to JSON.
         * @function toJSON
         * @memberof Cmd.TaskUpdate_CS
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TaskUpdate_CS.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
             * Creates a TaskInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Cmd.TaskUpdate_CS.TaskInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Cmd.TaskUpdate_CS.TaskInfo} TaskInfo
             */
            TaskInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.Cmd.TaskUpdate_CS.TaskInfo)
                    return object;
                var message = new $root.Cmd.TaskUpdate_CS.TaskInfo();
                if (object.taskID != null)
                    message.taskID = object.taskID | 0;
                if (object.taskState != null)
                    message.taskState = object.taskState | 0;
                return message;
            };

            /**
             * Creates a plain object from a TaskInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Cmd.TaskUpdate_CS.TaskInfo
             * @static
             * @param {Cmd.TaskUpdate_CS.TaskInfo} message TaskInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TaskInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.taskID = 0;
                    object.taskState = 0;
                }
                if (message.taskID != null && message.hasOwnProperty("taskID"))
                    object.taskID = message.taskID;
                if (message.taskState != null && message.hasOwnProperty("taskState"))
                    object.taskState = message.taskState;
                return object;
            };

            /**
             * Converts this TaskInfo to JSON.
             * @function toJSON
             * @memberof Cmd.TaskUpdate_CS.TaskInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TaskInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TaskInfo;
        })();

        return TaskUpdate_CS;
    })();

    /**
     * TASK_STATE enum.
     * @name Cmd.TASK_STATE
     * @enum {string}
     * @property {number} undone=0 undone value
     * @property {number} done=1 done value
     */
    Cmd.TASK_STATE = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "undone"] = 0;
        values[valuesById[1] = "done"] = 1;
        return values;
    })();

    return Cmd;
})();

module.exports = $root;

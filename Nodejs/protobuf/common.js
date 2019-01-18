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

        return Heartbeat_CS;
    })();

    Cmd.TaskUpdate_CS = (function() {

        /**
         * Properties of a TaskUpdate_CS.
         * @memberof Cmd
         * @interface ITaskUpdate_CS
         * @property {Array.<Cmd.TaskUpdate_CS.ITaskInfo>|null} [taskInfo] TaskUpdate_CS taskInfo
         * @property {number} remainTime TaskUpdate_CS remainTime
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
         * TaskUpdate_CS remainTime.
         * @member {number} remainTime
         * @memberof Cmd.TaskUpdate_CS
         * @instance
         */
        TaskUpdate_CS.prototype.remainTime = 0;

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

        return SameUidLogin_S;
    })();

    return Cmd;
})();

module.exports = $root;

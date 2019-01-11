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
         * Creates a new Login_C instance using the specified properties.
         * @function create
         * @memberof Cmd.Login_C
         * @static
         * @param {Cmd.ILogin_C=} [properties] Properties to set
         * @returns {Cmd.Login_C} Login_C instance
         */
        Login_C.create = function create(properties) {
            return new Login_C(properties);
        };

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
         * Encodes the specified Login_C message, length delimited. Does not implicitly {@link Cmd.Login_C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Cmd.Login_C
         * @static
         * @param {Cmd.ILogin_C} message Login_C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login_C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
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

        /**
         * Decodes a Login_C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Cmd.Login_C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Cmd.Login_C} Login_C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login_C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Login_C message.
         * @function verify
         * @memberof Cmd.Login_C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Login_C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.account))
                return "account: string expected";
            if (!$util.isString(message.password))
                return "password: string expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            return null;
        };

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
         * Creates a new ItemInfo_CS instance using the specified properties.
         * @function create
         * @memberof Cmd.ItemInfo_CS
         * @static
         * @param {Cmd.IItemInfo_CS=} [properties] Properties to set
         * @returns {Cmd.ItemInfo_CS} ItemInfo_CS instance
         */
        ItemInfo_CS.create = function create(properties) {
            return new ItemInfo_CS(properties);
        };

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
         * Encodes the specified ItemInfo_CS message, length delimited. Does not implicitly {@link Cmd.ItemInfo_CS.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Cmd.ItemInfo_CS
         * @static
         * @param {Cmd.IItemInfo_CS} message ItemInfo_CS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemInfo_CS.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
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

        /**
         * Decodes an ItemInfo_CS message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Cmd.ItemInfo_CS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Cmd.ItemInfo_CS} ItemInfo_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemInfo_CS.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ItemInfo_CS message.
         * @function verify
         * @memberof Cmd.ItemInfo_CS
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ItemInfo_CS.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.itemID))
                return "itemID: integer expected";
            if (message.itemNum != null && message.hasOwnProperty("itemNum"))
                if (!$util.isInteger(message.itemNum))
                    return "itemNum: integer expected";
            if (message.itemUpdateNum != null && message.hasOwnProperty("itemUpdateNum"))
                if (!$util.isInteger(message.itemUpdateNum))
                    return "itemUpdateNum: integer expected";
            return null;
        };

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
         * Creates a new PlayerInfo_S instance using the specified properties.
         * @function create
         * @memberof Cmd.PlayerInfo_S
         * @static
         * @param {Cmd.IPlayerInfo_S=} [properties] Properties to set
         * @returns {Cmd.PlayerInfo_S} PlayerInfo_S instance
         */
        PlayerInfo_S.create = function create(properties) {
            return new PlayerInfo_S(properties);
        };

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
            return writer;
        };

        /**
         * Encodes the specified PlayerInfo_S message, length delimited. Does not implicitly {@link Cmd.PlayerInfo_S.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Cmd.PlayerInfo_S
         * @static
         * @param {Cmd.IPlayerInfo_S} message PlayerInfo_S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo_S.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
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
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("uid"))
                throw $util.ProtocolError("missing required 'uid'", { instance: message });
            return message;
        };

        /**
         * Decodes a PlayerInfo_S message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Cmd.PlayerInfo_S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Cmd.PlayerInfo_S} PlayerInfo_S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo_S.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfo_S message.
         * @function verify
         * @memberof Cmd.PlayerInfo_S
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfo_S.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.uid))
                return "uid: integer expected";
            if (message.itemInfo != null && message.hasOwnProperty("itemInfo")) {
                if (!Array.isArray(message.itemInfo))
                    return "itemInfo: array expected";
                for (var i = 0; i < message.itemInfo.length; ++i) {
                    var error = $root.Cmd.ItemInfo_CS.verify(message.itemInfo[i]);
                    if (error)
                        return "itemInfo." + error;
                }
            }
            return null;
        };

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
         * Creates a new ItemUpdate_CS instance using the specified properties.
         * @function create
         * @memberof Cmd.ItemUpdate_CS
         * @static
         * @param {Cmd.IItemUpdate_CS=} [properties] Properties to set
         * @returns {Cmd.ItemUpdate_CS} ItemUpdate_CS instance
         */
        ItemUpdate_CS.create = function create(properties) {
            return new ItemUpdate_CS(properties);
        };

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
         * Encodes the specified ItemUpdate_CS message, length delimited. Does not implicitly {@link Cmd.ItemUpdate_CS.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Cmd.ItemUpdate_CS
         * @static
         * @param {Cmd.IItemUpdate_CS} message ItemUpdate_CS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemUpdate_CS.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
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

        /**
         * Decodes an ItemUpdate_CS message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Cmd.ItemUpdate_CS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Cmd.ItemUpdate_CS} ItemUpdate_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemUpdate_CS.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ItemUpdate_CS message.
         * @function verify
         * @memberof Cmd.ItemUpdate_CS
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ItemUpdate_CS.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.uid))
                return "uid: integer expected";
            if (message.itemInfo != null && message.hasOwnProperty("itemInfo")) {
                if (!Array.isArray(message.itemInfo))
                    return "itemInfo: array expected";
                for (var i = 0; i < message.itemInfo.length; ++i) {
                    var error = $root.Cmd.ItemInfo_CS.verify(message.itemInfo[i]);
                    if (error)
                        return "itemInfo." + error;
                }
            }
            return null;
        };

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
         * Creates a new Heartbeat_CS instance using the specified properties.
         * @function create
         * @memberof Cmd.Heartbeat_CS
         * @static
         * @param {Cmd.IHeartbeat_CS=} [properties] Properties to set
         * @returns {Cmd.Heartbeat_CS} Heartbeat_CS instance
         */
        Heartbeat_CS.create = function create(properties) {
            return new Heartbeat_CS(properties);
        };

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
         * Encodes the specified Heartbeat_CS message, length delimited. Does not implicitly {@link Cmd.Heartbeat_CS.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Cmd.Heartbeat_CS
         * @static
         * @param {Cmd.IHeartbeat_CS} message Heartbeat_CS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Heartbeat_CS.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
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

        /**
         * Decodes a Heartbeat_CS message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Cmd.Heartbeat_CS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Cmd.Heartbeat_CS} Heartbeat_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Heartbeat_CS.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Heartbeat_CS message.
         * @function verify
         * @memberof Cmd.Heartbeat_CS
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Heartbeat_CS.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.uid))
                return "uid: integer expected";
            return null;
        };

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

    return Cmd;
})();
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
         * Creates a new Login_C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Login_C instance
         */
        public static create(properties?: Cmd.ILogin_C): Cmd.Login_C;

        /**
         * Encodes the specified Login_C message. Does not implicitly {@link Cmd.Login_C.verify|verify} messages.
         * @param message Login_C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.ILogin_C, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Login_C message, length delimited. Does not implicitly {@link Cmd.Login_C.verify|verify} messages.
         * @param message Login_C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Cmd.ILogin_C, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Login_C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Login_C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.Login_C;

        /**
         * Decodes a Login_C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Login_C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Cmd.Login_C;

        /**
         * Verifies a Login_C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

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
        public static toObject(message: Cmd.Login_C, options?: protobuf.IConversionOptions): { [k: string]: any };

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
         * Creates a new ItemInfo_CS instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemInfo_CS instance
         */
        public static create(properties?: Cmd.IItemInfo_CS): Cmd.ItemInfo_CS;

        /**
         * Encodes the specified ItemInfo_CS message. Does not implicitly {@link Cmd.ItemInfo_CS.verify|verify} messages.
         * @param message ItemInfo_CS message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.IItemInfo_CS, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemInfo_CS message, length delimited. Does not implicitly {@link Cmd.ItemInfo_CS.verify|verify} messages.
         * @param message ItemInfo_CS message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Cmd.IItemInfo_CS, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemInfo_CS message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemInfo_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.ItemInfo_CS;

        /**
         * Decodes an ItemInfo_CS message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemInfo_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Cmd.ItemInfo_CS;

        /**
         * Verifies an ItemInfo_CS message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

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
        public static toObject(message: Cmd.ItemInfo_CS, options?: protobuf.IConversionOptions): { [k: string]: any };

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
         * Creates a new PlayerInfo_S instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerInfo_S instance
         */
        public static create(properties?: Cmd.IPlayerInfo_S): Cmd.PlayerInfo_S;

        /**
         * Encodes the specified PlayerInfo_S message. Does not implicitly {@link Cmd.PlayerInfo_S.verify|verify} messages.
         * @param message PlayerInfo_S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.IPlayerInfo_S, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified PlayerInfo_S message, length delimited. Does not implicitly {@link Cmd.PlayerInfo_S.verify|verify} messages.
         * @param message PlayerInfo_S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Cmd.IPlayerInfo_S, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a PlayerInfo_S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerInfo_S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.PlayerInfo_S;

        /**
         * Decodes a PlayerInfo_S message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerInfo_S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Cmd.PlayerInfo_S;

        /**
         * Verifies a PlayerInfo_S message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

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
        public static toObject(message: Cmd.PlayerInfo_S, options?: protobuf.IConversionOptions): { [k: string]: any };

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
         * Creates a new ItemUpdate_CS instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemUpdate_CS instance
         */
        public static create(properties?: Cmd.IItemUpdate_CS): Cmd.ItemUpdate_CS;

        /**
         * Encodes the specified ItemUpdate_CS message. Does not implicitly {@link Cmd.ItemUpdate_CS.verify|verify} messages.
         * @param message ItemUpdate_CS message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Cmd.IItemUpdate_CS, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemUpdate_CS message, length delimited. Does not implicitly {@link Cmd.ItemUpdate_CS.verify|verify} messages.
         * @param message ItemUpdate_CS message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Cmd.IItemUpdate_CS, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemUpdate_CS message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemUpdate_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Cmd.ItemUpdate_CS;

        /**
         * Decodes an ItemUpdate_CS message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemUpdate_CS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Cmd.ItemUpdate_CS;

        /**
         * Verifies an ItemUpdate_CS message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

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
        public static toObject(message: Cmd.ItemUpdate_CS, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemUpdate_CS to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

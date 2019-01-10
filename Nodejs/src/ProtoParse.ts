var protoBufJs = require("protobufjs");
export class ProtoParse {

    public static Root: protobuf.Root;

    constructor() {
    }

    public static init(): void {
        ProtoParse.Root = protoBufJs.loadSync("./protobuf/common.proto");
    }

}

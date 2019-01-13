import { readFileSync } from "fs";

export class JsonParse {

    private static readonly PropPath: string = "resource/table/PropTable.json"

    private static readonly ConfigPath: string = "resource/config.json"

    public static propData: table.PropTable[];

    public static propDataID: string[] = [];
    /* 道具前缀 */
    public static propForm: string = "propID_"
    /* 是否调试模式 */
    public static isDebug: boolean = false;

    public static SQLHost: string = "";

    public static SQLPost: number = -1;

    constructor() {

    }

    /**
     * 初始化
     */
    public static init(): void {
        let buffer: Buffer = readFileSync(this.ConfigPath);
        let configData = JSON.parse(buffer.toString());
        this.isDebug = configData["isDebug"];
        if (this.isDebug) {
            this.SQLHost = configData["debug"]["SQLHost"];
            this.SQLPost = configData["debug"]["SQLPost"];
        }
        else{
            this.SQLHost = configData["dev"]["SQLHost"];
            this.SQLPost = configData["dev"]["SQLPost"];
        }

        let buffer2: Buffer = readFileSync(this.PropPath);
        this.propData = JSON.parse(buffer2.toString());
        for (let item of this.propData) {
            this.propDataID.push(this.propForm + item.id);
        }

    }

}
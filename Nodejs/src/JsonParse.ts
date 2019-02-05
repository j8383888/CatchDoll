
import { readFileSync } from "fs";

export class JsonParse {

    public static propData: table.PropTable[];
    public static propDataID: string[] = [];

    public static taskData: table.TaskTable[]
    public static taskDataID: number[] = []

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
        let configData = this.getJSon("resource/config.json");
        this.isDebug = configData["isDebug"];
        this.isDebug = false;
        if (this.isDebug) {
            this.SQLHost = configData["debug"]["SQLHost"];
            this.SQLPost = configData["debug"]["SQLPost"];
        }
        else {
            this.SQLHost = configData["dev"]["SQLHost"];
            this.SQLPost = configData["dev"]["SQLPost"];
        }


        this.propData = this.getJSon("resource/table/TaskTable.json")
        for (let item of this.propData) {
            this.propDataID.push(this.propForm + item.id);
        }

        this.taskData = this.getJSon("resource/table/TaskTable.json")
        for (let item of this.taskData) {
            this.taskDataID.push(item.id);
        }

    }

    /**
     * 获得Json数据
     * @param path 
     */
    public static getJSon(path: string): any {
        let buffer: Buffer = readFileSync(path);
        return JSON.parse(buffer.toString());
    }

}
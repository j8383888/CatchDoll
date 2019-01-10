import { readFileSync } from "fs";

export class JsonParse {

    private static _path: string = "../resource/table/PropTable.json"

    public static propData: table.PropTable[];

    public static propDataID: string[] = [];

    public static propForm: string = "propID_"

    constructor() {

    }

    /**
     * 初始化
     */
    public static init(): void {
        let buffer: Buffer = readFileSync(this._path);
        this.propData = JSON.parse(buffer.toString());
        for (let item of this.propData) {
            this.propDataID.push(this.propForm + item.id);
        }

    }

}
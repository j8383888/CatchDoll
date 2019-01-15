import { fstat } from "fs";
var fs = require("fs");

/**
 *  所有公用的方法或者工具可写在此处
 */
export class Utils {
    private static _utils: Utils = null;
    public static getInstance(): Utils {
        if (!this._utils) {
            this._utils = new Utils();
        }
        return this._utils;
    };
    /**
     *  获取指定范围的随机数
     */
    public getRandom(min, max): number {
        return Math.floor(Math.random() * max + min);
    };
    /**
     *  读取文件
     */
    public getFile(path, cb): void{
        fs.readFile(path, (err, file) => {
            if (err) {
                console.error(`err: ${err}`);
            } else {
                let data = file.toString();
                data = JSON.parse(data);
                // console.log(data);
                if (cb && cb instanceof Function) {
                    cb(data);
                }
            }
        });
    };
    /**
     *  将对象转换为数组
     */
    public objectToArray(ob): any[] {
        let array: any[] = [];
        for (let index in ob) {
            if (ob[index] instanceof Function) {
                console.log(`函数不放入：${index}`);
            } else {
                array.push(ob[index]);
            }
        }
        return array;
    };
};

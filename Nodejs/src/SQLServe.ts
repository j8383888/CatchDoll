import { Connection } from "mysql";
import { Cmd } from "../protobuf/common";
import { JsonParse } from "./JsonParse";
import { PlayerCenter } from "./PlayerCenter";
import { Utils } from "./util/Utils";
var SQL = require('mysql');
export class SQLServe {
    private uidIndex = 100;

    /* 单例 */
    private static _instance: SQLServe = null;
    /* 链接 */
    private connection: Connection;
    /*  */
    private _isReconnet: boolean = false;


    constructor() {
    }

    /* 获取单例 */
    public static get instance(): SQLServe {
        if (this._instance == null) {
            this._instance = new SQLServe();
        }
        return this._instance;
    }

    public createConnection() {
        //创建一个connection
        this.connection = SQL.createConnection({
            host: JsonParse.SQLHost, //主机
            user: 'root', //MySQL认证用户名
            password: 'jym8398337', //MySQL认证用户密码
            port: JsonParse.SQLPost, //端口号
            database: 'test',
            debug: false,
        });

        this.connection.connect((err) => {
            if (err) {

                console.log('[query] - :' + err);
                setTimeout(SQLServe.instance.createConnection, 2000);
                return;
            }
            this._clearSQL
            this._isReconnet = true;
            this._addCow();
            // this._clearSQL();
            console.log('数据库[connection connect]  succeed!');
        });

        this.connection.on('error', function (err) {
            console.error('sql error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                this._isReconnet = true;
                console.error('sql error执行重连:' + err.message);
                SQLServe.instance.createConnection();
            } else {
                throw err;
            }
        })
    }

    /**
     * 清除数据库
     */
    private _clearSQL(): void {
        var userDelSql = 'delete from Login';
        this.connection.query(userDelSql, this._onSQLDelete);

        var userDelSql2 = 'delete from PropInfo';
        this.connection.query(userDelSql2, this._onSQLDelete);

        var userDelSql3 = 'delete from PlayerInfo';
        this.connection.query(userDelSql3, this._onSQLDelete);
    }

    /**
     * 添加列
     */
    private _addCow(): void {
        var sql = 'SELECT * FROM PropInfo'
        this.connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            let propIDAry: string[] = JsonParse.propDataID.slice();

            for (let item of fields) {
                if (propIDAry.indexOf(item.name) != -1) {
                    propIDAry.remove(item.name);
                }
            }
            for (let item of propIDAry) {
                let addSqlCow: string = "alter table PropInfo add " + item + " int(20)"
                this.connection.query(addSqlCow, (err, result, fields) => {
                    if (err) {
                        console.log('[query] - :' + err);
                        return;
                    }
                })
            }
        })

    }

    /**
     * 数据库查找
     * @param data 
     */
    public seekLogin(data: Cmd.Login_C) {
        var sql = 'SELECT * FROM Login where uid=' + data.uid;
        this.connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('数据库[SELsECT ERROR] - ', err.message);
            } else {
                console.log('--------------------------SELECT----------------------------');
                console.log(result);
                if (result.length) {
                    this._seekPlayerData(data);
                }
                else {
                    this._initPlayerData(data);
                }
                console.log('------------------------------------------------------------\n\n');
            }
        })
    }

    /**
     * 查询玩家数据
     * @param data 
     */
    private _seekPlayerData(data: Cmd.Login_C): void {
        var sql = 'SELECT * FROM PropInfo where uid=' + data.uid;
        const COMPELETE_NUM: number = 2;
        let num: number = 0;
        let itemInfoAry: Cmd.ItemInfo_CS[] = [];
        let task: Cmd.TaskUpdate_CS = new Cmd.TaskUpdate_CS();
        this.connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            let playerData: Object = result[0];
            for (let item in playerData) {
                if (item != "uid") {
                    let itemInfo: Cmd.ItemInfo_CS = new Cmd.ItemInfo_CS();
                    itemInfo.itemID = Number(item.slice(JsonParse.propForm.length));
                    itemInfo.itemNum = playerData[item];
                    itemInfoAry.push(itemInfo);
                }
            }
            num++;
            if (num == COMPELETE_NUM) {
                PlayerCenter.sendPlayerData(data.uid, itemInfoAry, task);
            }
        })

        var sql = 'SELECT * FROM PlayerInfo where uid=' + data.uid;
        this.connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            let res: string = result[0].task;
            task = JSON.parse(res);
            if (task.endTime < Date.now()) {
                let date = new Date();
                let endIime = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1, 0, 0, 0)
                task.endTime = endIime;
                task.taskInfo = PlayerCenter.getRamdomTasks();
            }
            num++;
            if (num == COMPELETE_NUM) {
                PlayerCenter.sendPlayerData(data.uid, itemInfoAry, task);
            }
        })
    }


    /**
     * 初始化玩家数据
     * @param data 
     */
    private _initPlayerData(data: Cmd.Login_C): void {
        let readyNum: number = 0;
        const COMPLETE_NUM: number = 3;
        let uid = data.uid;
        let itemInfoAry: Cmd.ItemInfo_CS[] = [];
        let task: Cmd.TaskUpdate_CS = new Cmd.TaskUpdate_CS();

        var addSql = 'INSERT INTO Login ' + '(account,password,uid)' + ' VALUES(?,?,?)';
        var addSqlParams = [data.account, data.password, data.uid];

        this.connection.query(addSql, addSqlParams, (err, result, fields) => {
            if (err) {
                console.log('数据库[INSERT ERROR] - ', err.message);
                return;
            }
            readyNum++;
            console.log('insert:', result);
            if (readyNum == COMPLETE_NUM) {
                PlayerCenter.sendPlayerData(uid, itemInfoAry, task)
            }
        })


        for (let item of JsonParse.propData) {
            let itemInfo: Cmd.ItemInfo_CS = new Cmd.ItemInfo_CS();
            itemInfo.itemID = item.id;
            if (item.id == 1 || item.id == 2 || item.id == 3) {
                itemInfo.itemNum = 100
            }
            else {
                itemInfo.itemNum = 0;
            }
            itemInfoAry.push(itemInfo);
        }

        let rowName = "uid,";
        let valueStr = "?,";
        var addUserParams: number[] = [data.uid];
        for (let item of JsonParse.propDataID) {
            rowName += item + ",";
            valueStr += "?,"
            if (item == "propID_1" || item == "propID_2" || item == "propID_3") {
                addUserParams.push(100)
            }
            else {
                addUserParams.push(0);
            }
        }
        valueStr = valueStr.slice(0, valueStr.length - 1)
        rowName = rowName.slice(0, rowName.length - 1);
        rowName = "(" + rowName + ")"
        valueStr = " values(" + valueStr + ")"
        var addUser = 'INSERT INTO PropInfo ' + rowName + valueStr;
        this.connection.query(addUser, addUserParams, (err, result, fields) => {
            if (err) {
                console.log('数据库[INSERT ERROR] - ', err.message);
                return;
            }
            console.log('数据库插入:', result);
            readyNum++;
            if (readyNum == COMPLETE_NUM) {
                PlayerCenter.sendPlayerData(uid, itemInfoAry, task)
            }
        })

        var addSql3 = 'INSERT INTO PlayerInfo' + '(uid,task)' + ' VALUES(?,?)';
        let date: Date = new Date()
        let endIime = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1, 0, 0, 0)
        task.endTime = endIime;
        task.taskInfo = PlayerCenter.getRamdomTasks();
        let json: string = JSON.stringify(task);

        var addSqlParams3 = [data.uid, json];
        this.connection.query(addSql3, addSqlParams3, (err, result, fields) => {
            if (err) {
                console.log('数据库[INSERT ERROR] - ', err.message);
                return;
            }
            console.log('数据库插入:', result);
            readyNum++;
            if (readyNum == COMPLETE_NUM) {
                PlayerCenter.sendPlayerData(uid, itemInfoAry, task)
            }
        })
    }







    public deleteSQL() {
        var userDelSql = 'DELETE FROM Login';
        this.connection.query(userDelSql, this._onSQLDelete);
    }

    /**
     * 数据库删除
     * @param err 
     * @param result 
     */
    private _onSQLDelete(err, result): void {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }
        console.log('数据库删除', result.affectedRows);
    }


    /**
     * 数据库添加
     */
    private _onSQLInsert(err, result, fields): void {
        if (err) {
            console.log('数据库[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('数据库添加:', result);
    }

    public getUidIndex() {
        var sql = 'SELECT * FROM Login where uid';
        //查
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log('数据库[SELECT ERROR] - ', err.message);
            } else {
                console.log(result);
                this.uidIndex = result[result.length - 1].uid + 1
            }
        });
    }

    /**
     * 设置玩家数据
     * @param uid 
     * @param userData 
     */
    public setUserData(uid: number): void {

        /* 道具 */
        let itemInfo: Cmd.ItemInfo_CS[] = PlayerCenter.getItemInfo(uid);
        let rowName = "";
        var sqlParams = [];
        for (let item of itemInfo) {
            rowName += JsonParse.propForm + item.itemID + "=?,"
            sqlParams.push(item.itemNum);
        }
        rowName = rowName.slice(0, rowName.length - 1)
        sqlParams.push(uid);
        var sql = 'UPDATE PropInfo SET ' + rowName + ' WHERE uid = ?';
        this.connection.query(sql, sqlParams, (err, result, fields) => {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            console.log("数据库道具表修改:" + result);
        })

        /* 任务 */
        let taskInfo: Cmd.TaskUpdate_CS = PlayerCenter.getTaskInfo(uid);
        let date: Date = new Date()
        let endIime = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1, 0, 0, 0)
        taskInfo.endTime = endIime;
        let sql2 = 'UPDATE PlayerInfo SET ' + 'task=?' + ' WHERE uid = ?';
        let json: string = JSON.stringify(taskInfo);
        let sqlParams2 = [json, uid];
        this.connection.query(sql2, sqlParams2, (err, result, fields) => {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            console.log("数据库玩家信息修改:" + result);
        })
    }

    public close() {
        // 关闭connection
        this.connection.end(function (err) {
            if (err) {
                return;
            }
            console.log('数据库[connection end] succeed!');
        });
    }
}

global["SQLServe"] = SQLServe;









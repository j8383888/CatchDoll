import { Connection } from "mysql";
import { Cmd } from "../protobuf/common";
import { JsonParse } from "./JsonParse";
import { PlayerCenter } from "./PlayerCenter";
import { Handler } from "./util/Handler";
var SQL = require('mysql');
export class SQLServe {
    private uidIndex = 100;

    /* 单例 */
    private static _instance: SQLServe = null;
    /* 链接 */
    private connection: Connection;
    /*  */
    private _isReconnet: boolean = false;

    private _reconnetHandler: Handler[] = [];

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
            password: 'JYM8398337', //MySQL认证用户密码
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

        var userDelSql = 'delete from UserInfo';
        this.connection.query(userDelSql, this._onSQLDelete);
    }

    /**
     * 添加列
     */
    private _addCow(): void {
        var sql = 'SELECT * FROM UserInfo'
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
                let addSqlCow: string = "alter table UserInfo add " + item + " int(20)"
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
        var sql = 'SELECT * FROM UserInfo where uid=' + data.uid;
        this.connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            let playerData: Object = result[0];
            let itemInfoAry: Cmd.ItemInfo_CS[] = [];
            for (let item in playerData) {
                if (item != "uid") {
                    let itemInfo: Cmd.ItemInfo_CS = new Cmd.ItemInfo_CS();
                    itemInfo.itemID = Number(item.slice(JsonParse.propForm.length));
                    itemInfo.itemNum = playerData[item];
                    itemInfoAry.push(itemInfo);
                }
            }
            PlayerCenter.sendPlayerData(data.uid, itemInfoAry);
        })
    }


    /**
     * 初始化玩家数据
     * @param data 
     */
    private _initPlayerData(data: Cmd.Login_C): void {
        let ready1: boolean = false;
        let ready2: boolean = false;

        var addSql = 'INSERT INTO Login ' + '(account,password,uid)' + ' VALUES(?,?,?)';
        var addSqlParams = [data.account, data.password, data.uid];
        this.connection.query(addSql, addSqlParams, (err, result, fields) => {
            if (err) {
                console.log('数据库[INSERT ERROR] - ', err.message);
                return;
            }
            ready1 = true;
            console.log('--------------------------INSERT----------------------------');
            console.log('insert:', result);
            console.log('-----------------------------------------------------------------\n\n');
            if (ready1 && ready2) {
                PlayerCenter.sendInitPlayerData(data)
            }
        })

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
        var addUser = 'INSERT INTO UserInfo ' + rowName + valueStr;
        this.connection.query(addUser, addUserParams, (err, result, fields) => {
            if (err) {
                console.log('数据库[INSERT ERROR] - ', err.message);
                return;
            }
            ready2 = true;
            console.log('数据库插入:', result);
            if (ready1 && ready2) {
                PlayerCenter.sendInitPlayerData(data);
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
                console.log('--------------------------SELECT----------------------------');
                console.log(result);
                console.log('------------------------------------------------------------\n\n');

                this.uidIndex = result[result.length - 1].uid + 1
            }
        });
    }

    public setUserData(uid: number, itemInfo: Cmd.ItemInfo_CS[]): void {

        let rowName = "";
        var sqlParams = [];
        for (let item of itemInfo) {
            rowName += JsonParse.propForm + item.itemID + "=?,"
            sqlParams.push(item.itemNum);
        }
        rowName = rowName.slice(0, rowName.length - 1)
        sqlParams.push(uid);

        var sql = 'UPDATE UserInfo SET ' + rowName + ' WHERE uid = ?';
        this.connection.query(sql, sqlParams, (err, result, fields) => {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            console.log("数据库修改:" + result);

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









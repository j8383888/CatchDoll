import { writeFile, readFileSync } from "fs";

//引入http模块
var http = require("http");
//设置主机名
var hostName = '0.0.0.0';
//设置端口
var port = 8080;

var levelEdit: string = "";
var levelData: string = "";
var colliderEdit: string = "";
var colliderData: string = "";

var levelEditPath: string = "./LevelEdit.json"
var levelDataPath: string = "./LevelData.json"
var colliderEditPath: string = "./ColliderEdit.json"
var colliderDataPath: string = "./COlliderData.csv"

var type: DATA_TYPE = DATA_TYPE.LEVEL_EDIT;

/**
 * 获得Json数据
 * @param path 
 */
function getJSon(path: string): any {
    let buffer: Buffer = readFileSync(path);
    return buffer.toString();
}
//创建服务
var server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method == "GET") {
        req.on('data', function (chunk: Buffer) {
            let data = chunk.toString();
            console.log(data);
            let date = new Date();
            if (data == "Collider Edit") {
                console.log(date.toLocaleString(), "发送碰撞体数据");
                var colliderJson: string = getJSon(colliderEditPath);
                res.end(colliderJson);

            }
            else {
                console.log(date.toLocaleString(), "发送关卡数据");
                var battleJson: string = getJSon(levelEditPath);
                res.end(battleJson);
            }
        })
    }
    else if (req.method == "POST") {
        req.on('data', function (chunk: Buffer) {

            let data = chunk.toString();
            console.log(data);
            let dataType = data.slice(0, 20)
            /**
             * 关卡数据
             */
            if (dataType.indexOf("editorData") != -1) {
                type = DATA_TYPE.LEVEL_EDIT;
                data = data.replace("editorData", "");
            }
            else if (dataType.indexOf("exportData") != -1) {
                type = DATA_TYPE.LEVEL_DATA;
                data = data.replace("exportData", "");
            }
            /**
             * 碰撞体数据
             */
            else if (dataType.indexOf("colliderEdit") != -1) {
                type = DATA_TYPE.COLLIDER_EDIT;
                data = data.replace("colliderEdit", "");
            }
            else if (dataType.indexOf("colliderData") != -1) {
                type = DATA_TYPE.COLLIDER_DATA;
                data = data.replace("colliderData", "");
            }

            if (type == DATA_TYPE.LEVEL_EDIT) {
                levelEdit += data;
                if (data.charAt(data.length - 1) == "$") {
                    writeFile(levelEditPath, levelEdit, () => {
                        console.log("生成编辑器关卡数据完毕！")
                        res.end("success!")
                    })
                    levelEdit = "";
                }
            }
            else if (type == DATA_TYPE.LEVEL_DATA) {
                levelData += data;
                if (data.charAt(data.length - 1) == "$") {
                    writeFile(levelDataPath, levelData, () => {
                        console.log("导出游戏关卡数据完毕！")
                        res.end("success!")
                    })
                    levelData = "";
                }
            }
            else if (type == DATA_TYPE.COLLIDER_EDIT) {
                colliderEdit += data;
                if (data.charAt(data.length - 1) == "$") {
                    writeFile(colliderEditPath, colliderEdit, () => {
                        console.log("生成编辑器碰撞体数据json完毕！")
                        res.end("success!")
                    })
                    colliderEdit = "";
                }
            }
            else if (type == DATA_TYPE.COLLIDER_DATA) {
                colliderData += data;
                if (data.charAt(data.length - 1) == "$") {
                    writeFile(colliderDataPath, colliderData, () => {
                        console.log("生成游戏碰撞体数据csv完毕！")
                        res.end("success!")
                    })
                    colliderData = "";
                }
            }
        });
    }

})


server.listen(port, hostName, function () {
    console.log(`服务器运行在http://${hostName}:${port}`);
});

const enum DATA_TYPE {
    LEVEL_EDIT,
    LEVEL_DATA,
    COLLIDER_EDIT,
    COLLIDER_DATA,
}
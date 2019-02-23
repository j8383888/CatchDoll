import { writeFile, readFileSync } from "fs";

//引入http模块
var http = require("http");
//设置主机名
var hostName = '0.0.0.0';
//设置端口
var port = 8080;

var levelEdit: string = "";
var levelData: string = "";
var body: string = "";

var levelEditPath: string = "./LevelEdit.json"
var levelDataPath: string = "./LevelData.json"
var colliderEditPath: string = "./ColliderEdit.json"
var colliderDataPath: string = "./ColliderData.csv"


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
        let date = new Date();
        if (req.url == "/ColliderEdit") {
            console.log(date.toLocaleString(), "发送碰撞体数据");
            var colliderJson: string = getJSon(colliderEditPath);
            res.end(colliderJson);

        }
        else {
            var battleJson: string = getJSon(levelEditPath);
            console.log(date.toLocaleString(), "发送关卡数据", battleJson);
            res.end(battleJson);
        }


    }
    else if (req.method == "POST") {
        req.on('data', function (chunk: Buffer) {

            let data = chunk.toString();
            console.log(data);
            let dataType = data.slice(0, 20)

            if (dataType.indexOf("editorData") != -1) {
                type = DATA_TYPE.LEVEL_EDIT;
                data = data.replace("editorData", "");
            }
            else if (dataType.indexOf("exportData") != -1) {
                type = DATA_TYPE.LEVEL_DATA;
                data = data.replace("exportData", "");
            }

            else if (dataType.indexOf("collider") != -1) {
                type = DATA_TYPE.COLLIDER;
                data = data.replace("collider", "");
            }
            /**
             * 关卡数据
             */
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

            /**
             * 碰撞体数据
             */
            else if (type == DATA_TYPE.COLLIDER) {
                body += data;
            }

        });
        req.on('end', function () {
            if (type == DATA_TYPE.COLLIDER) {
                writeFile(colliderEditPath, body, () => {
                    console.log("生成编辑器碰撞体数据json完毕！")
                    res.end("success!")
                })

                let csv: string = formatResult(JSON.parse(body));
                writeFile(colliderDataPath, csv, () => {
                    console.log("生成游戏碰撞体数据csv完毕！")
                    // res.end("success!")
                })
                body = "";
            }
        })
    }

})



server.listen(port, hostName, function () {
    console.log(`服务器运行在http://${hostName}:${port}`);
});

//格式化保存的数据;
function formatResult(colliderMap: {
    id: number,
    colliderAry: { x: number, y: number, radius: number, localX: number, localY: number }[]
}[]): string {
    let result: string = "";
    let outputStr = function (msg: string) {
        result = result + msg + "\n";
    }
    outputStr("sign,colliderAry");
    for (let item of colliderMap) {
        let regions = item.colliderAry
        // regions.removeAll(v => v.radius < 20);
        let region = "\"[";
        for (let j: number = 0; j < regions.length; j++) {
            let item = regions[j];
            region += ("[" + item.localX + "," + item.localY + "," + Math.floor(item.radius) + "," + "]");
            if (j != regions.length - 1) {
                region += ",";
            }
        }
        region += "]\"";
        outputStr("" + item.id + "," + region);
    }
    return result;
}

const enum DATA_TYPE {
    LEVEL_EDIT,
    LEVEL_DATA,
    COLLIDER,
}
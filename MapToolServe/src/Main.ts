import { writeFile, readFileSync } from "fs";

//引入http模块
var http = require("http");
//设置主机名
var hostName = '0.0.0.0';
//设置端口
var port = 8080;

var editorData: string = "";

var exportData: string = "";

var battleJsonPath: string = "./EditorData.json"

var ExportJsonPath: string = "./ChapterData.json"

var type: DATA_TYPE = DATA_TYPE.editor;


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
        let date = new Date()
        console.log(date.toLocaleString(), "发送battle数据")
        var battleJson: string = getJSon(battleJsonPath);
        res.end(battleJson)
    }
    else if (req.method == "POST") {
        req.on('data', function (chunk: Buffer) {
            let data = chunk.toString();
            console.log(data);
            let dataType = data.slice(0, 20)
            if (dataType.indexOf("editorData") != -1) {
                type = DATA_TYPE.editor;
                data = data.replace("editorData", "");
            }
            else if (dataType.indexOf("exportData") != -1) {
                type = DATA_TYPE.export;
                data = data.replace("exportData", "");
            }
            if (type == DATA_TYPE.editor) {
                editorData += data;
                if (data.charAt(data.length - 1) == "$") {
                    writeFile(battleJsonPath, editorData, () => {
                        console.log("生成编辑器json完毕！")
                        res.end("success!")
                    })
                    editorData = "";
                }
            }
            else if (type == DATA_TYPE.export) {
                exportData += data;
                if (data.charAt(data.length - 1) == "$") {
                    writeFile(ExportJsonPath, exportData, () => {
                        console.log("导出游戏json完毕！")
                        res.end("success!")
                    })
                    exportData = "";
                }
            }
        });
    }

})


server.listen(port, hostName, function () {
    console.log(`服务器运行在http://${hostName}:${port}`);
});

const enum DATA_TYPE {
    editor,
    export
}
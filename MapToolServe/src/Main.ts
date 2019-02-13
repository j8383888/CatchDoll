import { writeFile, readFileSync } from "fs";

//引入http模块
var http = require("http");
//设置主机名
var hostName = '127.0.0.1';
//设置端口
var port = 4000;

var battleJsonPath: string = "./BattleJson2.json"

var battleJson: string;

battleJson = getJSon(battleJsonPath);

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
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method == "GET") {
        console.log("发送battle数据")
        res.end(battleJson)
    }
    else if (req.method == "POST") {

        req.on('data', function (chunk: Buffer) {
            let data = chunk.toString();
            console.log("生成关卡配置json开始")
            console.log('source: ' + data);
            writeFile(battleJsonPath, data, () => {
                console.log("生成关卡配置json完毕！")
            })
        });
    }

}).listen(port);


server.listen(port, hostName, function () {
    console.log(`服务器运行在http://${hostName}:${port}`);
});
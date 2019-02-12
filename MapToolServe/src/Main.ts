import { writeFile } from "fs";

//引入http模块
var http = require("http");
//设置主机名
var hostName = '127.0.0.1';
//设置端口
var port = 4000;
//创建服务
var server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Access-Control-Allow-Origin', "*")
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.on('data', function (chunk: Buffer) {
        let data = chunk.toString();
        console.log("生成关卡配置json开始")
        console.log('source: ' + data);
        writeFile("./BattleJson.json", data, () => {
            console.log("生成关卡配置json完毕！")
        })
    });

}).listen(port);


server.listen(port, hostName, function () {
    console.log(`服务器运行在http://${hostName}:${port}`);
});
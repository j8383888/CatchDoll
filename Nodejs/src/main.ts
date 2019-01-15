import { SQLServe } from "./SQLServe";
import { MyWebSocket } from "./MyWebSocket";
import { ProtoParse } from "./ProtoParse";
import { JsonParse } from "./JsonParse";
import { PlayerCenter } from "./PlayerCenter";
require('../out/Extendtion.js');
JsonParse.init();
ProtoParse.init();
SQLServe.instance.createConnection();
MyWebSocket.instance.creatWebSocket(); 

new PlayerCenter();

# -*- coding: utf-8 -*-
import os,shutil,time

def writeProtoExtendition(pkg,msgAry,clientFile,serveFile):
	t = time.strftime('%Y-%m-%d',time.localtime())  

	with open(clientFile,'w') as f:
		f.write("declare namespace "+ pkg +"{\n");
		for item in msgAry:
			f.write("\tinterface "+item+ " {\n")
			f.write("\t\tGetType(): string;\n")
			f.write("\t}\n")
		f.write("}\n");
		for item in msgAry:
			f.write(pkg+ "."+item+".prototype.GetType = function () {\n")
			f.write("\treturn \""+pkg+"."+item +"\";\n")
			f.write("}\n")
		print(u"生成客户端protoExtendition成功")

	with open(serveFile,'w') as f:
		f.write("import { Cmd } from \"" + r"../../protobuf/common" + "\";\n");
		for item in msgAry:
			f.write(pkg + "." + item + ".prototype['GetType'] = \"" + pkg + "." + item + "\";\n")
		print(u"生成服务器protoExtendition成功")

def openProto(clientFile,serveFile):
	with open(r"..\resource\proto\common.proto", 'r') as f:
		msgAry = [];
		pkg = '';
		list = f.readlines();
		for item in list:
			if item.find('message') == 0:
				msgType = item[len('message'):]
				msgType = msgType.replace('{','')
				msgType = msgType.strip();
				msgAry.append(msgType);
			elif item.find('package') == 0:
				pkgName = item[len('package'):];
				pkgName = pkgName.strip()
				pkg = pkgName[0:-1]
		writeProtoExtendition(pkg,msgAry,clientFile,serveFile);

clientFile = r"..\Egret\src\Extendtion\ProtoExtendtion.ts";
serveFile = r"..\Nodejs\src\Extendtion\ProtoExtendtion.ts"
openProto(clientFile,serveFile);









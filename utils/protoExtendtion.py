# -*- coding: utf-8 -*-  
import os,shutil,time

def writeProtoExtendition(pkg,msgAry):
	t = time.strftime('%Y-%m-%d',time.localtime())  #将指定格式的当前时间以字符串输出
	newfile= r"..\resource\proto\ProtoExtendtion.ts"
	with open(newfile,'w') as f:
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

def openProto():
	with open(r"..\resource\proto\common.proto", 'r') as f:
		msgAry = [];
		pkg = '';
		list = f.readlines();
		for item in list:
			if item.find('message') == 0:
				msgType = item[len('message'):];
				msgType = msgType.strip();
				msgAry.append(msgType);
			elif item.find('package') == 0:
				pkgName = item[len('package'):];
				pkgName = pkgName.strip()
				pkg = pkgName[0:-1]
		writeProtoExtendition(pkg,msgAry);

def copy():
	sorcePath = r"..\resource\proto\ProtoExtendtion.ts"
	targetPath = r"..\Egret\src\Extendtion\ProtoExtendtion.ts"
	if(os.path.exists(targetPath)):
		os.remove(targetPath)
	shutil.copyfile(sorcePath,targetPath)

openProto();
copy()







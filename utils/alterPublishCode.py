 # -*-coding:utf-8-*- 
import os,shutil
import json

def readFile(path):
	resName ="";
	thmName ="";
	with open(path,'r') as f:
		list = f.read();
		data = json.loads(list);
		resName = data["resource/default.res.json"];
		thmName = data["resource/default.thm.json"];
	return [resName.encode('utf-8')+".json",thmName.encode('utf-8')+".json"]	

def getMainTsPath(path):
	list = os.listdir(path);
	for item in list:
		if not item.find("main.min") == -1:
			return os.path.join(path,item);

def alterFile(path,resName,thmName):
	data = ""
	with open(path,'r') as f:
		list = f.read();
		if not list.find("resource/default.res.json") == -1:
			list = list.replace(r"resource/default.res.json","resource/"+resName,1);
		if not list.find("resource/default.thm.json") == -1:
			list = list.replace(r"default.thm.json","resource/"+thmName,1);
		data += list;
	with open(path,'w') as f:
		f.write(data);
		print(u"修改代码内 资源路径以及主题路径成功！")

versionPath = r"..\Egret\bin-release\web\game\resource\version.json"
jsPath = r"..\Egret\bin-release\web\game\js"
[resName,thmName] = readFile(versionPath)
mainPath = getMainTsPath(jsPath)
alterFile(mainPath,resName,thmName)



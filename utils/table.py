# -*- coding: utf-8 -*-  
import os,shutil
def copy(src,josnDst,tsDst):

	if not os.path.exists(josnDst):
		print("不存在目标目录:" + josnDst)
		return

	if not os.path.exists(tsDst):
		print("不存在目标目录:" + tsDst)
		return

	if not os.path.exists(src):
		print("%s not exist"%(src))
		return

	list = os.listdir(src)
	for i in range(0,len(list)):
		path = os.path.join(src,list[i])
		if os.path.isfile(path):
			suffix = os.path.splitext(path)[-1]
			name = os.path.split(path)[-1]
			
			if suffix == ".json":
				targetPath = josnDst + "\\" + name
				if(os.path.exists(targetPath)):
					os.remove(targetPath)
				shutil.copyfile(path,targetPath)
				print(" copy%s => %s"%(path,targetPath))
			elif suffix == ".ts":
				targetPath = tsDst + "\\" + name
				if(os.path.exists(targetPath)):
					os.remove(targetPath)
				shutil.copyfile(path,targetPath)
				print("copy %s => %s"%(path,targetPath))

src = r"..\resource\table"
clientJosnDst = r"..\Egret\resource\assets\table"
clientTsDst = r"..\Egret\src\Table"

SevreJosnDst = r"..\Nodejs3\resource\table"
SevreTsDst = r"..\Nodejs3\src\Table"
copy(src,clientJosnDst,clientTsDst)
copy(src,SevreJosnDst,SevreTsDst)

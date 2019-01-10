# -*- coding: utf-8 -*-  
import os,shutil
def copy(src,dest):

	if not os.path.exists(dest):
		os.mkdir(dest)

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
				targetPath = dest + "\\" + name
				if(os.path.exists(targetPath)):
					os.remove(targetPath)
				shutil.copyfile(path,targetPath)
				print(" copy%s => %s"%(path,targetPath))
			elif suffix == ".png":
				targetPath = dest + "\\" + name
				if(os.path.exists(targetPath)):
					os.remove(targetPath)
				shutil.copyfile(path,targetPath)
				print("copy %s => %s"%(path,targetPath))


def copyFolder(srcTree,targetTree):
	if not os.path.exists(srcTree):
		print("%s not exist" + srcTree)
		return

	if not os.path.exists(targetTree):
		print("%s not exist"%(targetTree))
		return

	list = os.listdir(srcTree)
	for item in list:
		srcPath = os.path.join(srcTree,item)
		if os.path.isdir(srcPath) and item != "atlas" and item !="table" and item!="proto":
			targetPath = os.path.join(targetTree,item)
			if os.path.exists(targetPath):
				shutil.rmtree(targetPath);
			shutil.copytree(srcPath,targetPath)
			print("copyFolder %s => %s"%(srcPath,targetPath))



src = r"..\resource\atlas"
dest = r"..\Egret\resource\assets\atlas"
copy(src,dest)

srcTree = r"..\resource";
targetTree = r"..\Egret\resource\assets";
copyFolder(srcTree,targetTree)

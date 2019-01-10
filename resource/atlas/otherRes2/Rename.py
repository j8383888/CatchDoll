# -*- coding: utf-8 -*-
import os,shutil
def renamePng():
	count = 1;
	changeNameCount = 0;
	countAry = [];
	path = os.getcwd();
	floderName = path.split('\\')[-1];
	list = os.listdir(path)
	for i in range(0,len(list)):
		name = os.path.splitext(list[i])[0];
		suffix = os.path.splitext(list[i])[-1];
		if suffix == ".png":
			if not name.find(floderName + "_") == -1:
				countNum = name.split(floderName + "_")[-1];
				countAry.append(int(countNum))
				
	for i in range(0,len(list)):
		name = os.path.splitext(list[i])[0];
		suffix = os.path.splitext(list[i])[-1];
		if suffix == ".png":
			if name.find(floderName + "_") == -1:
				while count in countAry:
					count += 1;
				print(list[i] + "=>" + floderName+"_"+ str(count)+".png")
				changeNameCount += 1;
				os.rename(list[i], floderName+"_"+ str(count)+".png")
				countAry.append(count);
	if changeNameCount > 0:
		print(u"批量重命名了" +str(changeNameCount)+ u"个对象")
	else:
		print(u"没有需重命名的对象！")
renamePng()
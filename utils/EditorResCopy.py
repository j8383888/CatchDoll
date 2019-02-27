# -*- coding: utf-8 -*-  
import os,shutil


def copy(sorcePath,targetPath):
	if(os.path.exists(targetPath)):
		os.remove(targetPath)
	shutil.copyfile(sorcePath,targetPath)
	print("copy %s => %s"%(sorcePath,targetPath))



srcJson = r"..\resource\table\MonsterTable.json"
ColliderJson = r"..\ColliderEditor\resource\config\MonsterTable.json"
LevelEditorJson = r"..\LevelEditor\resource\config\MonsterTable.json"
copy(srcJson,ColliderJson)
copy(srcJson,LevelEditorJson)

srcTS = r"..\resource\table\MonsterTable.ts"
ColliderTS = r"..\ColliderEditor\src\Table\MonsterTable.ts"
LevelEditorTS = r"..\LevelEditor\src\Table\MonsterTable.ts"
copy(srcTS,ColliderTS)
copy(srcTS,LevelEditorTS)





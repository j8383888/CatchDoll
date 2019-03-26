# -*- coding: utf-8 -*-  
import os,shutil


def copy(sorcePath,targetPath):
	if(os.path.exists(targetPath)):
		os.remove(targetPath)
	shutil.copyfile(sorcePath,targetPath)
	print("copy %s => %s"%(sorcePath,targetPath))

def copyFolder(srcTree,targetTree):
	if not os.path.exists(srcTree):
		print("%s not exist" + srcTree)
		return

	if not os.path.exists(targetTree):
		os.mkdir(targetTree)

	if os.path.exists(targetTree):
		shutil.rmtree(targetTree);
	shutil.copytree(srcTree,targetTree);
	print("copyFolder %s => %s"%(srcTree,targetTree))

#配置档copy
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
srcJson = r"..\resource\table\SceneInteractiveObjectTable.json"
ColliderJson = r"..\ColliderEditor\resource\config\SceneInteractiveObjectTable.json"
LevelEditorJson = r"..\LevelEditor\resource\config\SceneInteractiveObjectTable.json"
copy(srcJson,ColliderJson)
copy(srcJson,LevelEditorJson)
srcTS = r"..\resource\table\SceneInteractiveObjectTable.ts"
ColliderTS = r"..\ColliderEditor\src\Table\SceneInteractiveObjectTable.ts"
LevelEditorTS = r"..\LevelEditor\src\Table\SceneInteractiveObjectTable.ts"
copy(srcTS,ColliderTS)
copy(srcTS,LevelEditorTS)


#特效copy
effRes = r"..\resource\effect\sceneEff";
LevelEditorEffRes = r"..\LevelEditor\resource\assets\effect\sceneEff";
copyFolder(effRes,LevelEditorEffRes)

#龙骨copy
dragonRes = r"..\resource\dragonBones";
LevelEditorDragonRes = r"..\LevelEditor\resource\assets\dragonBones";
ColliderEditorDragonRes = r"..\ColliderEditor\resource\assets\dragonBones";
copyFolder(dragonRes,LevelEditorDragonRes)
copyFolder(dragonRes,ColliderEditorDragonRes)

#编辑器的图集copy
BattleSceneJson = r"..\resource\atlas\BattleScene.json"
LevelEditorJson = r"..\LevelEditor\resource\assets\atlas\BattleScene.json"
BattleScenePng = r"..\resource\atlas\BattleScene.png"
LevelEditorPng = r"..\LevelEditor\resource\assets\atlas\BattleScene.png"
copy(BattleSceneJson,LevelEditorJson)
copy(BattleScenePng,LevelEditorPng)
BattleJson = r"..\resource\atlas\battle.json";
LevelEditorJson = r"..\LevelEditor\resource\assets\atlas\battle.json";
BattlePng = r"..\resource\atlas\battle.png";
LevelEditorPng = r"..\LevelEditor\resource\assets\atlas\battle.png";
copy(BattleJson,LevelEditorJson)
copy(BattlePng,LevelEditorPng)
# BattlePropJson = r"..\resource\atlas\battleProp.json";
# LevelEditorJson = r"..\LevelEditor\resource\assets\atlas\battleProp.json";
# BattlePropPng = r"..\resource\atlas\battleProp.png";
# LevelEditorPng = r"..\LevelEditor\resource\assets\atlas\battleProp.png";
# copy(BattlePropJson,LevelEditorJson)
# copy(BattlePropPng,LevelEditorPng)

# BattleSceneJson = r"..\resource\atlas\battleProp.json"
# LevelEditorJson = r"..\ColliderEditor\resource\assets\atlas\battleProp.json"
# BattleScenePng = r"..\resource\atlas\battleProp.png"
# LevelEditorPng = r"..\ColliderEditor\resource\assets\atlas\battleProp.png"
# copy(BattleSceneJson,LevelEditorJson)
# copy(BattleScenePng,LevelEditorPng)

# 背景图copy
Res = r"..\resource\image";
LevelEditorRes = r"..\LevelEditor\resource\assets\image";
copyFolder(Res,LevelEditorRes)

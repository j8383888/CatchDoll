/**
 * 游戏对象配置解析
 * @author suo
 */
module catchDoll {
	export class GameObjectConfigParse {

		/**
		 * 配置字典
		 */
		public static configDic: SimpleMap<IGameObjectConfig> = new SimpleMap<IGameObjectConfig>();

		public constructor() {
			GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.PAWS, {
				configAsset: {
				}, configData: {}
			});

			for (let item of TableCenter.instance.MonsterTable) {
				GameObjectConfigParse.configDic.set(item.id, {
					configAsset: {
						dragonBonesName: item.dragonBones
					}, configData: { speed: item.moveSpeed, life: item.life }
				});
			}

			// GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.MONSTER_ROBOT, {
			// 	configAsset: {
			// 		dragonBonesName: "munaiyi"
			// 	}, configData: { speed: 4, life: 100 }
			// });

			// GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.MONSTER_ROBOT_2, {
			// 	configAsset: {
			// 		dragonBonesName: "munaiyi2"
			// 	}, configData: { speed: 6, life: 100 }
			// });

			// GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.MONSTER_Cactus, {
			// 	configAsset: {
			// 		dragonBonesName: "skeleton"
			// 	}, configData: { speed: 8, life: 100 }
			// });
		}


		/**
		 * 根据标识获得配置数据
		 */
		public static getConfigBySign(sign: GAMEOBJECT_SIGN): IGameObjectConfig {
			return GameObjectConfigParse.configDic.get(sign);
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			GameObjectConfigParse.configDic.clear();
		}
	}
}
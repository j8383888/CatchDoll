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
				}, configData: {
					colliderAry: [{
						posX: 90,
						posY: 120,
						radius: 50
					}]
				}
			});

			for (let item of TableCenter.instance.MonsterTable) {
				GameObjectConfigParse.configDic.set(item.id, {
					configAsset: {
						dragonBonesName: item.dragonBones
					}, configData: { colliderAry: item.colliderAry, speed: item.moveSpeed, life: item.life }
				});
			}

			for (let item of TableCenter.instance.SceneInteractiveObjectTable) {
				GameObjectConfigParse.configDic.set(item.id, {
					configAsset: {
						imageAry: item.imageAry,
						movieClipAry: item.movieClipAry,
						dragonBonesName: item.dragonBonesName,
					}, configData: { colliderAry: item.colliderAry }
				});
			}
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
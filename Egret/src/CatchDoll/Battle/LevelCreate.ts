/**
 * 关卡创建
 * @author suo 
 */
module catchDoll {
	export class LevelCreate {

		/**
		 * 在视野内的怪物
		 */
		public static inSenceMonsterMap: Dictionary = new Dictionary();

		/**
		 * 可交互对象
		 */
		public static inSceneInterObjMap: Dictionary = new Dictionary();

		/**
		 * 需要跟怪物碰撞的可交互对象 字典
		 */
		public static InterObjHitMonsterMap: Dictionary = new Dictionary();
		/**
		 * 爪子是否下降
		 */
		public isCheck: boolean = false;
		/**
		 * 单例
		 */
		private static _instance: LevelCreate;
		/**
		* 碰撞标记 偶数帧 奇数帧
		*/
		private _colliderFlag: number = 0;
		/**
		 * 场景图片
		 */
		private _sceneImgs: eui.Image[] = [];


		private _catchMonster: Monster = null;

		private curLevelData: {
			level: number,
			bgSource: string,
			monster: {
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
			}[],
			sceneInteractiveObject: {
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				carrySubitem: {
					id: number,
					weightOdds: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
		};


		public constructor() {

		}

		/**
		 * 初始化
		 */
		public init(levelData: {
			level: number,
			bgSource: string,
			monster: {
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
			}[],
			sceneInteractiveObject: {
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				carrySubitem: {
					id: number,
					weightOdds: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
		}): void {
			this.curLevelData = levelData
			this._creatSence();
			this._creatMonster();
			this._creatInteractiveObject();
			this._creatMaster();
			Laya.timer.frameLoop(1, this, this._checkHit)
		}

		/**
		 * 创建可交互对象
		 */
		private _creatInteractiveObject(): void {
			for (let item of this.curLevelData.sceneInteractiveObject) {
				let varsData: ISenceInteractiveVars = <ISenceInteractiveVars>{};
				if (item.id == GAMEOBJECT_SIGN.RAMDOM_BOX) {
					(varsData as IRandomBox).carrySubitem = item.carrySubitem;
				}

				if (item.exportData.length == 1) {
					varsData.bornX = item.exportData[0].x;
					varsData.bornY = item.exportData[0].y;
				}
				else {
					varsData.fixedRotation = item.fixedRotation;
					varsData.exportData = item.exportData;
					varsData.operation = [<IOperation>{
						type: OPERATION_TYPE.MONSTER
					}]
				}
				GameObjectFactory.instance.creatGameObject(item.id, varsData, LAYER.SCENE_INTERACTIVE_HIGH)
			}
		}

		/**
		 * 场景场景
		 */
		private _creatSence() {
			for (let item of this.curLevelData.mapData) {
				let img: eui.Image = Pool.getItemByCreateFun(Pool.sceneImg, Handler.create(this, this._creatSecneImg, null, true))
				img.x = item.x;
				img.y = item.y;
				img.width = item.width;
				img.height = item.height;
				img.source = item.source;
				LayerManager.instance.addToLayer(img, LAYER.BATTLE_SCENE);
				this._sceneImgs.push(img);
			}

		};

		private _creatSecneImg(): eui.Image {
			let img = new eui.Image();
			img.fillMode = egret.BitmapFillMode.REPEAT;
			return img;
		}

		/**
		 * 检测怪物碰撞
		 */
		private _checkMonsterHit(paw: Paws): boolean {
			let monsterMap = LevelCreate.inSenceMonsterMap
			let monsterMapLen: number = monsterMap.length;
			if (monsterMapLen == 0) {
				return;
			}


			let i: number = 0;
			/**
			 * 设置全局坐标
			 */
			for (i = 0; i < monsterMapLen; i += this._colliderFlag + 1) {
				let monsterP: Monster = monsterMap.values[i];
				if (monsterP.isCollided) {
					continue;
				}
				let monsterPColliderAry = monsterP.colliderAry
				let monsterPColliderAryLen = monsterPColliderAry.length;
				for (let m: number = 0; m < monsterPColliderAryLen; m++) {
					let monsterPCollider = monsterPColliderAry[m]
					let p = monsterP.dragonBones.armature.getBone("centre").global
					monsterPCollider.x = p.x
					monsterPCollider.y = p.y
					monsterPCollider.setGlobePos();
				}
			}

			for (i = 0; i < monsterMapLen; i += this._colliderFlag + 1) {
				let monster: Monster = monsterMap.values[i];
				if (monster.isCollided) {
					continue;
				}
				let monsterColliderAry = monster.colliderAry
				let pawColliderAry = paw.colliderAry
				if (GameObjectCollider.isIntersect(monsterColliderAry, pawColliderAry)) {
					this.isCheck = false;
					this._catchMonster = monster;
					monster.isCollided = true;
					monster.dragonBones.animation.gotoAndStopByTime("Walk", 0);
					let transform = monster.dragonBones.armature.getBone("centre").global
					monster.haemalGroup.x = transform.x;
					monster.haemalGroup.y = transform.y;
					egret.Tween.removeTweens(paw.pawsBody.pawsHead);

					/*血条缩短*/
					let targetWidth: number = 0;
					monster.life -= paw.pawsBody.hurt;
					if (monster.life <= 0) {
						monster.life = 0;
						targetWidth = 0;
						monster.x = paw.x;
						monster.y = paw.pawsBody.pawsHead.y + paw.y + monster.offsetY;
						monster.unregisterOperation();
					}
					else {
						targetWidth = monster.life / monster.maxLife * monster.haemalStrandWidth;
					}
					/*血条缩短Tween*/
					egret.Tween.get(monster.haemalStrandMask).to({ width: targetWidth }, paw.pawsBody.hurtDuration[0] * 1000, egret.Ease.quadIn).call(() => {
						/**
						 * 抓住
						 */
						if (targetWidth == 0) {
							let time = 600;/// (660 - paw.pawsSkinBox.pawsHeadStartPosY) * (paw.pawsSkinBox.y - paw.pawsSkinBox.pawsHeadStartPosY);
							egret.Tween.get(paw.pawsBody.pawsHead, {
								onChange: () => {
									paw.confirmRopeHeight();
									if (monster) {
										monster.x = paw.x;
										monster.y = paw.pawsBody.pawsHead.y + monster.offsetY + paw.y;
									}
								},
								onChangeObj: this,
							}).wait(300).to({ y: paw.pawsBody.pawsHeadStartPosY }, time).call(() => {
								GameObjectFactory.instance.recoverGameObject(monster);
								paw.pawsBody.isDown = false;
								this._checkEnd();
							})
						}
						/**
						 * 没抓住
						 */
						else {
							monster.dragonBones.animation.play("Walk", 0);
							paw.noCatchActionFast()
						}
					})
					return true;

				}

			}
			return false
		}

		/**
		 * 检测可交互对象碰撞
		 */
		private _checkInteractiveHit(paw: Paws): void {
			let interObjMap = LevelCreate.inSceneInterObjMap
			let interObjMapLen: number = interObjMap.length;
			if (interObjMapLen == 0) {
				return;
			}
			let i: number = 0;
			/**
			 * 设置全局坐标
			 */

			for (i = 0; i < interObjMapLen; i += this._colliderFlag + 1) {
				let interObjP: SceneInteractiveObject = interObjMap.values[i];
				if (interObjP.isCollided) {
					continue;
				}
				let interObjPColliderAry = interObjP.colliderAry
				let interObjPColliderAryLen = interObjPColliderAry.length;
				for (let m: number = 0; m < interObjPColliderAryLen; m++) {
					let interObjPCollider = interObjPColliderAry[m]
					interObjPCollider.setGlobePos();
				}
			}

			for (i = 0; i < interObjMapLen; i += this._colliderFlag + 1) {
				let interObj: SceneInteractiveObject = interObjMap.values[i];
				if (interObj.isCollided) {
					continue;
				}
				let interObjPColliderAry = interObj.colliderAry
				let pawColliderAry = paw.colliderAry
				if (GameObjectCollider.isIntersect(interObjPColliderAry, pawColliderAry)) {
					this.isCheck = false;
					egret.Tween.removeTweens(paw.pawsBody.pawsHead);
					interObj.unregisterOperation();

					/**
					 * 如果随机箱子
					 */
					if (interObj.sign == GAMEOBJECT_SIGN.RAMDOM_BOX) {
						(interObj as RandomBox).playDieEff();
						paw.noCatchActionSlow();
					}
					else if (interObj.sign == GAMEOBJECT_SIGN.PARALYTIC_TRAP) {
						let target: ParalyticTrap = interObj as ParalyticTrap
						if (!target.isOpen) {
							target.isCollided = true;
							target.onOpen();
						}
						paw.noCatchActionSlow();
					}

					else {
						let time = 600;/// (660 - paw.pawsSkinBox.pawsHeadStartPosY) * (paw.pawsSkinBox.y - paw.pawsSkinBox.pawsHeadStartPosY);
						egret.Tween.get(paw.pawsBody.pawsHead, {
							onChange: () => {
								paw.confirmRopeHeight();
								if (interObj) {
									interObj.x = paw.x;
									interObj.y = paw.pawsBody.pawsHead.y + interObj.height + paw.y;
								}
							},
							onChangeObj: this,
						}).wait(300).to({ y: paw.pawsBody.pawsHeadStartPosY }, time).call(() => {
							GameObjectFactory.instance.recoverGameObject(interObj);
							paw.pawsBody.isDown = false;
						})
					}
				}
			}
		}



		/**
		 * 检测碰撞
		 */
		private _checkHit(): void {

			if (this._colliderFlag == 0) {
				this._colliderFlag = 1;
			}
			else {
				this._colliderFlag = 0;
			}
			if (this.isCheck) {
				let paw = Master.instance.MasterPaws;
				let pawColliderArylen = paw.colliderAry.length
				for (let i: number = 0; i < pawColliderArylen; i++) {
					paw.colliderAry[i].setGlobePos();
				}

				if (this._checkMonsterHit(paw)) {

				}
				else {
					this._checkInteractiveHit(paw)
				}
			}

			this._checkInteractiveAndMonsterHit();
		}

		/**
		 * 检测场景可交互对象与怪兽的碰撞
		 */
		private _checkInteractiveAndMonsterHit(): void {
			let interHitMonsterMap = LevelCreate.InterObjHitMonsterMap;
			let interHitMonsterMapLen: number = interHitMonsterMap.length;
			if (interHitMonsterMapLen == 0) {
				return;
			}
			let monsterMap = LevelCreate.inSenceMonsterMap
			let monsterMapLen: number = monsterMap.length;
			if (monsterMapLen == 0) {
				return;
			}
			interHitMonsterMap = interHitMonsterMap.copy()


			let i: number = 0;
			/**
			 * 设置全局坐标
			 */
			for (i = 0; i < interHitMonsterMapLen; i += this._colliderFlag + 1) {
				let interObjP: ParalyticTrap = interHitMonsterMap.values[i];
				let interObjPColliderAry = interObjP.trapColliderAry
				let interObjPColliderAryLen = interObjPColliderAry.length;
				for (let m: number = 0; m < interObjPColliderAryLen; m++) {
					let interObjPCollider = interObjPColliderAry[m]
					interObjPCollider.setGlobePos();
				}
			}

			if (!this.isCheck) {
				/**
			 	 * 设置全局坐标
			 	 */
				for (i = 0; i < monsterMapLen; i += this._colliderFlag + 1) {
					let monsterP: Monster = monsterMap.values[i];
					if (monsterP.isCollided) {
						continue;
					}
					let monsterPColliderAry = monsterP.colliderAry
					let monsterPColliderAryLen = monsterPColliderAry.length;
					for (let m: number = 0; m < monsterPColliderAryLen; m++) {
						let monsterPCollider = monsterPColliderAry[m]
						let p = monsterP.dragonBones.armature.getBone("centre").global
						monsterPCollider.x = p.x
						monsterPCollider.y = p.y
						monsterPCollider.setGlobePos();
					}
				}
			}

			for (let j = 0; j < interHitMonsterMapLen; j += this._colliderFlag + 1) {
				let interObj: ParalyticTrap = interHitMonsterMap.values[j];
				let interObjColliderAry = interObj.trapColliderAry
				for (let f = 0; f < monsterMapLen; f += this._colliderFlag + 1) {
					let monster: Monster = monsterMap.values[f];
					if (monster.isCollided) {
						continue;
					}
					let monsterColliderAry = monster.colliderAry
					if (GameObjectCollider.isIntersect(interObjColliderAry, monsterColliderAry)) {
						monster.stopMove()
						LevelCreate.InterObjHitMonsterMap.remove(interObj.uID);
						GameObjectFactory.instance.recoverGameObject(interObj);
						break;
					}
				}
			}
		}

		private _checkEnd(): void {
			if (LevelCreate.inSenceMonsterMap.length == 0) {
				SimpleUICenter.instance.openUI(SIMPLE_UI.SettlePanel, { starNum: 3, itemID: 1 });
				let control: BattleSceneControl = UICenter.instance.getManager(commonUI.BattleScene).getControl(BattleSceneControl);
				Laya.timer.clear(control, control.updateTime)
			}
		}


		/**
		 * 获得单例
		 */
		public static get instance(): LevelCreate {
			if (this._instance == null) {
				this._instance = new LevelCreate();
			}
			return this._instance;
		}

		/**
		 * 创建怪物
		 */
		private _creatMonster(): void {
			for (let item of this.curLevelData.monster) {

				let varsData: IMonsterVars = <IMonsterVars>{};
				varsData.fixedRotation = item.fixedRotation;
				varsData.exportData = item.exportData;
				varsData.operation = [<IOperation>{
					type: OPERATION_TYPE.MONSTER

				}]
				GameObjectFactory.instance.creatGameObject(item.id, varsData, LAYER.MONSTER)
			}

		}

		/**
		 * 创建主角
		 */
		private _creatMaster(): void {
			Master.instance.MasterPaws = GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.PAWS)
			Master.instance.MasterPaws.pawsBody.switchClip(1);
			Master.instance.MasterPaws.y = 160;
			Master.instance.MasterPaws.x = 360;
		}

		private _recoveSceneImg(): void {
			for (let item of this._sceneImgs) {
				Pool.recover(Pool.sceneImg, item)
			}
			this._sceneImgs.length = 0;
			LayerManager.instance.getLayer(LAYER.BATTLE_SCENE).removeChildren();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			if (this._catchMonster) {
				egret.Tween.removeTweens(this._catchMonster.haemalStrandMask)
			}
			Master.instance.MasterPaws.pawsBody.isDown = false;
			egret.Tween.removeTweens(Master.instance.MasterPaws.pawsBody.pawsHead)

			let len: number = LevelCreate.inSenceMonsterMap.length;
			let map: Dictionary = LevelCreate.inSenceMonsterMap.copy();
			for (let i: number = 0; i < len; i++) {
				let monster: Monster = map.values[i];
				GameObjectFactory.instance.recoverGameObject(monster);
			}

			let len2: number = LevelCreate.inSceneInterObjMap.length;
			let map2: Dictionary = LevelCreate.inSceneInterObjMap.copy();
			for (let i: number = 0; i < len2; i++) {
				let inter: SceneInteractiveObject = map2.values[i];
				GameObjectFactory.instance.recoverGameObject(inter);
			}


			if (Master.instance.MasterPaws) {
				GameObjectFactory.instance.recoverGameObject(Master.instance.MasterPaws);
				Master.instance.MasterPaws = null;
			}
			this._recoveSceneImg();
			Laya.timer.clear(this, this._checkHit)


			this.curLevelData = null;

		}
	}
}
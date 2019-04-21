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
		/**
		 * 特效组
		 */
		private _effBox: egret.MovieClip[] = [];


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
					offsetX: number,
					offsetY: number,
					weightOdds: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
			effData: { source, x, y }[]
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
					offsetX: number,
					offsetY: number,
					weightOdds: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
			effData: { source, x, y }[]
		}): void {
			this.curLevelData = levelData
			this._creatSence();
			this._creatMonster();
			this._creatInteractiveObject();
			this._creatMaster();
			this._creatEff();
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
					varsData.bornX = item.exportData[0].x
					varsData.bornY = item.exportData[0].y + GameCenter.stageHOffset;
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
				if (item.y < 200) {
					img.y = item.y
				}
				else {
					img.y = item.y + GameCenter.stageHOffset;
				}
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
		 * 创建特效
		 */
		private _creatEff(): void {
			for (let item of this.curLevelData.effData) {
				let mov = UIUtil.creatMovieClip(item.source);
				mov.x = item.x;
				mov.y = item.y + GameCenter.stageHOffset;
				mov.gotoAndPlay(1, -1);
				LayerManager.instance.addToLayer(mov, LAYER.BATTLE_EFFECT_LOW)
				this._effBox.push(mov);
			}
		}

		/**
		 * 检测怪物碰撞
		 */
		private _checkPawHitMonster(paw: Paws): boolean {
			let monsterMap = LevelCreate.inSenceMonsterMap
			let monsterMapLen: number = monsterMap.length;
			if (monsterMapLen == 0) {
				return;
			}

			let i: number = 0;
			for (i = 0; i < monsterMapLen; i += this._colliderFlag + 1) {
				let monster: Monster = monsterMap.values[i];
				if (!monster.isOpen || monster.isHide) {
					continue;
				}
				let monsterColliderAry = monster.colliderAry
				let pawColliderAry = paw.colliderAry
				if (GameObjectCollider.isIntersect(monsterColliderAry, pawColliderAry)) {
					paw.isOpen = false;
					monster.isOpen = false;
					this._catchMonster = monster;
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
		private _checkPawHitInteractive(paw: Paws): void {
			let interObjMap = LevelCreate.inSceneInterObjMap
			let interObjMapLen: number = interObjMap.length;
			if (interObjMapLen == 0) {
				return;
			}
			let i: number = 0;

			for (i = 0; i < interObjMapLen; i += this._colliderFlag + 1) {
				let interObj: SceneInteractiveObject = interObjMap.values[i];
				if (!interObj.isOpen) {
					continue;
				}
				let interObjColliderAry = interObj.colliderAry
				let pawColliderAry = paw.colliderAry
				if (GameObjectCollider.isIntersect(interObjColliderAry, pawColliderAry)) {
					paw.isOpen = false;
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
						if (!target.isMonsterHitOpen) {
							target.isOpen = false;
							target.openMonsterHit();
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

			this._setMonsterGlobeP();
			this._setInterGlobeP();

			this._checkInterHitMonster();

			let paw = Master.instance.MasterPaws;
			if (paw.isOpen) {
				let pawColliderArylen = paw.colliderAry.length
				for (let i: number = 0; i < pawColliderArylen; i++) {
					paw.colliderAry[i].setGlobePos();
				}
				if (this._checkPawHitMonster(paw)) {
				}
				else {
					this._checkPawHitInteractive(paw)
				}
			}
		}

		/**
		 * 设置可交互对象的全局坐标
		 */
		private _setInterGlobeP(): void {
			let interObjMap = LevelCreate.inSceneInterObjMap;
			let interObjMapLen: number = interObjMap.length;
			if (interObjMapLen == 0) {
				return;
			}
			let i: number = 0;
			/**S
			 * 设置全局坐标
			 */
			for (i = 0; i < interObjMapLen; i += this._colliderFlag + 1) {
				let interObj: SceneInteractiveObject = interObjMap.values[i];
				if (!interObj.isStatic) {
					if (interObj.isOpen) {
						let interObjColliderAry = interObj.colliderAry
						let interObjColliderAryLen = interObjColliderAry.length;
						for (let m: number = 0; m < interObjColliderAryLen; m++) {
							let interObjCollider = interObjColliderAry[m]
							interObjCollider.setGlobePos();
						}
					}

					if (interObj.isMonsterHitOpen) {
						let hitMonsterColliderAry = interObj.hitMonsterColliderAry
						let hitMonsterColliderAryLen = hitMonsterColliderAry.length;
						for (let m: number = 0; m < hitMonsterColliderAryLen; m++) {
							let hitMonsterCollider = hitMonsterColliderAry[m]
							hitMonsterCollider.setGlobePos();
						}
					}
				}
			}
		}

		/**
		 * 设置全局坐标
		 */
		private _setMonsterGlobeP(): void {
			let i: number;
			let monsterMap = LevelCreate.inSenceMonsterMap
			let monsterMapLen: number = monsterMap.length;
			if (monsterMapLen == 0) {
				return;
			}
			/**
			 * 设置全局坐标
			 */
			for (i = 0; i < monsterMapLen; i += this._colliderFlag + 1) {
				let monsterP: Monster = monsterMap.values[i];
				if (monsterP.isOpen) {
					let monsterPColliderAry = monsterP.colliderAry
					let monsterPColliderAryLen = monsterPColliderAry.length;
					for (let m: number = 0; m < monsterPColliderAryLen; m++) {
						let monsterPCollider = monsterPColliderAry[m]
						let p = monsterP.dragonBones.armature.getBone("centre").global
						monsterPCollider.setToXY(p.x, p.y)
						monsterPCollider.setGlobePos();
					}
				}
			}
		}

		/**
		 * 检测场景可交互对象与怪兽的碰撞
		 */
		private _checkInterHitMonster(): void {
			let interObjMap = LevelCreate.inSceneInterObjMap;
			let interObjMapLen: number = interObjMap.length;
			if (interObjMapLen == 0) {
				return;
			}
			let monsterMap = LevelCreate.inSenceMonsterMap
			let monsterMapLen: number = monsterMap.length;
			if (monsterMapLen == 0) {
				return;
			}

			let i: number = 0;

			// let deleteAry = []
			for (let j = 0; j < interObjMapLen; j += this._colliderFlag + 1) {
				let interObj: ParalyticTrap = interObjMap.values[j];
				if (!interObj.isMonsterHitOpen) {
					continue;
				}
				if (interObj.sign == GAMEOBJECT_SIGN.Mushroom_RED || interObj.sign == GAMEOBJECT_SIGN.Mushroom_GREEN) {
					continue;
				}
				let interObjColliderAry = interObj.hitMonsterColliderAry;
				for (let f = 0; f < monsterMapLen; f += this._colliderFlag + 1) {
					let monster: Monster = monsterMap.values[f];
					if (!monster.isOpen) {
						continue;
					}
					let monsterColliderAry = monster.colliderAry
					if (GameObjectCollider.isIntersect(interObjColliderAry, monsterColliderAry)) {
						if (interObj.sign == GAMEOBJECT_SIGN.PARALYTIC_TRAP) {
							monster.stopMove();
							(interObj as ParalyticTrap).close();
						}
						else if (interObj.sign == GAMEOBJECT_SIGN.GRASS) {
							monster.hide(true);
						}
						break;
					}
					else {
						if (interObj.sign == GAMEOBJECT_SIGN.GRASS) {
							monster.hide(false);
						}
					}
				}
			}
			// for (let item of deleteAry) {
			// 	GameObjectFactory.instance.recoverGameObject(item);
			// }
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
			Master.instance.MasterPaws = GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.PAWS, null, LAYER.BATTLE_OP);
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

			for (let item of this._effBox) {
				item.stop();
				LayerManager.instance.removeFromLayer(item, LAYER.BATTLE_EFFECT_LOW);
				item = null;
			}
			this._effBox.length = 0;



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
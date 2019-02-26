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
				monsterID: number,
				fixedRotation: number,
				pathMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number }[],
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
				monsterID: number,
				fixedRotation: number,
				pathMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number }[],
			}[],
			mapData: { source, x, y, width, height }[],
		}): void {
			this.curLevelData = levelData
			this._creatSence();
			this._creatMonster();
			this._creatMaster();

			Laya.timer.frameLoop(1, this, this._checkHit)

		}

		private _creatSence() {
			let view: BattleSceneView = UICenter.instance.getManager(commonUI.BattleScene).getView(BattleSceneView);
			for (let item of this.curLevelData.mapData) {
				let img: eui.Image = Pool.getItemByCreateFun(Pool.sceneImg, Handler.create(this, this._creatSecneImg, null, true))
				img.x = item.x;
				img.y = item.y;
				img.width = item.width;
				img.height = item.height;
				img.source = item.source;
				view.sceneImgBox.addChild(img);
				this._sceneImgs.push(img);
			}

		};

		private _creatSecneImg(): eui.Image {
			let img = new eui.Image();
			img.fillMode = egret.BitmapFillMode.REPEAT;
			return img;
		}

		/**
		 * 检测碰撞
		 */
		private _checkHit(): void {
			if (this.isCheck) {
				let monsterMap = LevelCreate.inSenceMonsterMap
				let monsterMapLen: number = monsterMap.length;
				if (monsterMapLen == 0) {
					return;
				}
				if (this._colliderFlag == 0) {
					this._colliderFlag = 1;
				}
				else {
					this._colliderFlag = 0;
				}

				let paw = Master.instance.MasterPaws;
				let i: number = 0;
				/**
				 * 设置全局坐标
				 */
				let pawColliderArylen = paw.colliderAry.length
				for (i = 0; i < pawColliderArylen; i++) {
					paw.colliderAry[i].setGlobePos();
				}
				for (i = 0; i < monsterMapLen; i += this._colliderFlag + 1) {
					let monsterP: Monster = monsterMap.values[i];
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
					let monsterColliderAry = monster.colliderAry
					let monsterColliderAryLen = monsterColliderAry.length;
					let pawColliderAry = paw.colliderAry
					let pawColliderAryLen = pawColliderAry.length;
					for (let k: number = 0; k < pawColliderAryLen; k++) {
						let pawCollider = pawColliderAry[k];
						for (let j: number = 0; j < monsterColliderAryLen; j++) {
							let monsterCollider = monsterColliderAry[j];
							if (Collider.isIntersect(pawCollider, monsterCollider)) {
								this.isCheck = false;
								monster.isSpasticity = true;
								this._catchMonster = monster;
								monster.dragonBones.animation.gotoAndStopByTime("Walk", 0);
								egret.Tween.removeTweens(paw.pawsSkinBox.pawsHead);

								/*血条缩短*/
								let targetWidth: number = 0;
								monster.life -= paw.pawsSkinBox.hurt;
								if (monster.life <= 0) {
									monster.life = 0;
									targetWidth = 0;
									monster.x = paw.x;
									monster.y = paw.pawsSkinBox.pawsHead.y + 300
									monster.unregisterOperation();
								}
								else {
									targetWidth = monster.life / monster.maxLife * monster.haemalStrandWidth;
								}
								egret.Tween.get(monster.haemalStrand).to({ width: targetWidth }, 300, egret.Ease.quadIn).call(() => {
									monster.isSpasticity = false;
									/**
									 * 抓住
									 */
									if (targetWidth == 0) {
										let time = 600;/// (660 - paw.pawsSkinBox.pawsHeadStartPosY) * (paw.pawsSkinBox.y - paw.pawsSkinBox.pawsHeadStartPosY);
										egret.Tween.get(paw.pawsSkinBox.pawsHead, {
											onChange: () => {
												paw.confirmRopeHeight();
												if (monster) {
													monster.x = paw.x;
													monster.y = paw.pawsSkinBox.pawsHead.y + 300;
												}
											},
											onChangeObj: this,
										}).wait(300).to({ y: paw.pawsSkinBox.pawsHeadStartPosY }, time).call(() => {
											GameObjectFactory.instance.recoverGameObject(monster);
											paw.isDown = false;
										})
									}
									/**
									 * 没抓住
									 */
									else {
										monster.dragonBones.animation.play("Walk", 0);
										paw.noCatchAction()
									}
								})
								return;
							}
						}
					}
				}
			}
		}





		// let monsterMap: Dictionary = LevelCreate.inSenceMonsterMap;
		// 	let globePosx: number = this._gameObj.x;
		// 	for (let i: number = 0; i < monsterMap.length; i++) {
		// 		let monster: Monster = monsterMap.values[i];
		// 		let monsterGlobePosx: number = monster.x;
		// 		egret.log("钩子跟怪的距离：" + Math.abs(monsterGlobePosx - globePosx));
		// 		if (Math.abs(monsterGlobePosx - globePosx) <= 60) {
		// 			this._catchMonster = monster;
		// 			break;
		// 		}
		// 	}
		// 	if (this._catchMonster) {
		// 		/*血条缩短*/
		// 		let targetWidth: number = 0;
		// 		// this._catchMonster.life -= this._gameObj.hurt;

		// 		if (this._catchMonster.life <= 0) {
		// 			this._catchMonster.life = 0;
		// 			targetWidth = 0;
		// 			this._catchMonster.x = this._gameObj.x;
		// 			this._catchMonster.y = this._gameObj.pawsHead.y + 300;
		// 			this._catchMonster.unregisterOperation();
		// 		}
		// 		else {
		// 			egret.log(this._catchMonster.life + " " + this._catchMonster.maxLife + " " + this._catchMonster.haemalStrandWidth)
		// 			targetWidth = this._catchMonster.life / this._catchMonster.maxLife * this._catchMonster.haemalStrandWidth;
		// 		}
		// 		egret.log("targetWidth:" + targetWidth)
		// 		egret.Tween.get(this._catchMonster.haemalStrand).to({ width: targetWidth }, 300, egret.Ease.quadIn).call(() => {
		// 			if (targetWidth == 0) {
		// 				egret.Tween.get(this._gameObj.pawsHead, {
		// 					onChange: this._pwdUpAction,
		// 					onChangeObj: this
		// 				}).wait(200).to({ y: this._gameObj.pawsHeadStartPosY }, 600, egret.Ease.quadIn).call(() => {
		// 					GameObjectFactory.instance.recoverGameObject(this._catchMonster);
		// 					this._catchMonster = null;
		// 					this._isDown = false;
		// 					/*抓住了就2s后再创建一个*/
		// 					// Laya.timer.once(2000, this, this._addMonster)

		// 				});
		// 			}
		// 			else {
		// 				this._noCatchAction();
		// 			}
		// 		});
		// 	}
		// 	else {
		// 		this._noCatchAction();
		// 	}

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
				GameObjectFactory.instance.creatGameObject(item.monsterID, varsData)
			}

		}

		/**
		 * 创建主角
		 */
		private _creatMaster(): void {
			Master.instance.MasterPaws = GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.PAWS)
			Master.instance.MasterPaws.pawsSkinBox.switchClip(1);
			Master.instance.MasterPaws.y = 160;
			Master.instance.MasterPaws.x = 360;
		}

		private _recoveSceneImg(): void {
			let view: BattleSceneView = UICenter.instance.getManager(commonUI.BattleScene).getView(BattleSceneView);
			for (let item of this._sceneImgs) {
				Pool.recover(Pool.sceneImg, item)
			}
			this._sceneImgs.length = 0;
			if (view) {
				view.sceneImgBox.removeChildren();
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			if (this._catchMonster) {
				egret.Tween.removeTweens(this._catchMonster.haemalStrand)
			}
			Master.instance.MasterPaws.isDown = false;
			egret.Tween.removeTweens(Master.instance.MasterPaws.pawsSkinBox.pawsHead)

			let len: number = LevelCreate.inSenceMonsterMap.length;
			let map: Dictionary = LevelCreate.inSenceMonsterMap.copy();
			for (let i: number = 0; i < len; i++) {
				let monster: Monster = map.values[i];
				GameObjectFactory.instance.recoverGameObject(monster);
			}
			if (Master.instance.MasterPaws) {
				GameObjectFactory.instance.recoverGameObject(Master.instance.MasterPaws);
				Master.instance.MasterPaws = null;
			}
			this._recoveSceneImg();


			this.curLevelData = null;

		}
	}
}
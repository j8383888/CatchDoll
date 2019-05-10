module catchDoll {
	export class MoveOperation extends BaseOperation {

		/**
		 * 宿主对象
		 */
		public _gameObj: Monster;
		/**
		 * 路径节点序列
		 */
		public pathNodes: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[];
		/**
		 * 路径节点序列(镜像)
		 */
		public pathMirrorNodes: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[];
		/**
		 * 当前路径数据
		 */
		public curPathData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[];

		/**
		 * 当前路径节点
		 */
		public curPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number };
		/**
		 * 下一个路径节点
		 */
		public nextPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number };
		/**
		 * 当前路径节点索引
		 */
		public pathNodeIndex = 0;

		public fixedRotation: number = 0;
		/*是否路径镜像*/
		public pathMirror: boolean;
		/*是否随机回头*/
		public isRamdomTurnRound: boolean;

		/**
		 * 是否在镜像路径上
		 */
		public isInMirrorPath: boolean = false;
		/**
		 * 冷却时间
		 */
		public coolingTurnRoundTimerKey: number = - 1;
		/**
		 * 是否在冷却随机回头
		 */
		public isCoolingTurnRound: boolean = false;

		public constructor() {
			super();
		}

		/**
	 	 * 注册
	 	 */
		public register(gameObj: catchDoll.GameObject): void {
			this._gameObj = gameObj as Monster;

			this._gameObj.startTime = egret.getTimer();
			let monsterVars = gameObj.varsData as IMonsterVars;
			this.fixedRotation = monsterVars.fixedRotation
			this.pathNodes = monsterVars.exportData;
			this.pathMirrorNodes = monsterVars.exportMirrorData
			this.pathMirror = monsterVars.pathMirror;
			this.isRamdomTurnRound = monsterVars.isRamdomTurnRound;
			this.curPathNode = this.pathNodes[0];
			this.nextPathNode = this.pathNodes[1];
			this.curPathData = this.pathNodes;
			if (this.isRamdomTurnRound) {
				this.isCoolingTurnRound = true;
				this.coolingTurnRoundTimerKey = egret.setTimeout(() => {
					this.isCoolingTurnRound = false
				}, null, 1000);
			}

			if (this.pathNodes.length == 0 || this.pathMirrorNodes.length == 0) {
				console.assert(false, "逻辑有误")
			}
		}

		/**
         * 反注册
         */
		public unregister(): void {
			this._gameObj = null;
			this.curPathNode = null;
			this.nextPathNode = null;
			egret.clearTimeout(this.coolingTurnRoundTimerKey);
		}


		/**
		 * 帧循环
		 */
		public enterFrame(): void {
			let monster = this._gameObj as Monster;
			if (monster.isStopMove) {
				return;
			}

			let time = egret.getTimer();
			let runTime = (time - monster.startTime) / 1000;
			let curMoveDistance = runTime * monster.speed + monster.moveDistance;
			let len = this.curPathData.length;
			let lastPath = this.curPathData[len - 1]
			let total = lastPath.distTotal


			if (curMoveDistance >= total) {
				if (this.pathMirror) {
					if (this.isInMirrorPath) {
						monster.moveDistance = 0;
						this.pathNodeIndex = 0;
						this.curPathNode = this.pathNodes[0];
						this.nextPathNode = this.pathNodes[1];
						monster.startTime = egret.getTimer();
						this.curPathData = this.pathNodes;
						this.isInMirrorPath = false;
					}
					else {
						monster.moveDistance = 0;
						this.pathNodeIndex = 0;
						this.curPathNode = this.pathMirrorNodes[0];
						this.nextPathNode = this.pathMirrorNodes[1];
						this.curPathData = this.pathMirrorNodes;
						monster.startTime = egret.getTimer();
						this.isInMirrorPath = true;
					}
				}
				else {
					monster.moveDistance = 0;
					this.pathNodeIndex = 0;
					this.curPathNode = this.pathNodes[0];
					this.nextPathNode = this.pathNodes[1];
					monster.startTime = egret.getTimer();
					this.isInMirrorPath = false;
				}
				return;
			}

			/**
			 * 随机回头
			 */
			if (this.isRamdomTurnRound) {
				if (!this.isCoolingTurnRound) {
					this.coolingTurnRoundTimerKey = egret.setTimeout(() => {
						this.isCoolingTurnRound = false
					}, null, 3000);
					this.isCoolingTurnRound = true;
					if (monster.isStopMove) {
						return;
					}

					if (Math.random() > 0.5) {
						if (this.pathNodeIndex >= len - 1) {
							return;
						}
						let index = len - this.pathNodeIndex - 1
						if (this.isInMirrorPath) {
							this.curPathNode = this.pathNodes[index - 1];
							this.nextPathNode = this.pathNodes[index];
							this.curPathData = this.pathNodes;
							monster.moveDistance = total - curMoveDistance
							this.isInMirrorPath = false;
						}
						else {
							this.curPathNode = this.pathMirrorNodes[index - 1];
							this.nextPathNode = this.pathMirrorNodes[index];
							this.curPathData = this.pathMirrorNodes;
							monster.moveDistance = total - curMoveDistance
							this.isInMirrorPath = true;
						}
						this.pathNodeIndex = index;
						monster.startTime = egret.getTimer();
						return
					}
				}
			}

			let transform = monster.dragonBones.armature.getBone("centre").global

			monster.haemalGroup.x = transform.x;
			monster.haemalGroup.y = transform.y;


			if (curMoveDistance > this.nextPathNode.distTotal) {
				let len = this.curPathData.length;
				for (let i: number = this.pathNodeIndex; i < len; i++) {

					/**
					 * 创建特效
					 */
					if (this.curPathData[i].distNext == 0 && i != len - 1) {
						let mov = Pool.getItemByCreateFun(Pool.transmitBeam, Handler.create(UIUtil, UIUtil.creatMovieClip, ["transmitBeam"]))
						mov.gotoAndPlay(1, 1);
						mov.x = this.curPathData[i].x;
						mov.y = (this.curPathData[i].y - 50) + GameCenter.stageHOffset;
						mov.scaleY = 1
						LayerManager.instance.addToLayer(mov, LAYER.BATTLE_EFFECT_HIGH)
						mov.once(egret.MovieClipEvent.COMPLETE, () => {
							Pool.recover(Pool.transmitBeam, mov)
							LayerManager.instance.removeFromLayer(mov, LAYER.BATTLE_EFFECT_HIGH)
						}, null)

						let mov2 = Pool.getItemByCreateFun(Pool.transmitBeam, Handler.create(UIUtil, UIUtil.creatMovieClip, ["transmitBeam"]))
						mov2.gotoAndPlay(1, 1);
						mov2.x = this.curPathData[i + 1].x;
						mov2.y = this.curPathData[i + 1].y + GameCenter.stageHOffset;
						mov2.scaleY = -1;
						LayerManager.instance.addToLayer(mov2, LAYER.BATTLE_EFFECT_HIGH)
						mov2.once(egret.MovieClipEvent.COMPLETE, () => {
							Pool.recover(Pool.transmitBeam, mov2)
							LayerManager.instance.removeFromLayer(mov2, LAYER.BATTLE_EFFECT_HIGH)
						}, null)
					}

					if (this.curPathData[i].distTotal > curMoveDistance) {
						this.pathNodeIndex = i;
						this.nextPathNode = this.curPathData[i];
						this.curPathNode = this.curPathData[i - 1];
						break;
					}
				}
			}

			let curPath = this.curPathNode;
			let nextPath = this.nextPathNode;

			curPath = curPath == null ? lastPath : curPath;
			nextPath = nextPath == null ? lastPath : nextPath;

			let distNext = curPath.distNext;
			let offsetDist = curMoveDistance - curPath.distTotal;
			let offsetx = offsetDist / distNext * (nextPath.x - curPath.x);
			let offsety = offsetDist / distNext * (nextPath.y - curPath.y);

			monster.x = (curPath.x + offsetx);
			monster.y = (curPath.y + offsety) + GameCenter.stageHOffset;
			monster.dragonBones.scaleX = curPath.scaleX;
			/**
			 * 未锁定角度
			 */
			if (this.fixedRotation == -1) {
				let angle = curPath.angle - 90;
				let rotation = monster.rotation;

				let diff = angle - rotation;
				if (diff < -180) {
					angle += 360;
				} else if (diff > 180) {
					angle -= 360;
				}
				let speedRotation = (angle - rotation) / 10;
				monster.rotation = rotation + speedRotation;
			}
			else {
				monster.rotation = 0;
			}
		}
	}
}
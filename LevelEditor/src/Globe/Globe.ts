class Globe extends egret.DisplayObject {

	private static _instance: Globe = null;

	public actionObjectAry: any[] = [];

	public idleObjectAry: any[] = [];

	private _timerKey: number = -1;



	public static get instance(): Globe {
		if (this._instance == null) {
			this._instance = new Globe();
		}
		return this._instance;
	}

	public constructor() {
		super();
		this.addEventListener(egret.Event.ENTER_FRAME, this._onFrame, this);
	}

	private _delay(): void {
		MapEditor.instance.stopClick.visible = false;
		for (let i: number = 0; i < this.idleObjectAry.length; i++) {
			let target = this.idleObjectAry[i];
			if (target.runTarget instanceof eui.Image) {
			}
			else if (target.runTarget instanceof egret.MovieClip) {
				target.runTarget.stop()
			}
			else if (target.runTarget instanceof dragonBones.EgretArmatureDisplay) {
				target.runTarget.animation.stop();
			}
		}
		this.idleObjectAry.length = 0;

	}

	/**
	 * 开始
	 */
	public start(target: MonsterBtn | SceneInteractiveObject): void {
		this._timerKey = 1;
		MapEditor.instance.stopClick.visible = true;
		if (target.data.exportData.length == 1) {
			if (target instanceof MonsterBtn) {
				target.runTarget.animation.gotoAndPlayByFrame("Walk", MathUtil.random(0, 20), 0);
			}
			else {
				if (target.runTarget instanceof eui.Image) {
				}
				else if (target.runTarget instanceof egret.MovieClip) {
					target.runTarget.play(-1)
				}
				else if (target.runTarget instanceof dragonBones.EgretArmatureDisplay) {
					target.runTarget.animation.play(null, 0);
				}
			}
			target.runTarget.x = target.data.exportData[0].x;
			target.runTarget.y = target.data.exportData[0].y;
			this.idleObjectAry.push(target);
		}
		else {
			if (target instanceof MonsterBtn) {
				target.runTarget.animation.gotoAndPlayByFrame("Walk", MathUtil.random(0, 20), 0);

			}
			else {
				if (target.runTarget instanceof eui.Image) {

				}
				else if (target.runTarget instanceof egret.MovieClip) {
					target.runTarget.play(-1)
				}
				else if (target.runTarget instanceof dragonBones.EgretArmatureDisplay) {
					target.runTarget.animation.play(null, 0);
				}
			}

			if (target.data.isRamdomTurnRound) {
				target.coolingTimerKey = egret.setTimeout(() => {
					target.isCooling = false
				}, null, 2000);
				target.isCooling = true
			}


			target.curPathNode = target.data.exportData[0];
			target.nextPathNode = target.data.exportData[1];
			this.actionObjectAry.push(target);
			target.startTime = egret.getTimer();
		}
		MapEditor.instance.actionCanvas.addChild(target.runTarget);
	}



	private _onFrame(): void {
		if (this.actionObjectAry.length == 0) {
			if (this._timerKey != -1) {
				if (this.idleObjectAry.length) {
					this._timerKey = egret.setTimeout(this._delay, this, 1000);
					this._timerKey = -1
				}
				else {
					if (MapEditor.instance.state == 0) {
						MapEditor.instance.stopClick.visible = false;
					}
				}
			}
			return;
		}

		for (let i: number = 0; i < this.actionObjectAry.length; i++) {
			let target: MonsterBtn | SceneInteractiveObject = this.actionObjectAry[i];
			let time = egret.getTimer();
			let runTime = (time - target.startTime) / 1000;
			let curMoveDistance = runTime * target.speed + target.moveDistance;
			let runTarget = target.runTarget;
			let pathData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[];

			if (target.isInMirrorPath) {
				pathData = target.data.exportMirrorData;
			}
			else {
				pathData = target.data.exportData
			}
			let len = pathData.length;


			let lastPath = pathData[len - 1]
			let total = lastPath.distTotal
			// let transform = runTarget.armature.getBone("centre").global
			// target.colliderShape.x = transform.x;
			// target.colliderShape.y = transform.y;

			if (curMoveDistance >= total) {
				if (target.isInMirrorPath) {
					runTarget.x = target.data.exportData[0].x;
					runTarget.y = target.data.exportData[0].y;
					runTarget.scaleX = target.data.exportData[0].scaleX;
					this.actionObjectAry.remove(target);
					target.isInMirrorPath = false;
					target.moveDistance = 0;
					target.pathNodeIndex = 0;
					egret.clearTimeout(target.coolingTimerKey);
				}
				else {
					target.isInMirrorPath = true;
					target.curPathNode = target.data.exportMirrorData[0];
					target.nextPathNode = target.data.exportMirrorData[1];
					target.pathNodeIndex = 0;
					target.moveDistance = 0;
					target.startTime = egret.getTimer();
				}
				continue;
			}

			/**
			 * 随机回头
			 */
			if (target.data.isRamdomTurnRound) {
				if (!target.isCooling) {
					target.coolingTimerKey = egret.setTimeout(() => {
						target.isCooling = false
					}, null, 1000);
					target.isCooling = true;
					if (Math.random() > 0.5) {
						if (target.pathNodeIndex >= len - 1) {
							continue;
						}

						let index = len - target.pathNodeIndex - 1

						if (target.isInMirrorPath) {
							target.curPathNode = target.data.exportData[index-1];
							target.nextPathNode = target.data.exportData[index];
							target.moveDistance = total - curMoveDistance
							target.isInMirrorPath = false;
						}
						else {
							target.curPathNode = target.data.exportMirrorData[index-1];
							target.nextPathNode = target.data.exportMirrorData[index];
							target.moveDistance = total - curMoveDistance
							target.isInMirrorPath = true;
						}
						target.pathNodeIndex = index;
						// console.error("target.pathNodeIndex:" + target.pathNodeIndex, "len" + len)
						target.startTime = egret.getTimer();
						continue;
					}
				}
			}


			if (curMoveDistance > target.nextPathNode.distTotal) {
				for (let i: number = target.pathNodeIndex; i < len; i++) {
					/**
					 * 创建特效
					 */
					if (pathData[i].distNext == 0 && i != len - 1) {
						let mov = UIUtil.creatMovieClip("transmitBeam");
						mov.gotoAndPlay(1, 1);
						mov.x = pathData[i].x;
						mov.y = pathData[i].y - 50;

						MapEditor.instance.actionCanvas.addChild(mov);
						mov.once(egret.MovieClipEvent.COMPLETE, () => {
							MapEditor.instance.actionCanvas.removeChild(mov);
						}, null)

						let mov2 = UIUtil.creatMovieClip("transmitBeam");
						mov2.gotoAndPlay(1, 1);
						mov2.x = pathData[i + 1].x;
						mov2.y = pathData[i + 1].y;
						mov2.scaleY = -1;
						MapEditor.instance.actionCanvas.addChild(mov2);
						mov2.once(egret.MovieClipEvent.COMPLETE, () => {
							MapEditor.instance.actionCanvas.removeChild(mov2);
						}, null)
					}

					if (pathData[i].distTotal > curMoveDistance) {
						target.curPathNode = pathData[i - 1];
						target.pathNodeIndex = i;
						target.nextPathNode = pathData[i];
						break;
					}
				}
			}
			let curPath = target.curPathNode;
			let nextPath = target.nextPathNode;
			curPath = curPath == null ? lastPath : curPath;
			nextPath = nextPath == null ? lastPath : nextPath;


			let distNext = curPath.distNext;
			let offsetDist = curMoveDistance - curPath.distTotal;
			let offsetx = offsetDist / distNext * (nextPath.x - curPath.x);
			let offsety = offsetDist / distNext * (nextPath.y - curPath.y);

			runTarget.x = (curPath.x + offsetx);
			runTarget.y = (curPath.y + offsety);


			if (target.data.fixedRotation == -1) {
				let angle = curPath.angle - 90;
				let rotation = runTarget.rotation;
				let diff = angle - rotation;
				if (diff < -180) {
					angle += 360;
				} else if (diff > 180) {
					angle -= 360;
				}
				let speedRotation = (angle - rotation) / 10;
				runTarget.rotation = rotation + speedRotation;
			}
			else {
				runTarget.scaleX = curPath.scaleX;
				runTarget.rotation = 0;
			}
		}
	}
}
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
					MapEditor.instance.stopClick.visible = false;
				}
			}
			return;
		}

		for (let i: number = 0; i < this.actionObjectAry.length; i++) {
			let target: MonsterBtn | SceneInteractiveObject = this.actionObjectAry[i];
			let time = egret.getTimer();
			let runTime = (time - target.startTime) / 1000;
			let curMoveDistance = runTime * target.speed
			let lastPath = target.data.exportData[target.data.exportData.length - 1]
			let total = lastPath.distTotal
			let runTarget = target.runTarget;

			// let transform = runTarget.armature.getBone("centre").global
			// target.colliderShape.x = transform.x;
			// target.colliderShape.y = transform.y;

			if (curMoveDistance >= total) {
				target.pathNodeIndex = 0;
				runTarget.x = target.data.exportData[0].x;
				runTarget.y = target.data.exportData[0].y;
				runTarget.scaleX = target.data.exportData[0].scaleX;
				this.actionObjectAry.remove(target);
				break;
			}

			if (curMoveDistance > target.nextPathNode.distTotal) {
				let len = target.data.exportData.length;

				for (let i: number = target.pathNodeIndex; i < len; i++) {
					if (target.data.exportData[i].distTotal > curMoveDistance) {
						target.curPathNode = target.data.exportData[i - 1];
						target.pathNodeIndex = i;
						target.nextPathNode = target.data.exportData[i];
						break;
					}

				}
			}
			let curPath = target.curPathNode;
			let nextPath = target.nextPathNode;
			curPath = curPath == null ? lastPath : curPath;
			nextPath = nextPath == null ? lastPath : nextPath;


			// /*是否为跳跃路径*/
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
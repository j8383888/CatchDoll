class Globe extends egret.DisplayObject {

	private static _instance: Globe = null;

	public runMonsters: MonsterBtn[] = [];



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

	public start(monsterBtn: MonsterBtn): void {
		MapEditor.instance.stopClick.visible = true;
		monsterBtn.runDragonBones.animation.play("Walk", null);
		MapEditor.instance.pathCanvas.addChild(monsterBtn.runDragonBones);
		this.runMonsters.push(monsterBtn);

		monsterBtn.startTime = egret.getTimer();
		monsterBtn.curPathNode = monsterBtn.exportData[0];
		monsterBtn.nextPathNode = monsterBtn.exportData[1];


	}





	private _onFrame(): void {
		if (this.runMonsters.length == 0) {
			MapEditor.instance.stopClick.visible = false;
		}

		for (let i: number = 0; i < this.runMonsters.length; i++) {
			let monsterBtn = this.runMonsters[i];
			let time = egret.getTimer();
			let runTime = (time - monsterBtn.startTime) / 1000;
			let curMoveDistance = runTime * 200
			let lastPath = monsterBtn.exportData[monsterBtn.exportData.length - 1]
			let total = lastPath.distTotal
			let monster = monsterBtn.runDragonBones;

			let transform = monster.armature.getBone("centre").global

			monsterBtn.colliderShape.x = transform.x;
			monsterBtn.colliderShape.y = transform.y;

			if (curMoveDistance >= total) {

				monsterBtn.pathNodeIndex = 0;
				MapEditor.instance.pathCanvas.removeChild(monster);
				this.runMonsters.remove(monsterBtn);

			}

			if (curMoveDistance > monsterBtn.nextPathNode.distTotal) {
				let len = monsterBtn.exportData.length;
				for (let i: number = monsterBtn.pathNodeIndex; i < len; i++) {
					if (monsterBtn.exportData[i].distTotal > curMoveDistance) {
						monsterBtn.pathNodeIndex = i;
						monsterBtn.nextPathNode = monsterBtn.exportData[i];
						monsterBtn.curPathNode = monsterBtn.exportData[i - 1];
						break;
					}
				}
			}

			let curPath = monsterBtn.curPathNode;
			let nextPath = monsterBtn.nextPathNode;

			curPath = curPath == null ? lastPath : curPath;
			nextPath = nextPath == null ? lastPath : nextPath;

			let distNext = curPath.distNext;// GX.getDistanceByPoint({ x: curPath.x, y: curPath.y }, { x: nextPath.x, y: nextPath.y });
			let offsetDist = curMoveDistance - curPath.distTotal;
			let offsetx = offsetDist / distNext * (nextPath.x - curPath.x);
			let offsety = offsetDist / distNext * (nextPath.y - curPath.y);

			monster.x = (curPath.x + offsetx);
			monster.y = (curPath.y + offsety)

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
	}
}
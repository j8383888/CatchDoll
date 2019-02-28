module catchDoll {
	export class MonsterOperation extends BaseOperation {

		/**
		 * 宿主对象
		 */
		public _gameObj: Monster;
		/**
		 * 开始时间
		 */
		public startTime: number = -1;
		/**
		 * 路径节点序列
		 */
		public pathNodes: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[];

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

		public constructor() {
			super();
		}

		/**
	 	 * 注册
	 	 */
		public register(gameObj: catchDoll.GameObject): void {
			this._gameObj = gameObj as Monster;

			this.startTime = egret.getTimer();
			let monsterVars = gameObj.varsData as IMonsterVars
			this.fixedRotation = monsterVars.fixedRotation
			this.pathNodes = monsterVars.exportData;
			this.curPathNode = this.pathNodes[0];
			this.nextPathNode = this.pathNodes[1];
			if (this.pathNodes.length == 0) {
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
		}

		/**
		 * 帧循环
		 */
		public enterFrame(): void {
			let time = egret.getTimer();
			let runTime = (time - this.startTime) / 1000;
			let monster = this._gameObj as Monster;
			let curMoveDistance = runTime * monster.speed * 100
			let lastPath = this.pathNodes[this.pathNodes.length - 1]
			let total = lastPath.distTotal
			

			if (curMoveDistance >= total) {
				this.pathNodeIndex = 0;
				this.curPathNode = this.pathNodes[0];
				this.nextPathNode = this.pathNodes[1];
				this.startTime = egret.getTimer();
				// GameObjectFactory.instance.recoverGameObject(monster);
				return;
			}
			let transform = monster.dragonBones.armature.getBone("centre").global

			monster.haemalGroup.x = transform.x;
			monster.haemalGroup.y = transform.y;


			if (curMoveDistance > this.nextPathNode.distTotal) {
				let len = this.pathNodes.length;
				for (let i: number = this.pathNodeIndex; i < len; i++) {
					if (this.pathNodes[i].distTotal > curMoveDistance) {
						this.pathNodeIndex = i;
						this.nextPathNode = this.pathNodes[i];
						this.curPathNode = this.pathNodes[i - 1];
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
			monster.y = (curPath.y + offsety);
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
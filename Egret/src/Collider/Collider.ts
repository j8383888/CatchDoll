/**
 * 碰撞器
 * @author suo
 */
module catchDoll {
	export class Collider extends egret.DisplayObject implements catchDoll.ICollider {

		/**
		 * Y坐标
		 */
		public posX: number;
		/**
		 * X坐标
		 */
		public posY: number
		/**
		 * 碰撞半径
		 */
		public radius: number;
		/**
		 * 全局坐标
		 */
		public globePosPoint: egret.Point;

		/**
		 * 复用点
		 */
		public static multiplexPoint: egret.Point[] = [new egret.Point(), new egret.Point()];

		public isShow: boolean = true;

		public constructor(executant?: ColliderExecutant) {
			super();
			if (!executant) {
				console.assert(false, "请使用Collider.creat方法创建Collider对象！")
			}
		}

		/**
		 * 建议使用此方法创建一个Collider
		 */
		public static creat(x: number, y: number, radius: number): Collider {
			let collider: Collider = Pool.getItemByCreateFun("collider", Handler.create(this, () => {
				return new Collider(new ColliderExecutant())
			}, null, true));
			collider.setTo(x, y, radius);
			return collider;
		}

		/**
		 * 设值
		 */
		public setTo(x: number, y: number, radius: number) {
			this.radius = radius;
			this.x = x;
			this.y = y;
			this.posX = x;
			this.posY = y;
			// if (this.isShow) {
			// 	this.graphics.beginFill(ColorUtil.COLOR_GREEN, 0.5)
			// 	this.graphics.drawCircle(0, 0, radius);
			// 	this.graphics.endFill();
			// }
		}

		/**
		 * 设坐标
		 */
		public setToXY(x: number, y: number): void {
			this.x = x;
			this.y = y;
			this.posX = x;
			this.posY = y;
		}

		/**
		 * 设值父物体
		 */
		public setParent(value: egret.DisplayObjectContainer) {
			value.addChild(this);
		}

		/**
		 * 清除
		 */
		public clear(): void {
			// this.graphics.clear();
			this.posX = NaN;
			this.posY = NaN;
			this.radius = NaN;
		}

		/**
		 * 设置全局坐标
		 */
		public setGlobePos(): void {
			let p: egret.Point = this.localToGlobal(0, 0, this.globePosPoint);
			this.globePosPoint = p;
		}

		/**
		 * 是否相交
		 */
		public static isIntersect(c1: Collider, c2: Collider): boolean {
			let p1: egret.Point = c1.globePosPoint;
			let p2: egret.Point = c2.globePosPoint;

			let disx = p1.x - p2.x;
			let disy = p1.y - p2.y;
			let dist = c1.radius + c2.radius;
			if (disx > dist || disx < -dist || disy > dist || disy < -dist) {
				return false;
			}

			let disSquare = disx * disx + disy * disy;

			if (disSquare < (dist * dist)) {
				return true;
			}
			else {
				return false;
			}
		}

		/**
		 * 释放
		 */
		public recover(): void {
			this.clear();
			this.globePosPoint = null;
			Pool.recover("collider", this);
		}
	}
}

class ColliderExecutant {
}
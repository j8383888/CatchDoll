class PathLine extends egret.Shape {

	public startP: PathPoint;
	public endP: PathPoint;


	public constructor() {
		super();

	}

	/**
	 * 设置数据
	 */
	public setData(startP: PathPoint, endP: PathPoint): void {
		this.startP = startP;
		this.endP = endP;
		this.drawBezierLine()
		// this.touchEnabled = true;
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this)
	}

	/**
	 * 点击
	 */
	// private _onClick(e: egret.TouchEvent): void {
	// 	let lastPoint = PathEditor.instance.lastPoint
	// 	lastPoint.showCtrlOp(false)
	// 	let p = MapEditor.instance.pathCanvas.globalToLocal(e.stageX, e.stageY)
	// 	let point = PathEditor.instance.creatPoint(p);
	// 	point.showCtrlOp(true);
	// 	PathEditor.instance.lastPoint = point;
	// }

	/**
	 * 三次贝塞尔曲线
	 */
	public drawBezierLine(): void {
		let startP = this.startP;
		let endP = this.endP;
		let ctrl1P = startP.nextAnchor;
		let ctrl2P = endP.beforeAnchor;

		this.graphics.clear();
		this.graphics.lineStyle(2, ColorUtil.COLOR_MAPLE);
		this.graphics.moveTo(startP.x, startP.y);
		this.graphics.cubicCurveTo(ctrl1P.x, ctrl1P.y, ctrl2P.x, ctrl2P.y, endP.x, endP.y);

		this.graphics.lineStyle(20, ColorUtil.COLOR_GOLD, 0.1);
		this.graphics.moveTo(startP.x, startP.y);
		this.graphics.cubicCurveTo(ctrl1P.x, ctrl1P.y, ctrl2P.x, ctrl2P.y, endP.x, endP.y);
	}

}
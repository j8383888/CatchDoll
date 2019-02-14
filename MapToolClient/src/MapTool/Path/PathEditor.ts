class PathEditor {

	private static _instance: PathEditor = null;

	private _mapEditor: MapEditor;

	public static readonly EXPORT_LINE_INTERVAL_DISTANCE: number = 10

	private lastPoint: PathPoint;
	public constructor() {
		this._init();
	}

	public static get instance(): PathEditor {
		if (this._instance == null) {
			this._instance = new PathEditor();
		}
		return this._instance;
	}

	public _init(): void {
		this._mapEditor = MapEditor.instance
		MapEditor.instance.editorPathBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._editorPath, this)
	}

	private _editorPath(): void {
		GlobeConst.isEditPath = !GlobeConst.isEditPath;
		let sceneGroup = MapEditor.instance.sceneGroup;
		if (GlobeConst.isEditPath) {
			let startP = { x: 0, y: 0 };
			let crtl1P = { x: 20, y: 20 };
			let crtl2P = { x: 0, y: 600 };
			let endP = { x: 500, y: 500 };
			let line = this.newBezierLine(startP, crtl1P, crtl2P, endP)
			this._mapEditor.pathCanvas.addChild(line);
			let result = this.getExportPaths(startP, crtl1P, crtl2P, endP);
			this._test(result);

			sceneGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
		}
		else {
			sceneGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
		}
	}

	private _test(data: { x: number, y: number }[]): void {
		let shape = new egret.Shape();

		for (let i: number = 0; i < data.length; i++) {
			shape.graphics.beginFill(ColorUtil.COLOR_GREEN);
			shape.graphics.drawCircle(data[i].x, data[i].y, 10);
			shape.graphics.endFill();
		}
		this._mapEditor.pathCanvas.addChild(shape);
		// shape.graphics.drawCircle()
	}

	/**
	 * 三次贝塞尔曲线
	 */
	protected newBezierLine(startP, ctrl1P, ctrl2P, endP, color: number = 0xff0000, lineBold: number = 2): egret.Shape {
		let line: egret.Shape = new egret.Shape();
		line.graphics.lineStyle(lineBold, color);
		line.graphics.moveTo(startP.x, startP.y);
		line.graphics.cubicCurveTo(ctrl1P.x, ctrl1P.y, ctrl2P.x, ctrl2P.y, endP.x, endP.y);
		line.x = 0;
		line.y = 0;
		// line.alpha = 0.5;
		return line;
	}

	public getExportPaths(fromP, ctrl1P, ctrl2P, EndP): Array<{ x, y }> {
		// if (this.lastCtrlPoint == null) {
		// 	return [{ x: this.x, y: this.y }];
		// }
		egret.log("call ControlPoint, getExportPath");
		let lastPos = new egret.Point(fromP.x, fromP.y);
		let nextPos = new egret.Point(EndP.x, EndP.y);
		let nCount = Math.floor(lastPos.subtract(nextPos).length / PathEditor.EXPORT_LINE_INTERVAL_DISTANCE);
		if (nCount > 10) {
			nCount = 10;
		}
		let result: Array<{ x, y }> = [];
		for (let i: number = 1; i <= nCount; i++) {
			let t: number = i / nCount;
			let px: number = (1 - t) * (1 - t) * (1 - t) * lastPos.x + 3 * (1 - t) * (1 - t) * t * ctrl1P.x + 3 * (1 - t) * t * t * ctrl2P.x + t * t * t * nextPos.x;
			let py: number = (1 - t) * (1 - t) * (1 - t) * lastPos.y + 3 * (1 - t) * (1 - t) * t * ctrl1P.y + 3 * (1 - t) * t * t * ctrl2P.y + t * t * t * nextPos.y;
			result.push({ x: parseFloat(px.toFixed(2)), y: parseFloat(py.toFixed(2)) });
		}
		egret.log(" result:" + JSON.stringify(result));
		return result;
	}

	/**
	 * 按下
	 */
	private _onDown(e: egret.TouchEvent): void {
		if (this.lastPoint) {
			let old = this.lastPoint;
			
			let p = this._mapEditor.globalToLocal(e.stageX, e.stageY)
			this.lastPoint = this.drawPoint(p.x, p.y);
		}
	}

	/**
	 * 画点
	 */
	private drawPoint(x: number, y: number): PathPoint {
		let point = new PathPoint();
		point.x = x;
		point.y = y;
		return point
	}
}
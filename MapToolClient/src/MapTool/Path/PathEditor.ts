class PathEditor {

	private static _instance: PathEditor = null;

	private _mapEditor: MapEditor;

	public static readonly EXPORT_LINE_INTERVAL_DISTANCE: number = 10
	/**
	 * 上一个点
	 */
	public finalPoint: PathPoint;
	/**
	 * 上一条线
	 */
	public finalLine: PathLine;
	/**
	 * 上一次操作的点
	 */
	public lastPoint: PathPoint
	/**
	 * 路径点
	 */
	public pathPoints: PathPoint[] = [];


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
		this._mapEditor = MapEditor.instance;
		MapEditor.instance.editorPathBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._editorPath, this)
		let pathEditArea = this._mapEditor.pathEditArea;
		pathEditArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
		this._editorPath();
	}

	private _editorPath(): void {

		if (this._mapEditor.editorPathBtn.selected) {

			// let startP = { x: 0, y: 0 };
			// let crtl1P = { x: 0, y: 0 };
			// let crtl2P = { x: 0, y: 0 };
			// let endP = { x: 500, y: 500 };
			// let line = this.newBezierLine(startP, crtl1P, crtl2P, endP)
			// this._mapEditor.pathCanvas.addChild(line);
			// let result = this.getExportPaths(startP, crtl1P, crtl2P, endP);
			// this._test(result);
			this._mapEditor.deletPathNode.visible = true;

			this._mapEditor.sceneCanvas.touchEnabled = false;
			this._mapEditor.sceneCanvas.touchChildren = false;
			this._mapEditor.pathEditArea.touchEnabled = true;
			this._mapEditor.pathEditArea.touchChildren = true;
			this._mapEditor.pathCanvas.touchChildren = true;

		}
		else {
			this._mapEditor.sceneCanvas.touchEnabled = true;
			this._mapEditor.sceneCanvas.touchChildren = true;
			this._mapEditor.pathEditArea.touchEnabled = false;
			this._mapEditor.pathEditArea.touchChildren = false;
			this._mapEditor.pathCanvas.touchChildren = false;
			this._mapEditor.deletPathNode.visible = false;
			this._mapEditor.deletPathNode.selected = false;
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

	// /**
	//  * 三次贝塞尔曲线
	//  */
	// protected newBezierLine(startP, ctrl1P, ctrl2P, endP, color: number = 0xff0000, lineBold: number = 2): egret.Shape {
	// 	let line: egret.Shape = new egret.Shape();
	// 	line.graphics.lineStyle(lineBold, color);
	// 	line.graphics.moveTo(startP.x, startP.y);
	// 	line.graphics.cubicCurveTo(ctrl1P.x, ctrl1P.y, ctrl2P.x, ctrl2P.y, endP.x, endP.y);
	// 	line.x = 0;
	// 	line.y = 0;
	// 	// line.alpha = 0.5;
	// 	return line;
	// }

	public getExportPaths(startP, ctrl1P, ctrl2P, EndP): Array<{ x, y }> {
		let lastPos = new egret.Point(startP.x, startP.y);
		let nextPos = new egret.Point(EndP.x, EndP.y);
		let nCount = Math.floor(lastPos.subtract(nextPos).length / PathEditor.EXPORT_LINE_INTERVAL_DISTANCE);
		if (nCount > 20) {
			nCount = 20;
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
		if (this._mapEditor.deletPathNode.selected) {
			return;
		}
		if (this._mapEditor.curChapter && this._mapEditor.curLevel && this._mapEditor.curMonsterBtn) {

			if (this.finalPoint) {
				/*隐藏控制线*/
				this.lastPoint.showCtrlOp(false)
				let p = this._mapEditor.pathCanvas.globalToLocal(e.stageX, e.stageY)

				let newPoint = this.creatPoint(p);
				newPoint.showCtrlOp(true);

				let line = this.creatLine(this.finalPoint, newPoint)
				newPoint.setFromLine(line);
				this.finalLine = line;
				this.finalPoint.setBackLine(this.finalLine);
				this.finalPoint = newPoint;
				this.lastPoint = this.finalPoint
			}
			else {
				let p = this._mapEditor.pathCanvas.globalToLocal(e.stageX, e.stageY)
				this.finalPoint = this.creatPoint(p);

				this.lastPoint = this.finalPoint
				this.finalPoint.showCtrlOp(true);
			}
			this.pathPoints.push(this.finalPoint)
		}
		else {
			SystemTipsUtil.showTips("请先选中关卡和章节和怪物！", ColorUtil.COLOR_RED)
		}
	}

	public drawPath(pathNodes: {
		origin: { x, y },
		ctrlP1: { x, y },
		ctrlP2: { x, y },
		beforeAnchor: { x, y },
		nextAnchor: { x, y },
	}[]): void {

		for (let item of pathNodes) {
			if (this.finalPoint) {
				let newPoint = this.creatPoint(new egret.Point(item.origin.x, item.origin.y));
				newPoint.setCtrlOp(item.ctrlP1, item.ctrlP2);
				newPoint.setAnchor(new egret.Point(item.beforeAnchor.x, item.beforeAnchor.y), new egret.Point(item.nextAnchor.x, item.nextAnchor.y))
				let line = this.creatLine(this.finalPoint, newPoint)
				newPoint.setFromLine(line);
				this.finalLine = line;
				this.finalPoint.setBackLine(this.finalLine);
				this.finalPoint = newPoint;
				this.lastPoint = this.finalPoint
			}
			else {
				this.finalPoint = this.creatPoint(new egret.Point(item.origin.x, item.origin.y));
				this.lastPoint = this.finalPoint
			}
			this.pathPoints.push(this.finalPoint)
		}
		if (this.finalPoint) {
			this.finalPoint.showCtrlOp(true);
		}
	}

	/**
	 * 保存路径数据
	 */
	public savePath(): void {

		let pathDataAry: {
			origin: { x, y },
			ctrlP1: { x, y },
			ctrlP2: { x, y },
			beforeAnchor: { x, y },
			nextAnchor: { x, y },
		}[] = MapEditor.instance.curMonsterBtn.data.pathData;
		pathDataAry.length = 0;
		let len = this.pathPoints.length;
		for (let i: number = 0; i < len; i++) {
			let pathNode = this.pathPoints[i]
			let data = {
				origin: { x: pathNode.x, y: pathNode.y },
				ctrlP1: { x: pathNode.ctrl1Shape.x, y: pathNode.ctrl1Shape.y },
				ctrlP2: { x: pathNode.ctrl2Shape.x, y: pathNode.ctrl2Shape.y },
				beforeAnchor: { x: pathNode.beforeAnchor.x, y: pathNode.beforeAnchor.y },
				nextAnchor: { x: pathNode.nextAnchor.x, y: pathNode.nextAnchor.y },
			}
			pathDataAry.push(data);
		}
	}

	/**
	 * 画点
	 */
	public creatPoint(p: egret.Point): PathPoint {
		let point = new PathPoint();
		point.setData(p);
		this._mapEditor.pathPoint.addChild(point);
		return point
	}

	/**
	 * 划线
	 */
	public creatLine(startP: PathPoint, endP: PathPoint): PathLine {
		let line = new PathLine();
		line.setData(startP, endP)
		this._mapEditor.pathLine.addChild(line);
		return line
	}
}
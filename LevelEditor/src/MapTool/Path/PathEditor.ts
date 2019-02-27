class PathEditor {

	private static _instance: PathEditor = null;

	private _mapEditor: MapEditor;

	public static readonly EXPORT_LINE_INTERVAL_DISTANCE: number = 40
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
		MapEditor.instance.editorPathBtn.addEventListener(egret.TouchEvent.CHANGE, this._editorPath, this)
		let pathEditArea = this._mapEditor.pathEditArea;
		pathEditArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
		this._mapEditor.aniTestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAnimtionTest, this)

		this._editorPath();
		document.addEventListener("keydown", this._onKeyDown);
		document.addEventListener("keyup", this._onKeyUp);
	}

	private _onKeyUp(e: KeyboardEvent): void {
		if (e.key == 'a') {
			for (let item of PathEditor.instance.pathPoints) {
				item.ctrl1Shape.touchEnabled = true;
				item.ctrl2Shape.touchEnabled = true;
			}
		}
	}

	private _onKeyDown(e: KeyboardEvent): void {
		if (e.key == 'a') {
			for (let item of PathEditor.instance.pathPoints) {
				item.ctrl1Shape.touchEnabled = false;
				item.ctrl2Shape.touchEnabled = false;
			}
		}
		else if (e.key == 's') {
			if (MapEditor.instance.editorPathBtn.selected) {
				if (PathEditor.instance.pathPoints.length > 1) {
					let node = PathEditor.instance.pathPoints[0];
					PathEditor.instance._addPathNode(new egret.Point(node.x, node.y))
				}
			}
		}
		else if (e.key == 'd') {
			MapEditor.instance.editorPathBtn.selected = !MapEditor.instance.editorPathBtn.selected;
			PathEditor.instance._editorPath();
		}
	}




	/**
	 * 动画测试
	 */
	private _onAnimtionTest(): void {
		if (this._mapEditor.curChapter && this._mapEditor.curLevel && this._mapEditor.curMonsterBtn) {
			let monsterBtn = this._mapEditor.curMonsterBtn
			let exportData = monsterBtn.data.exportData;
			if (exportData.length == 0) {
				SystemTipsUtil.showTips("请先保存怪物路径数据！", ColorUtil.COLOR_RED)
				return;
			}
			Globe.instance.start(monsterBtn);
		}
		else {
			SystemTipsUtil.showTips("请先选中关卡和章节和怪物！", ColorUtil.COLOR_RED)
		}
	}

	/**
	 * 编辑路径
	 */
	private _editorPath(): void {
		if (this._mapEditor.editorPathBtn.selected) {
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

	private _drawTest(data: { x: number, y: number }[]): void {
		let shape = new egret.Shape();

		for (let i: number = 0; i < data.length; i++) {
			shape.graphics.beginFill(ColorUtil.COLOR_GREEN);
			shape.graphics.drawCircle(data[i].x, data[i].y, 10);
			shape.graphics.endFill();
		}
		this._mapEditor.pathCanvas.addChild(shape);

	}

	/**
	 * 格式化导出数据
	 */
	private _formatExprotResult(monsterBtn: MonsterBtn, data: { x: number, y: number }[], ): void {
		let len: number = data.length
		let angle = 0;
		let distNext = 0;
		let distTotal = 0;
		let distTotalParse = 0;
		let isMirror: boolean = monsterBtn.data.pathMirror;
		let result: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[] = []

		for (let i: number = 0; i < len; i++) {
			let item: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }
			let pathNode = data[i];
			distTotalParse = Number(distTotal.toFixed(2));
			if (i == len - 1) {
				if (isMirror) {

				}
				else {
					item = { x: pathNode.x, y: pathNode.y, angle: 0, distNext: 0, distTotal: distTotalParse, scaleX: 1 }
					result.push(item);
				}
			}
			else {
				/**
				 * @param angle：下个点构成的角度
				 * @param distNext 距下个点的距离
				 * @param distTotal 与起始点的距离
				 */
				let nextPathNode = data[i + 1];
				distNext = Number(UIUtil.getDistanceByPoint(pathNode, nextPathNode).toFixed(2));

				angle = UIUtil.getRadianByPoint(pathNode, nextPathNode)
				item = { x: pathNode.x, y: pathNode.y, angle: angle, distNext: distNext, distTotal: distTotalParse, scaleX: 1 }
				result.push(item);
				distTotal += distNext;
			}
		}

		if (isMirror) {
			data = data.reverse();
			for (let i: number = 0; i < len; i++) {
				let item: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }
				let pathNode = data[i];
				distTotalParse = Number(distTotal.toFixed(2));
				if (i == len - 1) {
					item = { x: pathNode.x, y: pathNode.y, angle: 0, distNext: 0, distTotal: distTotalParse, scaleX: -1 }
					result.push(item);
				}
				else {
					/**
					 * @param angle：下个点构成的角度
					 * @param distNext 距下个点的距离
					 * @param distTotal 与起始点的距离
					 */
					let nextPathNode = data[i + 1];
					distNext = Number(UIUtil.getDistanceByPoint(pathNode, nextPathNode).toFixed(2));
					angle = UIUtil.getRadianByPoint(pathNode, nextPathNode) + 180;
					item = { x: pathNode.x, y: pathNode.y, angle: angle, distNext: distNext, distTotal: distTotalParse, scaleX: -1 }
					result.push(item);
					distTotal += distNext;
				}
			}

		}
		monsterBtn.data.exportData = result;
	}


	/**
	 * 导出路径
	 */
	public getExportPaths(pathNode: {
		origin: { x, y },
		ctrlP1: { x, y },
		ctrlP2: { x, y },
		beforeAnchor: { x, y },
		nextAnchor: { x, y },
	}[]): Array<{ x, y }> {

		let startNode;
		let endNode;
		let len = pathNode.length;
		let result: Array<{ x, y }> = [];
		for (let i: number = 0; i < len; i++) {
			if (i == len - 1) {
				result.push({ x: pathNode[i].origin.x, y: pathNode[i].origin.y })
			}
			else {
				startNode = pathNode[i];
				endNode = pathNode[i + 1];

				let start = startNode.origin;
				let end = endNode.origin;
				let ctrl1P = startNode.nextAnchor;
				let ctrl2P = endNode.beforeAnchor;

				let lastPos = new egret.Point(start.x, start.y);
				let nextPos = new egret.Point(end.x, end.y);
				let nCount = Math.floor(lastPos.subtract(nextPos).length / PathEditor.EXPORT_LINE_INTERVAL_DISTANCE);
				if (nCount > 10) {
					nCount = 10;
				}

				for (let j: number = 0; j < nCount; j++) {
					let t: number = j / nCount;
					let px: number = (1 - t) * (1 - t) * (1 - t) * lastPos.x + 3 * (1 - t) * (1 - t) * t * ctrl1P.x + 3 * (1 - t) * t * t * ctrl2P.x + t * t * t * nextPos.x;
					let py: number = (1 - t) * (1 - t) * (1 - t) * lastPos.y + 3 * (1 - t) * (1 - t) * t * ctrl1P.y + 3 * (1 - t) * t * t * ctrl2P.y + t * t * t * nextPos.y;
					result.push({ x: parseFloat(px.toFixed(2)), y: parseFloat(py.toFixed(2)) });
				}
			}
		}
		// this._drawTest(result);
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

			let p = this._mapEditor.pathCanvas.globalToLocal(e.stageX, e.stageY)
			this._addPathNode(p);
		}
		else {
			SystemTipsUtil.showTips("请先选中关卡和章节和怪物！", ColorUtil.COLOR_RED)
		}
	}

	/**
	 * 添加路径点
	 */
	private _addPathNode(p: egret.Point): void {
		if (this.finalPoint) {
			/*隐藏控制线*/
			this.lastPoint.showCtrlOp(false)
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
			this.finalPoint = this.creatPoint(p);

			this.lastPoint = this.finalPoint
			this.finalPoint.showCtrlOp(true);
		}
		this.pathPoints.push(this.finalPoint)
	}

	public drawPath(pathNodes: {
		origin: { x, y },
		ctrlP1: { x, y },
		ctrlP2: { x, y },
		beforeAnchor: { x, y },
		nextAnchor: { x, y },
	}[]): void {

		PathEditor.instance.pathPoints.length = 0;
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
		if (MapEditor.instance.pathMirror.selected) {
			MapEditor.instance.curMonsterBtn.data.pathMirror = true;
		}
		else {
			MapEditor.instance.curMonsterBtn.data.pathMirror = false;
		}
		if (this._mapEditor.fixedRotation.selected) {
			MapEditor.instance.curMonsterBtn.data.fixedRotation = 0;
		}
		else {
			MapEditor.instance.curMonsterBtn.data.fixedRotation = -1;
		}

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

		let exportData: { x, y }[] = this.getExportPaths(pathDataAry);
		this._formatExprotResult(MapEditor.instance.curMonsterBtn, exportData);
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
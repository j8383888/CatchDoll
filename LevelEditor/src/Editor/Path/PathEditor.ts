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
		// MapEditor.instance.delSenceImgBtn.addEventListener(egret.TouchEvent.CHANGE, this._onDelSceneChange, this)
		let pathEditArea = this._mapEditor.pathEditArea;
		pathEditArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
		this._mapEditor.aniTestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAnimtionTest, this)
		this._mapEditor.levelTestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onLevelTest, this)
		this._editorPath();
		document.addEventListener("keydown", this._onKeyDown);
		document.addEventListener("keyup", this._onKeyUp);
	}

	private _onDelSceneChange(): void {
		if (MapEditor.instance.delSenceImgBtn.selected) {
			MapEditor.instance.editorPathBtn.selected = false;
		}
	}

	/**
	 * level演示
	 */
	private _onLevelTest(): void {
		if (this._mapEditor.curChapter && this._mapEditor.curLevel) {
			let len = MapEditor.instance.monsterShowBox.numChildren
			let len2 = MapEditor.instance.interactiveShowBox.numChildren
			for (let i: number = 0; i < len; i++) {
				let target: MonsterBtn = MapEditor.instance.monsterShowBox.getChildAt(i) as MonsterBtn;
				let exportData = target.data.exportData;
				if (exportData.length == 0) {
					SystemTipsUtil.showTips("有怪物无路径数据 请检查", ColorUtil.COLOR_RED)
					return;
				}
			}
			for (let i: number = 0; i < len2; i++) {
				let target: SceneInteractiveObject = MapEditor.instance.interactiveShowBox.getChildAt(i) as SceneInteractiveObject;
				let exportData = target.data.exportData;
				if (exportData.length == 0) {
					SystemTipsUtil.showTips("有场景交互对象无路径数据 请检查", ColorUtil.COLOR_RED)
					return;
				}
			}

			for (let i: number = 0; i < len; i++) {
				let target: MonsterBtn = MapEditor.instance.monsterShowBox.getChildAt(i) as MonsterBtn;
				Globe.instance.start(target);
			}
			for (let i: number = 0; i < len2; i++) {
				let target: SceneInteractiveObject = MapEditor.instance.interactiveShowBox.getChildAt(i) as SceneInteractiveObject;
				Globe.instance.start(target);
			}

		}
		else {
			SystemTipsUtil.showTips("请先选中关卡和章节！", ColorUtil.COLOR_RED)
		}
	}

	private _onKeyUp(e: KeyboardEvent): void {
		if (e.key == 's') {
			for (let item of PathEditor.instance.pathPoints) {
				item.ctrl1Shape.touchEnabled = true;
				item.ctrl2Shape.touchEnabled = true;
			}
			MapEditor.instance.movePathPoint.selected = false;
		}
		else if (e.key == 'r') {
			GlobeConst.isEditScene = true;
		}
		else if (e.key == 'x') {
			MapEditor.instance.horGuy.selected = false
		}
		else if (e.key == 'c') {
			MapEditor.instance.verGuy.selected = false
		}
		else if (e.key == 'f') {
			MapEditor.instance.isJumpPathPoint.selected = false;
		}
		else if (e.key == 'd') {
			MapEditor.instance.deletPathNode.selected = false;
		}
		else if (e.key == 'e') {
			MapEditor.instance.delSenceImgBtn.selected = false;
		}
	}

	private _onKeyDown(e: KeyboardEvent): void {
		if (e.key == 's') {
			for (let item of PathEditor.instance.pathPoints) {
				item.ctrl1Shape.touchEnabled = false;
				item.ctrl2Shape.touchEnabled = false;
			}
			MapEditor.instance.movePathPoint.selected = true;
		}
		else if (e.key == 'z') {
			if (MapEditor.instance.editorPathBtn.selected) {
				if (PathEditor.instance.pathPoints.length > 1) {
					let node = PathEditor.instance.pathPoints[0];
					PathEditor.instance._addPathNode(new egret.Point(node.x, node.y))
				}
			}
		}
		else if (e.key == 'q') {
			MapEditor.instance.editSceneOrnaBtn.selected = !MapEditor.instance.editSceneOrnaBtn.selected
			MapEditor.instance.sceneCanvas.touchChildren = MapEditor.instance.editSceneOrnaBtn.selected;
		}
		else if (e.key == 'a') {
			MapEditor.instance.editorPathBtn.selected = !MapEditor.instance.editorPathBtn.selected;
			PathEditor.instance._editorPath();
		}
		else if (e.key == 'r') {
			GlobeConst.isEditScene = false;
		}
		else if (e.key == 'e') {
			MapEditor.instance.delSenceImgBtn.selected = true;
		}
		else if (e.key == 'x') {
			MapEditor.instance.horGuy.selected = true;
		}
		else if (e.key == 'c') {
			MapEditor.instance.verGuy.selected = true;
		}
		else if (e.key == 'f') {
			MapEditor.instance.isJumpPathPoint.selected = true;
		}
		else if (e.key == 'd') {
			MapEditor.instance.deletPathNode.selected = true;
		}

		else if (MapEditor.instance.editorPathBtn.selected) {
			if (PathEditor.instance.lastPoint) {
				if (e.key == 'ArrowDown') {
					PathEditor.instance.lastPoint.y += 1;
					PathEditor.instance.lastPoint.updateBezierLine();
				}
				else if (e.key == 'ArrowUp') {
					PathEditor.instance.lastPoint.y -= 1;
					PathEditor.instance.lastPoint.updateBezierLine();
				}
				else if (e.key == 'ArrowLeft') {
					PathEditor.instance.lastPoint.x -= 1;
					PathEditor.instance.lastPoint.updateBezierLine();
				}
				else if (e.key == 'ArrowRight') {
					PathEditor.instance.lastPoint.x += 1;
					PathEditor.instance.lastPoint.updateBezierLine();
				}
			}
		}
		console.log(e.key);

	}






	/**
	 * 动画测试
	 */
	private _onAnimtionTest(): void {
		if (this._mapEditor.curChapter && this._mapEditor.curLevel && this._mapEditor.curEditPathObject) {
			let target = this._mapEditor.curEditPathObject
			let exportData = target.data.exportData;
			if (exportData.length == 0) {
				SystemTipsUtil.showTips("当前路径数据为空 请检查！", ColorUtil.COLOR_RED)
			}
			else {
				Globe.instance.start(target);
			}
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
	private _formatExprotResult(target: MonsterBtn | SceneInteractiveObject, data: { x: number, y: number, isJumpToNextP: boolean }[]): void {
		let len: number = data.length
		let angle = 0;
		let distNext = 0;
		let distTotal = 0;
		let distTotalParse = 0;
		let mirrorRollOver = 0;
		let isMirror: boolean = target.data.pathMirror;
		if (isMirror) {
			/**
			 * 镜像路径下 交互对象不翻转
			 */
			if (target instanceof SceneInteractiveObject) {
				mirrorRollOver = 1
			}
			else {
				mirrorRollOver = -1
			}
		}
		let isObjectMirror = target.data.objectMirror;
		let result: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[] = [];

		let objectMirrorOdds: number = 1
		if (isObjectMirror) {
			objectMirrorOdds = -1
		}
		else {
			objectMirrorOdds = 1
		}
		for (let i: number = 0; i < len; i++) {
			let item: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }
			let pathNode = data[i];
			distTotalParse = Number(distTotal.toFixed(2));
			if (i == len - 1) {
				if (isMirror) {

				}
				else {
					item = { x: pathNode.x, y: pathNode.y, angle: 0, distNext: 0, distTotal: distTotalParse, scaleX: 1 * objectMirrorOdds }
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
				if (pathNode.isJumpToNextP) {
					distNext = 0;
				}
				else {
					distNext = Number(UIUtil.getDistanceByPoint(pathNode, nextPathNode).toFixed(2));
				}
				angle = UIUtil.getRadianByPoint(pathNode, nextPathNode)

				if (isObjectMirror) {
					angle += 180;
				}
				item = { x: pathNode.x, y: pathNode.y, angle: angle, distNext: distNext, distTotal: distTotalParse, scaleX: 1 * objectMirrorOdds }
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
					item = { x: pathNode.x, y: pathNode.y, angle: 0, distNext: 0, distTotal: distTotalParse, scaleX: mirrorRollOver * objectMirrorOdds }
					result.push(item);
				}
				else {

					/**
					 * @param angle：下个点构成的角度
					 * @param distNext 距下个点的距离
					 * @param distTotal 与起始点的距离
					 */
					let nextPathNode = data[i + 1];
					/*是否跳跃路径*/
					if (nextPathNode.isJumpToNextP) {
						distNext = 0;
					}
					else {
						distNext = Number(UIUtil.getDistanceByPoint(pathNode, nextPathNode).toFixed(2));
					}
					angle = UIUtil.getRadianByPoint(pathNode, nextPathNode) + 180;
					if (isObjectMirror) {
						angle += 180;
					}
					item = { x: pathNode.x, y: pathNode.y, angle: angle, distNext: distNext, distTotal: distTotalParse, scaleX: mirrorRollOver * objectMirrorOdds }
					result.push(item);
					distTotal += distNext;
				}
			}

		}
		target.data.exportData = result;
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
		isJumpToNextP: boolean
	}[]): Array<{ x, y, isJumpToNextP }> {

		let startNode;
		let endNode;
		let len = pathNode.length;
		let result: Array<{ x, y, isJumpToNextP }> = [];
		for (let i: number = 0; i < len; i++) {
			if (i == len - 1) {
				result.push({ x: pathNode[i].origin.x, y: pathNode[i].origin.y, isJumpToNextP: false })
			}
			else {
				startNode = pathNode[i];
				endNode = pathNode[i + 1];

				let start = startNode.origin;
				let end = endNode.origin;
				let ctrl1P = startNode.nextAnchor;
				let ctrl2P = endNode.beforeAnchor;


				if (startNode.isJumpToNextP) {
					result.push({ x: start.x, y: start.y, isJumpToNextP: true });
				}
				else {
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
						result.push({ x: parseFloat(px.toFixed(2)), y: parseFloat(py.toFixed(2)), isJumpToNextP: false });
					}
				}

			}
		}
		let len2: number = result.length;
		let copy = result.slice();
		for (let i: number = 0; i < len2 - 1; i++) {
			let a = result[i];
			let b = result[i + 1];
			if (a.x == b.x && a.y == b.y) {
				if (a.isJumpToNextP || b.isJumpToNextP) {
					a.isJumpToNextP = true;
				}
				copy.remove(b)
			}
		}

		// this._drawTest(result);
		return copy;
	}

	/**
	 * 按下
	 */
	private _onDown(e: egret.TouchEvent): void {
		if (this._mapEditor.deletPathNode.selected) {
			return;
		}
		if (this._mapEditor.curChapter && this._mapEditor.curLevel && this._mapEditor.curEditPathObject) {
			let p = this._mapEditor.pathCanvas.globalToLocal(e.stageX, e.stageY)
			if (MapEditor.instance.horGuy.selected) {
				if (this.finalPoint) {
					p.y = this.finalPoint.y
				}
			}
			else if (MapEditor.instance.verGuy.selected) {
				if (this.finalPoint) {
					p.x = this.finalPoint.x
				}
			}


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
			this.finalPoint.isJumpToNextPoint = MapEditor.instance.isJumpPathPoint.selected;
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
		isJumpToNextP: boolean
	}[]): void {

		PathEditor.instance.pathPoints.length = 0;
		for (let item of pathNodes) {
			if (this.finalPoint) {
				let newPoint = this.creatPoint(new egret.Point(item.origin.x, item.origin.y));
				newPoint.isJumpToNextPoint = item.isJumpToNextP;
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
			isJumpToNextP: boolean
		}[] = MapEditor.instance.curEditPathObject.data.pathData;

		pathDataAry.length = 0;
		if (MapEditor.instance.pathMirror.selected) {
			MapEditor.instance.curEditPathObject.data.pathMirror = true;
		}
		else {
			MapEditor.instance.curEditPathObject.data.pathMirror = false;
		}
		if (this._mapEditor.fixedRotation.selected) {
			MapEditor.instance.curEditPathObject.data.fixedRotation = 0;
		}
		else {
			MapEditor.instance.curEditPathObject.data.fixedRotation = -1;
		}

		MapEditor.instance.curEditPathObject.data.objectMirror = MapEditor.instance.objectMirror.selected;

		let len = this.pathPoints.length;
		for (let i: number = 0; i < len; i++) {
			let pathNode = this.pathPoints[i]
			let data = {
				origin: { x: pathNode.x, y: pathNode.y },
				ctrlP1: { x: pathNode.ctrl1Shape.x, y: pathNode.ctrl1Shape.y },
				ctrlP2: { x: pathNode.ctrl2Shape.x, y: pathNode.ctrl2Shape.y },
				beforeAnchor: { x: pathNode.beforeAnchor.x, y: pathNode.beforeAnchor.y },
				nextAnchor: { x: pathNode.nextAnchor.x, y: pathNode.nextAnchor.y },
				isJumpToNextP: pathNode.isJumpToNextPoint
			}
			pathDataAry.push(data);
		}

		let exportData: { x, y, isJumpToNextP }[] = this.getExportPaths(pathDataAry);
		this._formatExprotResult(MapEditor.instance.curEditPathObject, exportData);

		MapEditor.instance.curEditPathObject.runTarget.x = MapEditor.instance.curEditPathObject.data.exportData[0].x;
		MapEditor.instance.curEditPathObject.runTarget.y = MapEditor.instance.curEditPathObject.data.exportData[0].y;
		MapEditor.instance.curEditPathObject.runTarget.scaleX = MapEditor.instance.curEditPathObject.data.exportData[0].scaleX;
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
		line.setData(startP, endP, startP.isJumpToNextPoint)
		this._mapEditor.pathLine.addChild(line);
		return line
	}
}
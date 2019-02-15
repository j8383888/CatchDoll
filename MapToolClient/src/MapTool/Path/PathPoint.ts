class PathPoint extends egret.DisplayObjectContainer {


	/*连接的前一条线*/
	public fromline: PathLine;
	/*连接的后一条线*/
	public backline: PathLine;

	/**
	 * 源点
	 */
	public orginPoint: egret.Shape = new egret.Shape();
	/**
	 * 控制点1
	 */
	public ctrl1Shape: egret.Shape = new egret.Shape();
	/**
	 * 控制点2
	 */
	public ctrl2Shape: egret.Shape = new egret.Shape();
	/*连接控制点的线*/
	public ctrlLine: egret.Shape = new egret.Shape();

	/**
	 * 前锚点
	 */
	public beforeAnchor: egret.Point;
	/**
	 * 后锚点
	 */
	public nextAnchor: egret.Point;


	public constructor() {
		super();


	}


	public setData(p: egret.Point): void {
		this.x = p.x;
		this.y = p.y;
		this.addChild(this.ctrlLine);
		this.beforeAnchor = p;
		this.nextAnchor = p;
		this._drawPoint(this.orginPoint, false);
		this._drawPoint(this.ctrl1Shape, true);
		this._drawPoint(this.ctrl2Shape, true);
		this.orginPoint.touchEnabled = true;
		this.ctrl1Shape.touchEnabled = true;
		this.ctrl2Shape.touchEnabled = true;
		this.orginPoint.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onOriginDown, this)
		this.orginPoint.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMoveOrgin, this)
		this.ctrl1Shape.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this)
		this.ctrl2Shape.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this)

		this.ctrl1Shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
		this.ctrl2Shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
	}

	private _onDown(): void {
		if (MapEditor.instance.deletPathNode.selected) {
			this._onDelete();
		}
	}

	/**
	 * 删除
	 */
	private _onDelete(): void {
		PathEditor.instance.pointAry.remove(this);
		this.parent.removeChild(this);

		if (this.fromline && this.backline) {
			let startP = this.fromline.startP;
			let endP = this.backline.endP;
			let line = PathEditor.instance.creatLine(startP, endP)
			startP.setBackLine(line);
			endP.setFromLine(line);
		}
		else if (this.fromline) {
			let startP = this.fromline.startP;
			startP.setBackLine(null);

			PathEditor.instance.lastPoint = startP;
			PathEditor.instance.finalPoint = startP;
		}
		else if (this.backline) {
			let endP = this.backline.endP;
			endP.setFromLine(null)

		}
		else {
			PathEditor.instance.lastPoint = null;
			PathEditor.instance.finalPoint = null;
			PathEditor.instance.finalLine = null;
		}

		if (this.fromline) {
			this.fromline.parent.removeChild(this.fromline);
		}
		if (this.backline) {
			this.backline.parent.removeChild(this.backline);
		}
	}

	private _onMoveOrgin(e: egret.TouchEvent): void {
		let p = MapEditor.instance.pathPoint.globalToLocal(e.stageX, e.stageY);
		this.x = p.x;
		this.y = p.y
		this._updateBezierLine();
	}


	private _onOriginDown(): void {
		if (MapEditor.instance.deletPathNode.selected) {
			this._onDelete();
		}
		else {

			this.showCtrlOp(true);
			if (PathEditor.instance.lastPoint) {
				PathEditor.instance.lastPoint.showCtrlOp(false);
			}
			PathEditor.instance.lastPoint = this;
		}

	}

	public setFromLine(fromline: PathLine): void {
		this.fromline = fromline;
	}

	public setBackLine(backline: PathLine): void {
		this.backline = backline;
	}

	/**
	 * 是否显示控制杆
	 */
	public showCtrlOp(isShow: boolean) {
		this.ctrl1Shape.visible = this.ctrl2Shape.visible = this.ctrlLine.visible = isShow;
	}

	/**
	 * 移动
	 */
	private _onMove(e: egret.TouchEvent): void {
		let p = this.globalToLocal(e.stageX, e.stageY);
		/**
		  * 记录锚点
		  */
		this.beforeAnchor = MapEditor.instance.pathPoint.globalToLocal(e.stageX, e.stageY);

		if (e.target == this.ctrl2Shape) {
			this.ctrl2Shape.x = p.x;
			this.ctrl2Shape.y = p.y;
			this.ctrl1Shape.x = -p.x;
			this.ctrl1Shape.y = -p.y;
		}
		else {
			this.ctrl2Shape.x = -p.x;
			this.ctrl2Shape.y = -p.y;
			this.ctrl1Shape.x = p.x;
			this.ctrl1Shape.y = p.y;
			this.beforeAnchor = this.getOppAnchor();
		}
		this.nextAnchor = this.getOppAnchor();

		this._updateCrtlLine(p.x, p.y);
		this._updateBezierLine();
	}

	private _updateBezierLine(): void {
		if (this.fromline) {
			this.fromline.drawBezierLine()
		}
		if (this.backline) {
			this.backline.drawBezierLine()
		}
	}

	/**
	 * 相反的Anchor
	 */
	public getOppAnchor(): egret.Point {
		return new egret.Point(this.x * 2 - this.beforeAnchor.x, this.y * 2 - this.beforeAnchor.y)
	}




	/**
	 * 画点 
	 * @param 是否控制点
	 */
	private _drawPoint(shape: egret.Shape, isCtrl: boolean): void {
		let color = isCtrl ? ColorUtil.COLOR_GREEN : ColorUtil.COLOR_RED

		shape.graphics.beginFill(color);
		shape.graphics.drawCircle(0, 0, 20);
		shape.graphics.endFill();
		this.addChild(shape);
	}

	/**
	 * 画控制线
	 */
	private _updateCrtlLine(x: number, y: number): void {
		this.ctrlLine.graphics.clear();
		this.ctrlLine.graphics.lineStyle(2, ColorUtil.COLOR_ORANGE);
		this.ctrlLine.graphics.moveTo(x, y);
		this.ctrlLine.graphics.lineTo(-x, -y);

	}

	public dispose(): void {

	}
}
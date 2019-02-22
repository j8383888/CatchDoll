class ColliderShape extends egret.Shape {

	/**
	 * 半径
	 */
	public radius: number = 0;

	public constructor() {
		super();

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchShape, this)
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMoveShape, this)
		this.addEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEnd, this)
	}

	private _onTouchEnd(e: egret.TouchEvent): void {
		MainEditor.instance.saveData();
	}

	private _onTouchShape(e: egret.TouchEvent): void {
		MainEditor.instance.monsterColliderBox.addChild(e.target);
	}

	/**
	 * 移动
	 */
	private _onMoveShape(e: egret.TouchEvent): void {
		this.x = Number(e.stageX.toFixed(2));
		this.y = Number(e.stageY.toFixed(2));


	}
}
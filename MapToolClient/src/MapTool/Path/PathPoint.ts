class PathPoint extends egret.Shape {
	public constructor() {
		super();

		this.graphics.beginFill(ColorUtil.COLOR_GREEN);
		this.graphics.drawCircle(0, 0, 10);
		this.graphics.endFill();
	}
}
class PathLine extends egret.Shape {
	public constructor(startX, startY) {
		super();

		this.graphics.beginFill(ColorUtil.COLOR_GREEN);
		this.graphics.drawCircle(0, 0, 10);
		this.graphics.endFill();
	}
}
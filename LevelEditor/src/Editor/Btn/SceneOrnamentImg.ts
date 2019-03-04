/**
 * 场景装饰物
 */
class SceneOrnamentImg extends egret.DisplayObjectContainer {

	public image: eui.Image = new eui.Image();

	public controlShape: egret.Shape = new egret.Shape();
	public varsGroup: eui.Group;

	public constructor(imgSource: string) {
		super();
		this.touchEnabled = false;
		this.image.source = imgSource;
		this.image.fillMode = egret.BitmapFillMode.REPEAT;
		this.addChild(this.image);
		this.image.once(egret.Event.RENDER, () => {
			this.controlShape.y = this.image.height / 2;
			this.controlShape.x = this.image.width;

		}, null)
		this.controlShape.touchEnabled = true;
		this.controlShape.graphics.beginFill(ColorUtil.COLOR_MAPLE, 0.8)
		this.controlShape.graphics.drawCircle(0, 0, 20);
		this.controlShape.graphics.endFill();
		this.addChild(this.controlShape)
		this.controlShape.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMoveCtrl, this)

		this.image.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onGoodsTouch, this)
		this.image.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this)
		this.image.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._onMove, this);

	}

	/**
	 * 打开面板
	 */
	private _onOpenPanel():void{

	}

	private _onGoodsTouch(e: egret.TouchEvent): void {
		if (MapEditor.instance.delSenceImgBtn.selected) {
			let target = this
			MapEditor.instance.sceneCanvas.removeChild(target);
			MapEditor.instance.curLevelOrnaments.remove(target)
			this.dispose();
		}
		else {
			MapEditor.instance.sceneCanvas.addChild(this)
		}
	}

	/**
	 * 点击
	 */
	private _onMove(e: egret.TouchEvent): void {
		let target = this;
		target.x = e.stageX - this.image.width / 2 - MapEditor.instance.sceneGroup.x;
		target.y = e.stageY - this.image.height / 2;
	}

	private _onMoveCtrl(e: egret.TouchEvent): void {
		let width = e.stageX - this.x - MapEditor.instance.sceneGroup.x
		this.image.width = width;
		this.controlShape.x = width;
		console.log(width)
	}

	public dispose(): void {
		this.controlShape.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this)
		this.image.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onGoodsTouch, this)
		this.image.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this, true)
		this.image.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._onMove, this, true)
	}
}
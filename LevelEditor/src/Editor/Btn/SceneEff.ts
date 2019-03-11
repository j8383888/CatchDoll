/**
 * 场景装饰物
 */
class SceneEff extends egret.DisplayObjectContainer {

	public eff: egret.MovieClip;

	public source: string;


	public constructor(groupName: string) {
		super();
		this.touchEnabled = false;
		this.source = groupName;
		this.eff = UIUtil.creatMovieClip(groupName);
		this.eff.touchEnabled = true;
		this.eff.gotoAndPlay(1, -1);
		this.addChild(this.eff);

		this.eff.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouch, this)
		this.eff.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this)
		this.eff.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._onMove, this);
	}

	private _onTouch(e: egret.TouchEvent): void {
		if (MapEditor.instance.delSenceImgBtn.selected) {
			let target = this
			MapEditor.instance.sceneCanvas.removeChild(target);
			MapEditor.instance.curEffs.remove(target)
			this.dispose();
		}
		else {
			MapEditor.instance.sceneCanvas.addChild(this)
			if (MapEditor.instance.curEffs.remove(this)) {
				MapEditor.instance.curEffs.push(this);
			}
			else {
				console.assert(false, "逻辑有误")
			}
		}
	}

	/**
	 * 点击
	 */
	private _onMove(e: egret.TouchEvent): void {
		let target = this;
		target.x = e.stageX - MapEditor.instance.sceneGroup.x;
		target.y = e.stageY;
	}

	public dispose(): void {
		this.eff.stop();
		this.eff.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouch, this)
		this.eff.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this, true)
		this.eff.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._onMove, this, true)
	}
}
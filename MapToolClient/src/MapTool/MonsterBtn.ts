class MonsterBtn extends eui.Component {

	public deleteBtn: eui.Button;

	public group: eui.Group;
	public dragonBones: dragonBones.EgretArmatureDisplay;


	public constructor(dragon: dragonBones.EgretArmatureDisplay) {
		super();
		this.skinName = "MonsterBtnSkin"
		this.dragonBones = dragon;
		this.deleteBtn.once(egret.TouchEvent.TOUCH_TAP, this._onDel, this);
		dragon.animation.play(null, 0);
		dragon.x = dragon.width / 2;
		dragon.y = dragon.height / 2
		this.group.addChild(dragon);
		this.group.height = dragon.height;
		this.group.width = dragon.width;
		this.scaleX = this.scaleY = 0.8
		dragon.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);
	}

	private _onEditPath(): void {
		if (MapEditor.instance.editorPathBtn.selected) {
			
		}
	}

	private _onDel(): void {
		this.dragonBones.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);
		this.dragonBones.dispose();
		this.dragonBones = null;
		this.parent.removeChild(this);
	}

}
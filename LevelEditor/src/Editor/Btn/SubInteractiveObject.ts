class SubInteractiveObject extends eui.Component {

	public group: eui.Group;
	/**
	 * 权重label
	 */
	public weightLabel: eui.EditableText;

	public target: eui.Image | egret.MovieClip | dragonBones.EgretArmatureDisplay;

	public host: SceneInteractiveObject;

	public data: {
		id: number,
		weight: number,
	}

	public constructor(data: {
		id: number,
		weight: number,
	}, host: SceneInteractiveObject) {
		super();
		this.skinName = "SubInteractiveSkin";
		this.data = data;
		this.host = host;
		this.updateInteractive(data.id);
		this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this);
		this.weightLabel.text = this.data.weight.toString();
		this.weightLabel.addEventListener(egret.TouchEvent.CHANGE, this._onChange, this);
	}

	private _onChange(): void {
		this.data.weight = Number(this.weightLabel.text)
	}

	private _onClick(): void {
		SelectPanel.instance.visible = true;
		SelectPanel.instance.curSubitem = this;
	}

	public dispose(): void {
		this.group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this);
		this.weightLabel.removeEventListener(egret.TouchEvent.CHANGE, this._onChange, this);
		if (this.target && this.target instanceof dragonBones.EgretArmatureDisplay) {
			this.target.dispose();
		}
		this.target = null;
	}

	public clear(): void {
		this.dispose();
		this.parent.removeChild(this);
		this.host.data.carrySubitem.remove(this.data);
		// this
	}

	/**
	 * 更新可交换对象
	 */
	public updateInteractive(id: number): void {
		if (this.target && this.target instanceof dragonBones.EgretArmatureDisplay) {
			this.target.dispose();
			this.target = null;
		}
		this.group.removeChildren();
		this.data.id = id;
		let item = ConfigParse.getWholeByProperty(MapEditor.instance.SceneInteractiveObjectTable, "id", id.toString())
		if (item.imageAry && item.imageAry.length) {
			this.target = new PivotCenterImage();
			this.target.x = this.group.width / 2;
			this.target.y = this.group.height / 2;
			this.target.source = item.imageAry[0];

		}
		else if (item.imageAry && item.movieClipAry.length) {

			this.target.x = this.group.width / 2;
			this.target.y = this.group.height / 2;
			this.target = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
			this.target.play(-1);

		}
		else if (item.dragonBonesName != "") {
			this.target = UIUtil.creatDragonbones(item.dragonBonesName);
			this.target.touchEnabled = true;

			this.target.x = this.group.width / 2;
			this.target.y = this.group.height / 2;
			this.target.animation.play(null, 0)
		}
		this.target.scaleX = this.target.scaleY = 0.6
		this.group.addChild(this.target);
	}


}
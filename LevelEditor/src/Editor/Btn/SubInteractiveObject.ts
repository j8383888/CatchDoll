class SubInteractiveObject extends eui.Component {

	public group: eui.Group;
	/**
	 * 权重label
	 */
	public weightLabel: eui.EditableText;

	public target: eui.Image | egret.MovieClip | dragonBones.EgretArmatureDisplay;

	public runTarget: eui.Image | egret.MovieClip | dragonBones.EgretArmatureDisplay;

	public host: SceneInteractiveObject;

	public isFirst: boolean = false;

	public data: {
		id: number,
		x: number,
		y: number,
		weight: number,
	}

	public constructor(data: {
		id: number,
		x: number,
		y: number,
		weight: number,
	}, host: SceneInteractiveObject, isFirst: boolean = false) {
		super();
		this.skinName = "SubInteractiveSkin";
		this.data = data;
		this.host = host;
		this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this);
		this.updateInteractive(data.id, isFirst);
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
	}

	public addUpdatePos(): void {
		this.host.runTarget.x = this.host.data.exportData[0].x;
		this.host.runTarget.y = this.host.data.exportData[0].y;
		MapEditor.instance.actionCanvas.addChild(this.host.runTarget);
		MapEditor.instance.stopClick2.visible = true;
		MapEditor.instance.confirmBtn.visible = true;
		MapEditor.instance.pathCanvas.visible = false;
		this.host.runTarget.alpha = 0.4;
		MapEditor.instance.subInteractiveCanvas.addChild(this.runTarget);
		this.runTarget.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this)
	}

	public removeUpdatePos(): void {
		MapEditor.instance.stopClick2.visible = false;
		MapEditor.instance.confirmBtn.visible = false;
		MapEditor.instance.pathCanvas.visible = true;
		this.host.runTarget.alpha = 1;
		MapEditor.instance.subInteractiveCanvas.removeChild(this.runTarget);
		this.runTarget.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this)
	}
	private _onMove(e: egret.TouchEvent): void {
		this.runTarget.x = e.stageX - 100;
		this.runTarget.y = e.stageY;
	}

	/**
	 * 更新可交换对象
	 */
	public updateInteractive(id: number, isFirst: boolean): void {
		this.isFirst = isFirst;
		if (this.target && this.target instanceof dragonBones.EgretArmatureDisplay) {
			this.target.dispose();
			this.target = null;
		}
		if (this.runTarget && this.runTarget instanceof dragonBones.EgretArmatureDisplay) {
			this.runTarget.dispose();
			this.runTarget = null;
		}

		this.group.removeChildren();
		this.data.id = id;


		let item = ConfigParse.getWholeByProperty(MapEditor.instance.SceneInteractiveObjectTable, "id", id.toString())
		if (item.imageAry && item.imageAry.length) {
			this.target = new PivotCenterImage();
			this.target.source = item.imageAry[0].sourceName;
			this.runTarget = new PivotCenterImage();
			this.runTarget.source = item.imageAry[0].sourceName;
		}
		else if (item.movieClipAry && item.movieClipAry.length) {

			this.target = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
			this.target.gotoAndStop(0);
			this.runTarget = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
			this.runTarget.gotoAndStop(0);

		}
		else if (item.dragonBonesName != "") {
			this.target = UIUtil.creatDragonbones(item.dragonBonesName);
			this.target.touchEnabled = true;
			this.target.animation.play(item.actionNameAry[0], 0)

			this.runTarget = UIUtil.creatDragonbones(item.dragonBonesName);
			this.runTarget.touchEnabled = true;
			this.runTarget.animation.play(item.actionNameAry[0], 0)
		}
		this.target.x = this.group.width / 2;
		this.target.y = this.group.height / 2;
		if (!this.data.x) {
			this.data.x = this.host.data.exportData[0].x;
			this.data.y = this.host.data.exportData[0].y;
		}
		this.runTarget.x = this.data.x;
		this.runTarget.y = this.data.y;
		this.target.scaleX = this.target.scaleY = 0.6
		this.group.addChild(this.target);
	}
}
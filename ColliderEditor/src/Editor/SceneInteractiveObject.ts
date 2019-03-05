class SceneInteractiveObject {

	/**
	 * 数据
	 */
	public data: { id: number, colliderAry: { x: number, y: number, radius: number, localX: number, localY: number }[] };

	public target: dragonBones.EgretArmatureDisplay | egret.MovieClip | PivotCenterImage;

	public runTarget: dragonBones.EgretArmatureDisplay | egret.MovieClip | PivotCenterImage;

	public id: number = - 1;

	public constructor(data: table.SceneInteractiveObjectTable) {
		this.id = data.id;
		let target = this.target;
		if (data.imageAry && data.imageAry.length) {
			target = new PivotCenterImage();
			target.source = data.imageAry[0];
			this.runTarget = new PivotCenterImage();
			this.runTarget.source = data.imageAry[0];
			MainEditor.instance.InteractiveObjectGroup.addChild(target);
		}
		else if (data.imageAry && data.movieClipAry.length) {
			target = UIUtil.creatMovieClip(data.movieClipAry[0].groupName)
			target.play(-1);
			MainEditor.instance.InteractiveObjectGroup.addChild(target);
			this.runTarget = UIUtil.creatMovieClip(data.movieClipAry[0].groupName);
			this.runTarget.play(-1);
		}
		else if (data.dragonBonesName != "") {
			target = UIUtil.creatDragonbones(data.dragonBonesName);
			target.touchEnabled = true;
			let group = new eui.Group();
			group.width = target.width;
			group.height = target.height + 80;
			target.animation.play(null, 0)
			target.x = group.width / 2;
			target.y = group.height / 2;
			group.addChild(target);
			target.animation.play(null, 0);
			this.runTarget = UIUtil.creatDragonbones(data.dragonBonesName);
			this.runTarget.animation.play(null, 0);
			MainEditor.instance.InteractiveObjectGroup.addChild(group);
		}
		this.runTarget.x = 500;
		this.runTarget.y = 500;
		target.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this)
	}

	public setData(data: { id: number, colliderAry: { x: number, y: number, radius: number, localX: number, localY: number }[] }): void {
		this.data = data;
	}

	private _onClick(e: egret.TouchEvent): void {
		MainEditor.instance.switchObject();

		for (let item of this.data.colliderAry) {
			let shape = MainEditor.instance.creatShape()
			MainEditor.instance.drawCollider(item.x, item.y, item.radius, shape)
		}
		MainEditor.instance.ObejctShowBox.addChild(this.runTarget)
		MainEditor.instance.curEditObject = this;
	}
}
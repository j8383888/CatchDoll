class MonsterBtn {
	/**
	 * 数据
	 */
	public data: { id: number, colliderAry: { x: number, y: number, radius: number, localX: number, localY: number }[] };

	public target: dragonBones.EgretArmatureDisplay;

	public runTarget: dragonBones.EgretArmatureDisplay;

	public id: number = - 1;

	public constructor(id: number, dragonSource: string) {
		this.id = id;


		let dragon: dragonBones.EgretArmatureDisplay = UIUtil.creatDragonbones(dragonSource);
		this.runTarget = UIUtil.creatDragonbones(dragonSource);
		this.runTarget.x = this.runTarget.y = 500;
		this.target = dragon;
		dragon.touchEnabled = true;
		let group = new eui.Group();
		group.width = dragon.width;
		group.height = dragon.height + 15;

		dragon.animation.play(null, 0)
		dragon.x = group.width / 2
		dragon.y = group.height / 2
		group.addChild(dragon);
		dragon.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this)
		MainEditor.instance.monsterBox.addChild(group)
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
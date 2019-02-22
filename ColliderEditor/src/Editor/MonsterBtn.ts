class MonsterBtn {
	/**
	 * 数据
	 */
	public data: { id: number, colliderAry: { x: number, y: number, radius: number, localX: number, localY: number }[] };

	public dragon: dragonBones.EgretArmatureDisplay;

	public runDragon: dragonBones.EgretArmatureDisplay;

	public id: number = - 1;

	public constructor(id: number, dragonSource: string) {
		this.id = id;


		let dragon: dragonBones.EgretArmatureDisplay = UIUtil.creatDragonbones(dragonSource);
		this.runDragon = UIUtil.creatDragonbones(dragonSource);
		this.runDragon.x = this.runDragon.y = 500;
		this.dragon = dragon;
		dragon.touchEnabled = true;
		let group = new eui.Group();
		group.width = 100
		group.height = dragon.height + 15;

		dragon.animation.play(null, 0)
		dragon.x = group.width / 2
		group.addChild(dragon);
		dragon.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickMonster, this)
		MainEditor.instance.monsterBox.addChild(group)
	}

	public setData(data: { id: number, colliderAry: { x: number, y: number, radius: number, localX: number, localY: number }[] }): void {
		this.data = data;

	}

	private _clickMonster(e: egret.TouchEvent): void {
		MainEditor.instance.switchMonster();

		for (let item of this.data.colliderAry) {
			let shape = MainEditor.instance.creatShape()
			MainEditor.instance.drawCollider(item.x, item.y, item.radius, shape)
		}
		MainEditor.instance.monsterShowBox.addChild(this.runDragon)
		MainEditor.instance.curMonsterBtn = this;
	}
}
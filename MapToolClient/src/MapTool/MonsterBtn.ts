class MonsterBtn extends eui.Component {

	public deleteBtn: eui.Button;
	public group: eui.Group;
	public dragonBones: dragonBones.EgretArmatureDisplay;
	public levelBtn: LevelBtn;

	public data: {
		monsterID: number,
		pathData: {
			origin: { x, y },
			ctrlP1: { x, y },
			ctrlP2: { x, y },
			beforeAnchor: { x, y },
			nextAnchor: { x, y },
		}[]
	};


	public constructor(data: {
		monsterID: number,
		pathData: {
			origin: { x, y },
			ctrlP1: { x, y },
			ctrlP2: { x, y },
			beforeAnchor: { x, y },
			nextAnchor: { x, y },
		}[]
	}, levelBtn: LevelBtn) {
		super();
		this.skinName = "MonsterBtnSkin"
		this.data = data;
		this.levelBtn = levelBtn
		let grounName = ConfigParse.getPropertyByProperty(MapEditor.instance.MonsterTable, "id", data.monsterID.toString(), "dragonBones")
		let dragon: dragonBones.EgretArmatureDisplay = UIUtil.creatDragonbones(grounName);

		this.dragonBones = dragon;
		this.deleteBtn.once(egret.TouchEvent.TOUCH_TAP, this._onDel, this);
		dragon.animation.play(null, 0);
		dragon.x = dragon.width / 2;
		dragon.y = dragon.height / 2
		this.group.addChild(dragon);
		this.group.height = dragon.height;
		this.group.width = dragon.width;
		this.scaleX = this.scaleY = 0.8;
		dragon.touchEnabled = true;
		dragon.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);
	}

	private _onEditPath(e: egret.Event): void {
		if (MapEditor.instance.curMonsterBtn) {
			UIUtil.setNomarl(MapEditor.instance.curMonsterBtn.dragonBones);
		}

		UIUtil.setLight(e.target);
		PathEditor.instance.finalLine = null;
		PathEditor.instance.finalPoint = null;
		PathEditor.instance.lastPoint = null;

		PathEditor.instance.pathPoints.length = 0;
		MapEditor.instance.pathLine.removeChildren();
		MapEditor.instance.pathPoint.removeChildren();
		MapEditor.instance.curMonsterBtn = this;

		PathEditor.instance.drawPath(this.data.pathData)
	}

	private _onDel(): void {
		this.dragonBones.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);
		this.dragonBones.dispose();
		this.dragonBones = null;
		this.levelBtn.data.monster.remove(this.data)
		if (MapEditor.instance.curMonsterBtn == this) {
			MapEditor.instance.curMonsterBtn = null;
			PathEditor.instance.finalLine = null;
			PathEditor.instance.finalPoint = null;
			PathEditor.instance.lastPoint = null;
			PathEditor.instance.pathPoints.length = 0;
			MapEditor.instance.pathLine.removeChildren();
			MapEditor.instance.pathPoint.removeChildren();
		}
		this.parent.removeChild(this);
	}

}
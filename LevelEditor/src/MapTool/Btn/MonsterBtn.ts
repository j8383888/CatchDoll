class MonsterBtn extends eui.Component {

	public deleteBtn: eui.Button;
	public group: eui.Group;
	public dragonBones: dragonBones.EgretArmatureDisplay;
	public levelBtn: LevelBtn;
	public startTime: number;
	public colliderShape: egret.Shape = new egret.Shape();

	public data: {
		monsterID: number,
		pathMirror: boolean,
		fixedRotation: number,
		pathData: {
			origin: { x, y },
			ctrlP1: { x, y },
			ctrlP2: { x, y },
			beforeAnchor: { x, y },
			nextAnchor: { x, y },
		}[],
		exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number }[],
	};



	public runDragonBones: dragonBones.EgretArmatureDisplay;


	public curPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number };
	public nextPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number };
	public pathNodeIndex = 0;

	public constructor(data: {
		monsterID: number,
		pathMirror: boolean,
		fixedRotation: number,
		pathData: {
			origin: { x, y },
			ctrlP1: { x, y },
			ctrlP2: { x, y },
			beforeAnchor: { x, y },
			nextAnchor: { x, y },
		}[],
		exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number }[],
	}, levelBtn: LevelBtn) {
		super();
		this.skinName = "MonsterBtnSkin"
		this.data = data;
		this.levelBtn = levelBtn
		let grounName = ConfigParse.getPropertyByProperty(MapEditor.instance.MonsterTable, "id", data.monsterID.toString(), "dragonBones")
		let dragon: dragonBones.EgretArmatureDisplay = UIUtil.creatDragonbones(grounName);
		this.runDragonBones = UIUtil.creatDragonbones(grounName);
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

		this._drawPoint();
	}

	/**
	 * 画点 
	 * @param 是否控制点
	 */
	private _drawPoint(): void {
		let shape = this.colliderShape;
		shape.graphics.beginFill(ColorUtil.COLOR_GOLD);
		shape.graphics.drawCircle(0, 0, 30);
		shape.graphics.endFill();
		this.runDragonBones.addChild(shape);

	}

	/**
	 * 编辑路径
	 */
	private _onEditPath(e: egret.Event): void {
		if (MapEditor.instance.curMonsterBtn) {
			UIUtil.setNomarl(MapEditor.instance.curMonsterBtn.dragonBones);
		}
		MapEditor.instance.fixedRotation.visible = MapEditor.instance.pathMirror.visible = true;
		MapEditor.instance.pathMirror.selected = this.data.pathMirror;
		if (this.data.fixedRotation == 0) {
			MapEditor.instance.fixedRotation.selected = true
		}
		else {
			MapEditor.instance.fixedRotation.selected = false;
		}
		UIUtil.setLight(e.target);
		PathEditor.instance.finalLine = null;
		PathEditor.instance.finalPoint = null;
		PathEditor.instance.lastPoint = null;

		
		MapEditor.instance.pathLine.removeChildren();
		MapEditor.instance.pathPoint.removeChildren();
		MapEditor.instance.curMonsterBtn = this;

		PathEditor.instance.drawPath(this.data.pathData)
	}

	private _onDel(): void {
		this.dragonBones.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);
		this.dragonBones.dispose();
		this.dragonBones = null;
		this.runDragonBones.dispose();
		this.runDragonBones = null;
		this.curPathNode = null;
		this.nextPathNode = null;
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
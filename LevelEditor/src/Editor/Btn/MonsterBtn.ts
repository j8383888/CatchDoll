class MonsterBtn extends eui.Component {

	public deleteBtn: eui.Button;
	public group: eui.Group;
	public dragonBones: dragonBones.EgretArmatureDisplay;
	public levelBtn: LevelBtn;
	public startTime: number;
	public colliderShape: egret.Shape = new egret.Shape();
	public speed: number = -1;

	public isInMirrorPath: boolean = false;

	public data: {
		id: number,
		pathMirror: boolean,
		objectMirror: boolean,
		fixedRotation: number,
		isRamdomTurnRound: boolean,
		pathData: {
			origin: { x, y },
			ctrlP1: { x, y },
			ctrlP2: { x, y },
			beforeAnchor: { x, y },
			nextAnchor: { x, y },
			isJumpToNextP: boolean
		}[],
		exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
		exportMirrorData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
	};



	public runTarget: dragonBones.EgretArmatureDisplay;
	public moveDistance: number = 0;

	public curPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number };
	public nextPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number };
	public pathNodeIndex = 0;
	public coolingTimerKey = 0;
	public isCooling: boolean = false;

	public constructor(data: {
		id: number,
		pathMirror: boolean,
		objectMirror: boolean,
		fixedRotation: number,
		isRamdomTurnRound: boolean,
		pathData: {
			origin: { x, y },
			ctrlP1: { x, y },
			ctrlP2: { x, y },
			beforeAnchor: { x, y },
			nextAnchor: { x, y },
			isJumpToNextP: boolean
		}[],
		exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
		exportMirrorData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
	}, levelBtn: LevelBtn) {
		super();
		this.skinName = "MonsterBtnSkin"
		this.data = data;

		this.levelBtn = levelBtn
		let grounName = ConfigParse.getPropertyByProperty(MapEditor.instance.MonsterTable, "id", data.id.toString(), "dragonBones")
		this.speed = ConfigParse.getPropertyByProperty(MapEditor.instance.MonsterTable, "id", data.id.toString(), "moveSpeed")
		let dragon: dragonBones.EgretArmatureDisplay = UIUtil.creatDragonbones(grounName);
		this.runTarget = UIUtil.creatDragonbones(grounName);
		this.runTarget.animation.gotoAndPlayByFrame("Walk", MathUtil.random(0, 20), 0);


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
		this.colliderShape.visible = false;
		shape.graphics.beginFill(ColorUtil.COLOR_GOLD);
		shape.graphics.drawCircle(0, 0, 30);
		shape.graphics.endFill();
		this.runTarget.addChild(shape);

	}

	/**
	 * 编辑路径
	 */
	private _onEditPath(e: egret.Event): void {
		if (MapEditor.instance.curEditPathObject) {
			if (MapEditor.instance.curEditPathObject instanceof MonsterBtn) {
				UIUtil.setNomarl(MapEditor.instance.curEditPathObject.dragonBones);
			}
			else {
				UIUtil.setNomarl(MapEditor.instance.curEditPathObject.target);
			}
			MapEditor.instance.curEditPathObject = null;
		}
		MapEditor.instance.pathMirror.selected = this.data.pathMirror;
		MapEditor.instance.objectMirror.selected = this.data.objectMirror;
		MapEditor.instance.isRandomTurnRound.selected = this.data.isRamdomTurnRound
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
		MapEditor.instance.actionCanvas.removeChildren();
		MapEditor.instance.curEditPathObject = this;

		if (this.data.exportData.length) {
			this.runTarget.x = this.data.exportData[0].x;
			this.runTarget.y = this.data.exportData[0].y;
		}
		else {
			this.runTarget.x = -100
			this.runTarget.y = -100;
		}
		MapEditor.instance.actionCanvas.addChild(this.runTarget);
		PathEditor.instance.drawPath(this.data.pathData)
	}

	private _onDel(): void {
		this.dragonBones.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);
		this.dragonBones.dispose();
		this.dragonBones = null;
		this.runTarget.dispose();
		this.runTarget = null;
		this.curPathNode = null;
		this.nextPathNode = null;
		this.levelBtn.data.monster.remove(this.data)
		if (MapEditor.instance.curEditPathObject == this) {
			MapEditor.instance.curEditPathObject = null;
			PathEditor.instance.finalLine = null;
			PathEditor.instance.finalPoint = null;
			PathEditor.instance.lastPoint = null;
			PathEditor.instance.pathPoints.length = 0;
			MapEditor.instance.pathLine.removeChildren();
			MapEditor.instance.pathPoint.removeChildren();
			MapEditor.instance.actionCanvas.removeChildren();
		}
		this.parent.removeChild(this);
	}

}
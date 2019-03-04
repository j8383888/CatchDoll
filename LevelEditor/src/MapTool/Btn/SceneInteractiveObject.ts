/**
 * 场景可交互对象
 */
class SceneInteractiveObject extends eui.Component {


	public target: eui.Image | egret.MovieClip | dragonBones.EgretArmatureDisplay;

	public runTarget: eui.Image | egret.MovieClip | dragonBones.EgretArmatureDisplay;

	public levelBtn: LevelBtn;
	public deleteBtn: eui.Button;
	public group: eui.Group;
	public startTime: number;
	public data: {
		id: number,
		pathMirror: boolean,
		objectMirror: boolean,
		fixedRotation: number,
		pathData: {
			origin: { x, y },
			ctrlP1: { x, y },
			ctrlP2: { x, y },
			beforeAnchor: { x, y },
			nextAnchor: { x, y },
		}[],
		exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
		carrySubitem: {
			id: number,
		}
	};

	public curPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number };
	public nextPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number };
	public pathNodeIndex = 0;


	public constructor(data: {
		id: number,
		pathMirror: boolean,
		objectMirror: boolean,
		fixedRotation: number,
		pathData: {
			origin: { x, y },
			ctrlP1: { x, y },
			ctrlP2: { x, y },
			beforeAnchor: { x, y },
			nextAnchor: { x, y },
		}[],
		exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
		carrySubitem: {
			id: number,
		}
	}, levelBtn: LevelBtn) {
		super();
		this.data = data;
		this.skinName = "SceneInteractiveObjectSkin";
		this.levelBtn = levelBtn;
		this.deleteBtn.once(egret.TouchEvent.TOUCH_TAP, this._onDel, this);
		let item = ConfigParse.getWholeByProperty(MapEditor.instance.SceneInteractiveObjectTable, "id", data.id.toString())
		if (item.imageAry && item.imageAry.length) {
			this.target = new PivotCenterImage();
			this.target.once(egret.Event.RENDER, () => {
				this.group.height = this.target.height;
				this.group.width = this.target.width;
				this.target.x = this.group.width / 2;
				this.target.y = this.group.height / 2;
			}, null)
			this.target.source = item.imageAry[0];

			this.runTarget = new PivotCenterImage();
			this.runTarget.source = item.imageAry[0];
		}
		else if (item.imageAry && item.movieClipAry.length) {
			this.group.height = this.target.height;
			this.group.width = this.target.width;
			this.target.x = this.group.width / 2;
			this.target.y = this.group.height / 2;
			this.target = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
			this.target.play(-1);

			this.runTarget = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
		}
		else if (item.dragonBonesName != "") {
			this.target = UIUtil.creatDragonbones(item.dragonBonesName);
			this.target.touchEnabled = true;
			this.group.height = this.target.height;
			this.group.width = this.target.width;
			this.target.x = this.group.width / 2;
			this.target.y = this.group.height / 2;
			this.target.animation.play(null, 0)
			this.runTarget = UIUtil.creatDragonbones(item.dragonBonesName);
		}

		this.group.addChild(this.target);
		MapEditor.instance.interactiveShowBox.addChild(this);
		this.scaleX = this.scaleY = 0.8;
		this.target.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);

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
		MapEditor.instance.pathSetBox.visible = true;
		MapEditor.instance.pathMirror.selected = this.data.pathMirror;
		MapEditor.instance.objectMirror.selected = this.data.objectMirror;
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
		MapEditor.instance.curEditPathObject = this;

		PathEditor.instance.drawPath(this.data.pathData)
	}

	private _onDel(): void {
		this.target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);
		if (this.target instanceof dragonBones.EgretArmatureDisplay) {
			this.target.dispose();
		}

		if (this.runTarget instanceof dragonBones.EgretArmatureDisplay) {
			this.runTarget.dispose();
		}
		this.runTarget = null;
		this.curPathNode = null;
		this.nextPathNode = null;
		this.levelBtn.data.sceneInteractiveObject.remove(this.data)
		if (MapEditor.instance.curEditPathObject == this) {
			MapEditor.instance.curEditPathObject = null;
			PathEditor.instance.finalLine = null;
			PathEditor.instance.finalPoint = null;
			PathEditor.instance.lastPoint = null;
			PathEditor.instance.pathPoints.length = 0;
			MapEditor.instance.pathLine.removeChildren();
			MapEditor.instance.pathPoint.removeChildren();
		}
		this.parent.removeChild(this)
		this.target = null;
	}
}
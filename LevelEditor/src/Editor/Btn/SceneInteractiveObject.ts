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
	public subitemGroup: eui.Group;

	public addBtn: eui.Button;
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
			isJumpToNextP: boolean
		}[],
		exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
		carrySubitem: {
			id: number,
			x: number,
			y: number,
			weight: number,
		}[]
	};

	public curPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number };
	public nextPathNode: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number };
	public pathNodeIndex = 0;

	public speed: number = 200;


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
			isJumpToNextP: boolean
		}[],
		exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
		carrySubitem: {
			id: number,
			x: number,
			y: number,
			weight: number,
		}[]
	}, levelBtn: LevelBtn) {
		super();
		this.data = data;
		this.skinName = "SceneInteractiveObjectSkin";
		this.levelBtn = levelBtn;
		let item = ConfigParse.getWholeByProperty(MapEditor.instance.SceneInteractiveObjectTable, "id", data.id.toString())
		if (item.imageAry && item.imageAry.length) {
			this.target = new PivotCenterImage();

			this.target.source = item.imageAry[0].sourceName;

			this.runTarget = new PivotCenterImage();
			this.runTarget.source = item.imageAry[0].sourceName;
		}
		else if (item.imageAry && item.movieClipAry.length) {

			this.target = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
			this.target.play(-1);

			this.runTarget = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
		}
		else if (item.dragonBonesName != "") {
			this.target = UIUtil.creatDragonbones(item.dragonBonesName);
			this.target.touchEnabled = true;
			this.target.animation.play(item.actionNameAry[1], 0)
			this.runTarget = UIUtil.creatDragonbones(item.dragonBonesName);
			this.runTarget.animation.play(item.actionNameAry[1], 0);
		}
		this.target.x = this.group.width / 2;
		this.target.y = this.group.height / 2;


		this.group.addChild(this.target);
		MapEditor.instance.interactiveShowBox.addChild(this);
		this.target.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAdd, this);
		this.deleteBtn.once(egret.TouchEvent.TOUCH_TAP, this._onDel, this);

		for (let data of this.data.carrySubitem) {
			let interactive = new SubInteractiveObject(data, this);
			this.subitemGroup.addChild(interactive);
		}

		if (this.data.id == 1001) {
			this.addBtn.visible = true;
		}
		else {
			this.addBtn.visible = false;
		}

	}

	private _onAdd(e: egret.TouchEvent): void {
		
		if (this.data.exportData.length == 0) {
			SystemTipsUtil.showTips("请先编辑路径数据！")
			return;
		}

		let data = {
			id: 1002,
			x: this.data.exportData[0].x,
			y: this.data.exportData[0].y,
			weight: 1,
		}
		this.data.carrySubitem.push(data);
		let item: SubInteractiveObject = new SubInteractiveObject(data, this);
		SelectPanel.instance.visible = true;
		SelectPanel.instance.curSubitem = item;
		this.subitemGroup.addChild(item);
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

		MapEditor.instance.actionCanvas.removeChildren();
		MapEditor.instance.pathLine.removeChildren();
		MapEditor.instance.pathPoint.removeChildren();
		MapEditor.instance.curEditPathObject = this;

		if (this.data.exportData.length) {
			this.runTarget.x = this.data.exportData[0].x;
			this.runTarget.y = this.data.exportData[0].y;
		}
		else {
			this.runTarget.x = -100;
			this.runTarget.y = -100;
		}
		MapEditor.instance.actionCanvas.addChild(this.runTarget);
		/*画路径*/
		PathEditor.instance.drawPath(this.data.pathData)
	}

	private _onDel(): void {
		this.target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onEditPath, this);
		if (this.target instanceof dragonBones.EgretArmatureDisplay) {
			this.target.dispose();
		}
		let len: number = this.subitemGroup.numChildren;
		for (let i: number = 0; i < len; i++) {
			let item = this.subitemGroup.getChildAt(i) as SubInteractiveObject
			item.dispose();
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
			MapEditor.instance.actionCanvas.removeChildren();
		}
		this.parent.removeChild(this)
		this.target = null;
	}
}
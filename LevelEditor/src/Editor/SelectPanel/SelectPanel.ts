/**
 * 选择面板
 */
class SelectPanel extends eui.Component {

	private static _instance: SelectPanel = null;
	public group: eui.Group;
	public curSubitem: SubInteractiveObject = null;
	public deleteBtn: eui.Button;
	public setPosBtn: eui.Button;
	public cancelBtn: eui.Button;


	public constructor() {
		super();
		this.skinName = "SelectPanelSkin";
		this._init();
		this.visible = false;
	}


	public static get instance(): SelectPanel {
		if (this._instance == null) {
			this._instance = new SelectPanel();
		}
		return this._instance;
	}

	public _onSetPos(): void {
		this.visible = false;
		this.curSubitem.addUpdatePos();
	}

	/**
	 * 取消
	 */
	private _onCancel(): void {
		if (this.curSubitem.isFirst) {
			this.curSubitem.clear();
		}
		this.curSubitem = null;
		this.visible = false;
	}

	private _init(): void {
		this.x = (3120 - this.width) / 2;
		this.y = (1280 - this.height) / 2;
		this.deleteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onDel, this)
		this.setPosBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSetPos, this)
		this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCancel, this)

		let table = RES.getRes("SceneInteractiveObjectTable_json")
		for (let item of table) {
			if (item.id != 1001) {
				let target: any;
				if (item.imageAry && item.imageAry.length) {
					target = new eui.Image();
					target.source = item.imageAry[0].sourceName;
					this.group.addChild(target);
				}
				else if (item.movieClipAry && item.movieClipAry.length) {
					target = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
					if (item.id == 1001) {
						target.gotoAndStop(0);
					}
					else {
						target.gotoAndPlay(1, -1);
					}
					target.gotoAndStop(0);
					target.touchEnabled = true;
					this.group.addChild(target);
				}
				else if (item.dragonBonesName != "") {
					target = UIUtil.creatDragonbones(item.dragonBonesName);

					let group = new eui.Group();
					group.width = target.width;
					group.height = target.height + 80;
					target.animation.play(item.actionNameAry[0], 0)
					target.x = group.width / 2;
					target.y = group.height / 2;
					group.addChild(target);
					this.group.addChild(group);
				}
				target.touchEnabled = true;
				target.name = item.id;
				target.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this);
			}
		}
	}

	private _onDel(): void {
		this.curSubitem.clear();
		this.visible = false;
	}

	private _onClick(e: egret.TouchEvent): void {
		let id = e.target.name;
		this.curSubitem.updateInteractive(id, false);
		this.visible = false;
	}
}
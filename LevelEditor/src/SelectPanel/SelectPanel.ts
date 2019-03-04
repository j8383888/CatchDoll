/**
 * 选择面板
 */
class SelectPanel extends eui.Component {

	public group: eui.Group;
	private static _instance: SelectPanel = null;

	public constructor() {
		super();
		this.skinName = "SelectPanelSkin";
		this._init();
	}


	public static get instance(): SelectPanel {
		if (this._instance == null) {
			this._instance = new SelectPanel();
		}
		return this._instance;
	}

	private _init(): void {
		this.x = (3120 - this.width) / 2;
		this.y = (1280 - this.height) / 2;

		let table = RES.getRes("SceneInteractiveObjectTable_json")
		for (let item of table) {
			let target: any;
			if (item.imageAry && item.imageAry.length) {
				target = new eui.Image();
				target.source = item.imageAry[0];
				this.group.addChild(target);
			}
			else if (item.imageAry && item.movieClipAry.length) {
				target = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
				target.play(-1);
				this.group.addChild(target);
			}
			else if (item.dragonBonesName != "") {
				target = UIUtil.creatDragonbones(item.dragonBonesName);
				target.touchEnabled = true;
				let group = new eui.Group();
				group.width = target.width;
				group.height = target.height + 80;
				target.animation.play(null, 0)
				target.x = group.width / 2;
				target.y = group.height / 2;
				group.addChild(target);
				this.group.addChild(group);
			}
			target.name = item.id;
		}
	}
}
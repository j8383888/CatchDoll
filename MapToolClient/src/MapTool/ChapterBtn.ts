class ChapterBtn extends eui.Component {

	public labelDisplay: eui.Label;
	public chapterID: number;
	public btnBg: eui.Rect;

	public levelData: {
		level: number,
		mapData: { source, x, y }[]
	}[];

	public isOpen: boolean = false;


	public constructor() {
		super();
		this.skinName = "ChapterBtnSkin";

	}

	/**
	 * 设置数据
	 */
	public setData(label: string, chapterID: number, levelData): void {
		this.labelDisplay.text = label;
		this.chapterID = chapterID;
		this.levelData = levelData;
	}

	/**
	 * 是否点击
	 */
	public onClick() {
		this.isOpen = !this.isOpen
		if (this.isOpen) {
			for (let subitem of this.levelData) {
				let levelBtn = new LevelBtn();
				levelBtn.setData(subitem.level, this.chapterID, subitem.mapData);
				levelBtn.addListen();
				this.parent.addChild(levelBtn);
				if (MapEditor.instance.lastLevelID == levelBtn.levelID && MapEditor.instance.lastChapterID == levelBtn.belongChapterID) {
					MapEditor.instance.curLevel = levelBtn;
					levelBtn.onSelect(true);
				}
			}
		}
		else {
			let parent = this.parent
			this.parent.removeChildren();
			parent.addChild(this);
		}
	}

	public onSelect(value: boolean) {
		value ? UIUtil.setLight(this) : UIUtil.setNomarl(this);
	}
}
class ChapterBtn extends eui.Component {

	public labelDisplay: eui.Label;
	public btnBg: eui.Rect;


	public data: {
		chapterID: number,
		chapterName: string,
		levelData: {
			level: number,
			bgSource: string,
			monster: {
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
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX }[]
			}[],
			mapData: { source, x, y, width, height }[],
		}[]
	}

	public isOpen: boolean = false;


	public constructor() {
		super();
		this.skinName = "ChapterBtnSkin";

	}

	/**
	 * 设置数据
	 */
	public setData(data: any): void {
		this.labelDisplay.text = data.chapterName;
		this.data = data;
	}

	/**
	 * 是否点击
	 */
	public onClick() {
		this.isOpen = !this.isOpen
		if (this.isOpen) {
			for (let subitem of this.data.levelData) {
				let levelBtn = new LevelBtn();
				levelBtn.setData(this.data.chapterID, subitem);
				levelBtn.addListen();
				this.parent.addChild(levelBtn);
				if (MapEditor.instance.lastLevelID == levelBtn.data.level && MapEditor.instance.lastChapterID == levelBtn.belongChapterID) {
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
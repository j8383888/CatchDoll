class ChapterBtn extends eui.Component {

	public labelDisplay: eui.EditableText;
	public btnBg: eui.Rect;


	public data: {
		chapterID: number,
		chapterName: string,
		levelData: {
			level: number,
			bgSource: string,
			monster: {
				id: number,
				fixedRotation: number,
				pathMirror: boolean,
				objectMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				pathData: {
					origin: { x, y },
					ctrlP1: { x, y },
					ctrlP2: { x, y },
					beforeAnchor: { x, y },
					nextAnchor: { x, y },
					isJumpToNextP: boolean
				}[]
			}[],
			sceneInteractiveObject: {
				id: number,
				fixedRotation: number,
				pathMirror: boolean,
				objectMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				pathData: {
					origin: { x, y },
					ctrlP1: { x, y },
					ctrlP2: { x, y },
					beforeAnchor: { x, y },
					nextAnchor: { x, y },
					isJumpToNextP: boolean
				}[]
				carrySubitem: {
					id: number,
					weight: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
			effData: { source, x, y }[]
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
	public setData(data: {
		chapterID: number,
		chapterName: string,
		levelData: {
			level: number,
			bgSource: string,
			monster: {
				id: number,
				fixedRotation: number,
				pathMirror: boolean,
				objectMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				pathData: {
					origin: { x, y },
					ctrlP1: { x, y },
					ctrlP2: { x, y },
					beforeAnchor: { x, y },
					nextAnchor: { x, y },
					isJumpToNextP: boolean
				}[]
			}[],
			sceneInteractiveObject: {
				id: number,
				fixedRotation: number,
				pathMirror: boolean,
				objectMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				pathData: {
					origin: { x, y },
					ctrlP1: { x, y },
					ctrlP2: { x, y },
					beforeAnchor: { x, y },
					nextAnchor: { x, y },
					isJumpToNextP: boolean
				}[]
				carrySubitem: {
					id: number,
					weight: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
			effData: { source, x, y }[]
		}[]
	}): void {
		this.labelDisplay.text = data.chapterName;
		this.data = data;
		this.labelDisplay.addEventListener(egret.Event.CHANGE, this._onChange, this)
	}

	private _onChange(): void {
		this.data.chapterName = this.labelDisplay.text
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
class LevelBtn extends eui.Component {

	public labelDisplay: eui.Label;
	/**
	 * 隶属于章节ID
	 */
	public belongChapterID: number;



	public data: {
		level: number,
		bgSource: string,
		monster: {
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
			}[]
			exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
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
			}[]
			carrySubitem: {
				id: number,
				weight: number,
			}[]
		}[],
		mapData: { source, x, y, width, height }[]
	};

	public constructor() {
		super();
		this.skinName = "LevelBtnSkin";
	}

	/**
	 * 设置数据
	 */
	public setData(chapterID: number, data: {
		level: number,
		bgSource: string,
		monster: {
			id: number,
			fixedRotation: number,
			pathMirror: boolean,
			objectMirror: boolean,
			pathData: {
				origin: { x, y },
				ctrlP1: { x, y },
				ctrlP2: { x, y },
				beforeAnchor: { x, y },
				nextAnchor: { x, y },
			}[],
			exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],

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
			}[]
			carrySubitem: {
				id: number,
				weight: number,
			}[]
		}[],
		mapData: { source, x, y, width, height }[],
	}): void {
		this.belongChapterID = chapterID
		this.data = data;
		this.labelDisplay.text = this.data.level.toString();

	}

	public addListen(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this)
	}

	private _clear(): void {
		MapEditor.instance.curLevelOrnaments.length = 0;
		PathEditor.instance.pathPoints.length = 0;
		PathEditor.instance.finalLine = null;
		PathEditor.instance.finalPoint = null;
		PathEditor.instance.lastPoint = null;
		MapEditor.instance.curEditPathObject = null;
		MapEditor.instance.pathSetBox.visible = false;

		MapEditor.instance.pathLine.removeChildren();
		MapEditor.instance.pathPoint.removeChildren();
		MapEditor.instance.monsterShowBox.removeChildren();
		MapEditor.instance.interactiveShowBox.removeChildren();
	}

	private _onClick(e: egret.TouchEvent): void {
		this._clear();
		if (MapEditor.instance.curLevel) {
			MapEditor.instance.curLevel.onSelect(false)
		}
		MapEditor.instance.levelBg.source = this.data.bgSource;
		MapEditor.instance.curLevel = e.currentTarget;
		/**
		 * 记录
		 */
		let chapterID: number = MapEditor.instance.curLevel.belongChapterID
		if (MapEditor.instance.lastChapterID != chapterID) {
			if (MapEditor.instance.curChapter) {
				MapEditor.instance.curChapter.onSelect(false)
			}
			MapEditor.instance.lastChapterID = chapterID;
			let chapterBtn: ChapterBtn = MapEditor.instance.chapterMap.get(chapterID);
			chapterBtn.onSelect(true);
			MapEditor.instance.curChapter = chapterBtn;

		}
		MapEditor.instance.lastLevelID = MapEditor.instance.curLevel.data.level;
		MapEditor.instance.curLevel.onSelect(true)
		MapEditor.instance.sceneCanvas.removeChildren();
		for (let item of this.data.mapData) {
			let img = new SceneOrnamentImg(item.source);
			img.x = item.x;
			img.y = item.y;
			img.image.width = item.width;
			img.image.height = item.height
			MapEditor.instance.curLevelOrnaments.push(img);
			MapEditor.instance.sceneCanvas.addChild(img);
		}



		/*生成怪物Btn*/
		for (let i: number = 0; i < this.data.monster.length; i++) {
			let data = this.data.monster[i];
			let monsterBtn = new MonsterBtn(data, this);
			MapEditor.instance.monsterShowBox.addChild(monsterBtn);
		}

		/*生成可交互对象*/
		for (let i: number = 0; i < this.data.sceneInteractiveObject.length; i++) {
			let data = this.data.sceneInteractiveObject[i];
			let interactive = new SceneInteractiveObject(data, this);
			MapEditor.instance.interactiveShowBox.addChild(interactive);
		}


	}


	public onSelect(value: boolean) {
		value ? UIUtil.setLight(this) : UIUtil.setNomarl(this);
	}
}
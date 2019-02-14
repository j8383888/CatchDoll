class LevelBtn extends eui.Component {

	public labelDisplay: eui.Label;

	public mapData: { source, x, y }[];

	public levelID: number;
	/**
	 * 隶属于章节ID
	 */
	public belongChapterID: number;



	public constructor() {
		super();
		this.skinName = "LevelBtnSkin";
	}

	/**
	 * 设置数据
	 */
	public setData(level: number, chapterID: number, mapData: any): void {
		this.levelID = level
		this.labelDisplay.text = level.toString();
		this.belongChapterID = chapterID
		this.mapData = mapData;
	}

	public addListen(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this)

	}

	private _onClick(e: egret.TouchEvent): void {
		MapEditor.instance.curMapGoods.length = 0;
		if (MapEditor.instance.curLevel) {
			MapEditor.instance.curLevel.onSelect(false)
		}

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
		MapEditor.instance.lastLevelID = MapEditor.instance.curLevel.levelID;

		MapEditor.instance.curLevel.onSelect(true)
		MapEditor.instance.sceneCanvas.removeChildren();
		for (let item of this.mapData) {
			let img = new eui.Image();
			img.source = item.source;
			img.x = item.x;
			img.y = item.y;
			MapEditor.instance.curMapGoods.push(img);
			MapEditor.instance.sceneCanvas.addChild(img);
			MapEditor.instance.addListener(img);
		}
	}


	public onSelect(value: boolean) {
		value ? UIUtil.setLight(this) : UIUtil.setNomarl(this);
	}
}
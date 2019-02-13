class MapEditor extends eui.Component {

	public saveBtn: eui.Button;
	public addBtn: eui.Button;
	public removeLevel: eui.Button;
	public removeDecorate: eui.Button;
	public clearScene: eui.Button;

	public itemGroup: eui.Group;

	public levelGroup: eui.Group;

	private _chapterID: number = 0;

	/**
	 * 当前选择章节
	 */
	public curChapter: ChapterBtn;
	/**
	 * 当前选择关卡
	 */
	public curLevel: LevelBtn;
	/**
	 * 当前场景的物品数据
	 */
	public curMapGoods: eui.Image[] = [];
	/**
	 * 场景编辑层
	 */
	public sceneCanvas: eui.Group;

	public clearSceneBtn: eui.Button;

	public removeLevelBtn: eui.Button;

	/**
	 * 上一次点击章节ID
	 */
	public lastChapterID: number = -1;

	/**
	 * 上一次点击关卡ID
	 */
	public lastLevelID: number = -1;

	public addChapter: eui.Button;



	private static _instance: MapEditor = null;

	public chapterData: {
		chapterID: number,
		chapterName: string,
		levelData: {
			level: number,
			mapData: { source, x, y }[]
		}[]
	}[];

	public constructor() {
		super();
		this.skinName = "MapEditorSkin";
		this._init();
	}

	public static get instance(): MapEditor {
		if (this._instance == null) {
			this._instance = new MapEditor();
		}
		return this._instance;
	}

	/**
	 * 初始化
	 */
	private _init(): void {
		this._getServeInfo()

		let len = this.itemGroup.numChildren;
		for (let i: number = 0; i < len; i++) {
			let item = this.itemGroup.getElementAt(i);
			item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
		}
		this.addChapter.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAddChapter, this)
		this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSave, this)
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAddLevel, this);
		this.clearSceneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClearScene, this);
		this.removeLevelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onRemoveLevel, this);
	}

	/**
	 * 添加章节
	 */
	private _onAddChapter(): void {
		let group = new eui.Group();
		let layoutV = new eui.VerticalLayout();
		layoutV.gap = 0;
		layoutV.horizontalAlign = "center";
		group.layout = layoutV;

		let chapterID = this._getLastChapterID();
		chapterID++;
		let chapterBtn = new ChapterBtn();
		chapterBtn.setData("新的章节", chapterID, []);
		group.addChild(chapterBtn);
		this.levelGroup.addChild(group);
		chapterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickChapter, this)
		this._addChapterData(chapterBtn);
	}

	/**
	 * 添加章节数据
	 */
	private _addChapterData(chapterBtn: ChapterBtn): void {
		let chapterID: number = chapterBtn.chapterID;


		/**
		 * 总数据
		 */
		this.chapterData.push({
			chapterID: chapterID,
			chapterName: "新的章节",
			levelData: []
		})
	}

	private _getLastChapterID(): number {
		return this.chapterData[this.chapterData.length - 1].chapterID
	}

	private _onRemoveLevel(): void {
		if (this.curLevel) {
			this.curChapter.parent.removeChild(this.curLevel);
			this.deleteLevelData(this.curChapter, this.curLevel);
			this.curLevel = null
		}
		else {
			SystemTipsUtil.showTips("请先选中要删除的关卡！！")
		}
	}

	/**
	 * 清除场景
	 */
	private _onClearScene(): void {
		this.curMapGoods.length = 0;
		this.sceneCanvas.removeChildren();
	}

	private _getServeInfo(): void {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("http://127.0.0.1:4000", egret.HttpMethod.GET);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// request.setRequestHeader('Access-Control-Allow-Origin', '*')
		// request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// request.setRequestHeader("Access-control-allow-methods", "GET, POST, OPTIONS, PUT, DELETE");
		request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
		request.send();
	}

	private onGetComplete(e: egret.Event) {
		this.chapterData = JSON.parse(e.target.response);
		for (let item of this.chapterData) {
			let group = new eui.Group();
			let layoutV = new eui.VerticalLayout();
			layoutV.gap = 0;
			layoutV.horizontalAlign = "center";
			group.layout = layoutV;
			let chapterBtn = new ChapterBtn();
			chapterBtn.setData(item.chapterName, item.chapterID, item.levelData);
			group.addChild(chapterBtn);
			this.levelGroup.addChild(group);
			chapterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickChapter, this)
		}
		SystemTipsUtil.showTips("加载成功");
	}

	private _onClickChapter(e: egret.TouchEvent): void {
		if (this.curChapter) {
			this.curChapter.onSelect(false)
		}
		this.curChapter = e.currentTarget;
		this.curChapter.onClick();
		this.curChapter.onSelect(true);
	}


	private onGetIOError() {

	}

	private onGetProgress() {

	}


	/**
	 * 添加关卡
	 */
	private _onAddLevel(): void {
		let group = this.curChapter.parent;
		let level: LevelBtn = new LevelBtn();
		let levelID: number = this.getLastLevel(this.curChapter.chapterID);
		levelID++;
		level.addListen();
		level.setData(levelID, this.curChapter.chapterID, [])
		group.addChild(level);
		this.addLevelData(this.curChapter, level);
	}

	/**
	 * 获得最后一个关卡
	 */
	public getLastLevel(chapterID: number): number {
		for (let item of this.chapterData) {
			if (item.chapterID == chapterID) {
				let levelData = item.levelData
				if (levelData.length) {
					return levelData[levelData.length - 1].level
				}
				else {
					return 0;
				}

			}
		}
	}

	/**
	 * 保存
	 */
	private _onSave(): void {
		if (MapEditor.instance.curChapter && MapEditor.instance.curLevel) {
			MapEditor.instance.setMapData(MapEditor.instance.curChapter, MapEditor.instance.curLevel)
		}
	}

	/**
	 * 保存数据到服务器
	 */
	private _saveDataOnServe(json: string): void {

		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("http://127.0.0.1:4000", egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// request.setRequestHeader('Access-Control-Allow-Origin', '*')
		// request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// request.setRequestHeader("Access-control-allow-methods", "GET, POST, OPTIONS, PUT, DELETE");
		request.send(json);
		request.addEventListener(egret.Event.COMPLETE, () => { }, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => { }, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, () => { }, this);
	}



	private _onDown(e: egret.TouchEvent): void {
		let target = e.target;
		let img = new eui.Image(target.source);
		img.x = e.stageX - target.width / 2;
		img.y = e.stageY - target.height / 2;
		this.sceneCanvas.addChild(img);
		this.curMapGoods.push(img);
		this.addListener(img);
	}

	public addListener(img: eui.Image): void {
		img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
			this.sceneCanvas.addChild(e.target)
		}, this)
		img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this, true)
	}



	/**
	 * 点击
	 */
	private _onMove(e: egret.TouchEvent): void {
		let target = e.target;
		target.x = e.stageX - target.width / 2;
		target.y = e.stageY - target.height / 2;
	}

	/**
	 * 删除关卡数据
	 */
	public deleteLevelData(chapterBtn: ChapterBtn, levelBtn: LevelBtn) {
		let chapterID: number = chapterBtn.chapterID;
		let levelID: number = levelBtn.levelID;


		/**
		 * 章节上的数据
		 */
		for (let item of chapterBtn.levelData) {
			if (item.level == levelID) {
				chapterBtn.levelData.remove(item);
				break;
			}
		}

		/**
		 * 总数据
		 */
		for (let item of this.chapterData) {
			if (item.chapterID == chapterID) {
				for (let subitem of item.levelData) {
					if (subitem.level == levelID) {
						item.levelData.remove(subitem);
						return;
					}
				}
			}
		}
	}
	/**
	 * 添加关卡数据
	 */
	public addLevelData(chapterBtn: ChapterBtn, levelBtn: LevelBtn) {
		let chapterID: number = chapterBtn.chapterID;
		let levelID: number = levelBtn.levelID;
		/**
		 * 章节上的数据
		 */
		chapterBtn.levelData.push({ level: levelBtn.levelID, mapData: [] })
	}

	/**
	 * 设置地图数据
	 */
	public setMapData(chapterBtn: ChapterBtn, levelBtn: LevelBtn) {
		let chapterID: number = chapterBtn.chapterID;
		let levelID: number = levelBtn.levelID;
		let mapData: { source, x, y }[] = [];
		for (let i: number = 0; i < this.curMapGoods.length; i++) {
			let item = this.curMapGoods[i];
			let data = { source: item.source, x: item.x, y: item.y };
			mapData.push(data);
		}


		/**
		 * 章节上的数据
		 */
		for (let item of chapterBtn.levelData) {
			if (item.level == levelID) {
				item.mapData = mapData;
				break;
			}
		}
		/**
		 * 关卡按钮上的数据
		 */
		levelBtn.mapData = mapData;
	}

	private _remove(): void {
		let len = this.itemGroup.numChildren;
		for (let i: number = 0; i < len; i++) {
			let item = this.itemGroup.getElementAt(i);
			item.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this)
		}
	}
}
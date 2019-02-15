class MapEditor extends eui.Component {

	public saveBtn: eui.Button;
	public addBtn: eui.Button;
	public removeLevel: eui.Button;
	public removeDecorate: eui.Button;
	public clearScene: eui.Button;

	public itemGroup: eui.Group;

	public levelGroup: eui.Group;

	private _chapterID: number = 0;

	public pathCanvas: eui.Group;

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
	 * 上一次点击章节ID
	 */
	public lastChapter: ChapterBtn;

	/**
	 * 上一次点击关卡ID
	 */
	public lastLevelID: number = -1;

	public addChapter: eui.Button;

	public chapterMap: Dictionary = new Dictionary();

	public isDel: boolean = false;
	/**
	 * 上传
	 */
	public upLoadBtn: eui.Button;
	/**
	 * 改章节名字
	 */
	public changeChapterName: eui.Button;

	private gridContainer: egret.DisplayObjectContainer;
	private static GRID_SIZE: number = 40;
	private static GRID_COLOR: number = 0x00ff00;
	private mainViewWidth: number = 720;       //主视图宽;
	private mainViewHeight: number = 1280;      //主视图高;
	public sceneGroup: eui.Group;
	public showGridCbx: eui.CheckBox;    //是否显示网格;

	public editorPathBtn: eui.CheckBox;
	public pathLine: eui.Group;
	public pathPoint: eui.Group;
	public pathEditArea: eui.Rect;

	public deletPathNode: eui.CheckBox;






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
	 * 创建网格
	 */
	private _createGrid() {
		this.gridContainer = new egret.DisplayObjectContainer();
		this.gridContainer.touchEnabled = false;
		this.gridContainer.touchChildren = false;
		this.gridContainer.width = this.mainViewWidth;
		this.gridContainer.height = this.mainViewHeight;
		var shp: egret.Shape = new egret.Shape();
		shp.graphics.lineStyle(1, MapEditor.GRID_COLOR);
		this.gridContainer.addChild(shp);
		for (let i = 0; i < this.mainViewWidth; i += MapEditor.GRID_SIZE) {
			shp.graphics.moveTo(i, 0);
			shp.graphics.lineTo(i, this.mainViewHeight);

		}
		for (let i = 0; i < this.mainViewHeight; i += MapEditor.GRID_SIZE) {
			shp.graphics.moveTo(0, i);
			shp.graphics.lineTo(this.mainViewWidth, i);
		}
		this.gridContainer.alpha = 0.5;
		this.sceneGroup.addChildAt(this.gridContainer, 1);
	}

	/**
	 * 初始化
	 */
	private _init(): void {
		this._getServeInfo();
		this._createGrid();
		this.showGridCbx.selected = true;
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
		this.removeDecorate.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onRemoveDecorate, this)
		this.upLoadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._upLoad, this);
		this.changeChapterName.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onChanegChapter, this);
		this.showGridCbx.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onShowGrid, this);

		// this.deletPathNode.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onShowGrid, this);
	}

	// private _onDelPathNode():void{
	// 	if(this.deletPathNode.selected){

	// 	}
	// }

	private _onShowGrid(): void {
		this.gridContainer.visible = this.showGridCbx.selected;
	}

	/**
	 * 改变
	 */
	private _onChanegChapter(): void {
		let len = this.chapterMap.length;
		for (let i: number = 0; i < len; i++) {
			let btn: ChapterBtn = this.chapterMap.values[i];
			for (let item of this.chapterData) {
				if (item.chapterID == btn.chapterID) {
					item.chapterName = btn.labelDisplay.text;
				}
			}
		}
		SystemTipsUtil.showTips("修改成功")
	}

	/**
	 * 上传
	 */
	private _upLoad(): void {
		this._saveDataOnServe()
	}

	private _onRemoveDecorate(): void {
		(this.isDel = !this.isDel) ? UIUtil.setLight(this.removeDecorate) : UIUtil.setNomarl(this.removeDecorate)

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
		let levelData = []
		chapterBtn.setData("新的章节", chapterID, levelData);
		this.chapterMap.set(chapterID, chapterBtn);
		group.addChild(chapterBtn);
		this.levelGroup.addChild(group);
		chapterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickChapter, this)
		this._addChapterData(chapterBtn, levelData);
	}

	/**
	 * 添加章节数据
	 */
	private _addChapterData(chapterBtn: ChapterBtn, levelData: any): void {
		let chapterID: number = chapterBtn.chapterID;


		/**
		 * 总数据
		 */
		this.chapterData.push({
			chapterID: chapterID,
			chapterName: "新的章节",
			levelData: levelData
		})
	}

	private _getLastChapterID(): number {
		return this.chapterData[this.chapterData.length - 1].chapterID
	}

	private _onRemoveLevel(): void {
		if (this.curLevel) {
			this._clearGoods();
			this.curLevel.parent.removeChild(this.curLevel);
			this.deleteLevelData(this.curLevel);
			this.curLevel = null
		}
		else {
			SystemTipsUtil.showTips("请先选中要删除的关卡！！", ColorUtil.COLOR_RED)
		}
	}

	private _clearGoods(): void {
		this.sceneCanvas.removeChildren();
		this.curMapGoods.length = 0;
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
		request.open("http://129.28.87.105:8080/", egret.HttpMethod.GET);
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
			this.chapterMap.set(item.chapterID, chapterBtn);
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
		if (!this.curChapter) {
			SystemTipsUtil.showTips("请先选择章节！", ColorUtil.COLOR_RED)
			return;
		}

		if (!this.curChapter.isOpen) {
			this.curChapter.onClick()
		}
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
			MapEditor.instance.setMapData(MapEditor.instance.curLevel)
			SystemTipsUtil.showTips("保存成功！")
		}
		else {
			SystemTipsUtil.showTips("请选中关卡和章节！", ColorUtil.COLOR_RED)
		}
	}

	/**
	 * 保存数据到服务器
	 */
	private _saveDataOnServe(): void {

		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("http://129.28.87.105:8080", egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// request.setRequestHeader('Access-Control-Allow-Origin', '*')
		// request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// request.setRequestHeader("Access-control-allow-methods", "GET, POST, OPTIONS, PUT, DELETE");
		request.send(JSON.stringify(this.chapterData));
		request.addEventListener(egret.Event.COMPLETE, () => {
			SystemTipsUtil.showTips("提交成功！")
		}, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
			SystemTipsUtil.showTips("提交失败", ColorUtil.COLOR_RED)
		}, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, () => { }, this);
	}



	private _onDown(e: egret.TouchEvent): void {
		if (this.curLevel && this.curChapter) {
			let target = e.target;
			let img = new eui.Image(target.source);
			img.x = e.stageX - target.width / 2 - this.sceneGroup.x;
			img.y = e.stageY - target.height / 2;
			this.sceneCanvas.addChild(img);
			this.curMapGoods.push(img);
			this.addListener(img);
		}
		else {
			SystemTipsUtil.showTips("请先选择章节和关卡！", ColorUtil.COLOR_RED);
		}

	}

	public addListener(img: eui.Image): void {
		img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onGoodsTouch, this)
		img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this, true)
		img.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._onMove, this, true)
	}

	private _onGoodsTouch(e: egret.TouchEvent): void {
		if (this.isDel) {
			let target = e.target
			target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onGoodsTouch, this)
			target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this, true)
			target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._onMove, this, true)
			this.sceneCanvas.removeChild(target);
			this.curMapGoods.remove(target)
			target = null;
		}
		else {
			this.sceneCanvas.addChild(e.target)
		}
	}



	/**
	 * 点击
	 */
	private _onMove(e: egret.TouchEvent): void {
		let target = e.target;
		target.x = e.stageX - target.width / 2 - this.sceneGroup.x;
		target.y = e.stageY - target.height / 2;
	}

	/**
	 * 删除关卡数据
	 */
	public deleteLevelData(levelBtn: LevelBtn) {
		let chapterID: number = levelBtn.belongChapterID;
		let levelID: number = levelBtn.levelID;


		/**
		 * 章节上的数据
		 */
		let chapterBtn = this.chapterMap.get(chapterID)

		for (let item of chapterBtn.levelData) {
			if (item.level == levelID) {
				chapterBtn.levelData.remove(item);
				break;
			}
		}

		// /**
		//  * 总数据
		//  */
		// for (let item of this.chapterData) {
		// 	if (item.chapterID == chapterID) {
		// 		for (let subitem of item.levelData) {
		// 			if (subitem.level == levelID) {
		// 				item.levelData.remove(subitem);
		// 				return;
		// 			}
		// 		}
		// 	}
		// }
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
	public setMapData(levelBtn: LevelBtn) {
		let chapterID: number = levelBtn.belongChapterID;
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
		let chapterBtn = this.chapterMap.get(chapterID)

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
class MapEditor extends eui.Component {

	public saveSceneBtn: eui.Button;
	public addBtn: eui.Button;
	public removeLevel: eui.Button;
	public clearScene: eui.Button;

	public sceneItemGroup: eui.Group;

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
	public curLevelOrnaments: SceneOrnamentImg[] = [];


	public curEffs: SceneEff[] = []
	// /**
	//  * 当前场景的物品数据
	//  */
	// public curLevelInteractiveObjects: SceneInteractiveObject[] = [];
	/**
	 * 场景编辑层
	 */
	public sceneCanvas: eui.Group;

	public clearSceneBtn: eui.Button;

	public removeLevelBtn: eui.Button;

	public movePathPoint: eui.CheckBox;

	/**
	 * 上一次点击章节ID
	 */
	public lastChapterID: number = -1;
	/**
	 * 上一次点击章节
	 */
	public lastChapter: ChapterBtn;

	/**
	 * 上一次点击关卡ID
	 */
	public lastLevelID: number = -1;

	public addChapter: eui.Button;

	public chapterMap: Dictionary = new Dictionary();

	public delSenceImgBtn: eui.CheckBox;
	/**
	 * 上传
	 */
	public upLoadBtn: eui.Button;

	private gridContainer: egret.DisplayObjectContainer;
	private static GRID_SIZE: number = 40;
	private static GRID_COLOR: number = 0x00ff00;
	private mainViewWidth: number = 1280;       //主视图宽;
	private mainViewHeight: number = 1280;      //主视图高;
	public sceneGroup: eui.Group;
	public showGridCbx: eui.CheckBox;    //是否显示网格;

	public editorPathBtn: eui.CheckBox;
	public pathLine: eui.Group;
	public pathPoint: eui.Group;
	public pathEditArea: eui.Rect;

	public deletPathNode: eui.CheckBox;

	public monsterBox: eui.Group;

	public monsterShowBox: eui.Group;
	public savePath: eui.Button;


	private static _instance: MapEditor = null;

	public MonsterTable: table.MonsterTable[];

	public SceneInteractiveObjectTable: table.SceneInteractiveObjectTable[];

	public levelBg: eui.Image;
	public horGuy: eui.CheckBox;
	public verGuy: eui.CheckBox;


	/**
	 * 当前编辑路径对象
	 */
	public curEditPathObject: MonsterBtn | SceneInteractiveObject;


	public bgGroup: eui.Group;
	public aniTestBtn: eui.Button;

	public lookPathBtn: eui.CheckBox;
	public lookGoodsBtn: eui.CheckBox;
	/**
	 * 禁止点击
	 */
	public stopClick: eui.Rect;

	public pathMirror: eui.CheckBox;
	public objectMirror: eui.CheckBox;

	public fixedRotation: eui.CheckBox;
	/**
	 * 当前关卡演示
	 */
	public levelTestBtn: eui.Button;
	public exportDataBtn: eui.Button;

	public clearPathBtn: eui.Button;
	/**
	 * 子项所在层级
	 */
	public subInteractiveCanvas: eui.Group;

	/**
	 * 可交互对象组
	 */
	public InteractiveObjectGroup: eui.Group;


	public interactiveShowBox: eui.Group;
	public actionCanvas: eui.Group;


	public confirmBtn: eui.Button;
	public pathMirrorNoRollOver: eui.CheckBox;
	public effGroup: eui.Group;

	public isJumpPathPoint: eui.CheckBox;
	/**
	 * 
	 */
	public editSceneOrnaBtn: eui.CheckBox;


	public stopClick2: eui.Rect;

	public chapterData: {
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
					x: number,
					y: number,
					weight: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
			effData: { source, x, y }[]
		}[]
	}[] = [];
	/**
	 * 0动画禁止操作 1导出数据后禁止操作
	 */
	public state: number = 0;


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

	private _creatSceneEff(): void {
		for (let i: number = 1; i <= 10; i++) {
			let item = UIUtil.creatMovieClip("sceneEff" + i)
			let group = new eui.Group();
			group.addChild(item);
			group.width = item.width;
			group.height = item.height;
			item.x = item.width / 2;
			item.y = item.height / 2;
			item.touchEnabled = true;
			item.gotoAndPlay(1, -1);
			item.frameRate = 8;
			item.name = "sceneEff" + i;
			this.effGroup.addChild(group);
			item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchEff, this)
		}
	}

	/**
	 * 特效
	 */
	private _onTouchEff(e: egret.TouchEvent): void {
		if (GlobeConst.isEditScene) {
			if (this.editorPathBtn.selected) {
				SystemTipsUtil.showTips("请先取消编辑路径勾选!", ColorUtil.COLOR_RED);
				return;
			}
			if (this.curLevel && this.curChapter) {
				let target = e.target;
				let eff = new SceneEff(target.name);
				eff.x = e.stageX - this.sceneGroup.x;
				eff.y = e.stageY;
				this.sceneCanvas.addChild(eff);
				this.curEffs.push(eff);
			}
			else {
				SystemTipsUtil.showTips("请先选择章节和关卡！", ColorUtil.COLOR_RED);
			}
		}
	}

	/**
	 * 创建可交互对象
	 */
	private _createInteractiveObject(): void {
		this.SceneInteractiveObjectTable = RES.getRes("SceneInteractiveObjectTable_json")
		for (let item of this.SceneInteractiveObjectTable) {
			let target: any;
			if (item.imageAry && item.imageAry.length) {
				target = new eui.Image();
				target.source = item.imageAry[0].sourceName;
				this.InteractiveObjectGroup.addChild(target);
			}
			else if (item.movieClipAry && item.movieClipAry.length) {
				target = UIUtil.creatMovieClip(item.movieClipAry[0].groupName)
				if (item.id == 1001) {
					target.gotoAndStop(0);
				}
				else {
					target.gotoAndPlay(1, -1);
				}
				target.touchEnabled = true;
				let group = new eui.Group();
				group.width = target.width;
				group.height = target.height + 80;
				target.x = target.width / 2;
				target.y = target.height / 2;
				group.addChild(target);

				this.InteractiveObjectGroup.addChild(group);
			}
			else if (item.dragonBonesName != "") {
				target = UIUtil.creatDragonbones(item.dragonBonesName);
				target.touchEnabled = true;
				let group = new eui.Group();
				group.width = target.width;
				group.height = target.height + 80;
				target.animation.play(item.actionNameAry[1], 0)
				target.x = group.width / 2;
				target.y = group.height / 2;
				group.addChild(target);
				this.InteractiveObjectGroup.addChild(group);
			}
			target.name = item.id;
			target.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickInteractiveObject, this)
		}
	}

	/**
	 * 点击可交互对象
	 */
	private _clickInteractiveObject(e: egret.TouchEvent): void {
		if (this.curLevel && this.curChapter) {
			let target = e.target;

			// let interactive = new SceneInteractiveObject(target.name, type);
			// interactive.x = e.stageX - target.width / 2 - this.sceneGroup.x;
			// interactive.y = e.stageY - target.height / 2;
			// this.interactiveShowBox.addChild(interactive);

			let data = {
				id: target.name,
				pathMirror: true,
				objectMirror: false,
				fixedRotation: 0,
				pathData: [],
				exportData: [],
				carrySubitem: []
			};
			let btn = new SceneInteractiveObject(data, this.curLevel);
			this.curLevel.data.sceneInteractiveObject.push(data);
		}
		else {
			SystemTipsUtil.showTips("请先选择章节和关卡！", ColorUtil.COLOR_RED);
		}
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
		this.sceneGroup.addChildAt(this.gridContainer, 3);
	}

	private _creatBg(): void {
		for (let i: number = 1; i <= 23; i++) {
			let img = new eui.Image("BattleBg_" + i + "_png");
			this.bgGroup.addChild(img);
		}
	}

	/**
	 * 创建怪物
	 */
	private _creatMonster(): void {
		this.MonsterTable = RES.getRes("MonsterTable_json");

		let blank = new eui.Group();
		blank.width = this.monsterBox.width;
		blank.height = 100;
		this.monsterBox.addChild(blank);
		for (let i: number = 0; i < this.MonsterTable.length; i++) {
			let dragon: dragonBones.EgretArmatureDisplay = UIUtil.creatDragonbones(this.MonsterTable[i].dragonBones);
			dragon.touchEnabled = true;
			let group = new eui.Group();
			group.width = this.monsterBox.width;
			group.height = dragon.height + 20;

			dragon.animation.play(null, 0)
			dragon.x = group.width / 2
			group.addChild(dragon);
			dragon.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickMonster, this)
			dragon.name = this.MonsterTable[i].id.toString();
			this.monsterBox.addChild(group);
		}
	}

	private _clickMonster(e: egret.TouchEvent): void {
		if (this.curLevel && this.curChapter) {
			let id = e.target.name;

			let data = {
				id: id,
				pathMirror: true,
				objectMirror: false,
				fixedRotation: 0,
				pathData: [],
				exportData: []
			};
			let btn = new MonsterBtn(data, this.curLevel);
			this.curLevel.data.monster.push(data);
			this.monsterShowBox.addChild(btn);
		}
		else {
			SystemTipsUtil.showTips("请先选中关卡和章节！", ColorUtil.COLOR_RED)
		}
	}

	/**
	 * 创建Img
	 */
	private _creatSeneceImg(): void {
		let scenejson: egret.SpriteSheet = RES.getRes("BattleScene_json");
		let textureMap: egret.MapLike<egret.Texture> = scenejson._textureMap
		for (let item in textureMap) {
			let img = new eui.Image(item);
			this.sceneItemGroup.addChild(img);
			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
		}
	}

	/**
	 * 初始化
	 */
	private _init(): void {
		this._getServeInfo();
		this._createGrid();
		this._creatMonster();
		this._creatSeneceImg();
		this._createInteractiveObject();
		this._creatSceneEff();
		this._creatBg();
		this.showGridCbx.selected = true;

		this.addChapter.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAddChapter, this)
		this.saveSceneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSaveScene, this)
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAddLevel, this);
		this.clearSceneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClearScene, this);
		this.removeLevelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onRemoveLevel, this);
		this.upLoadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._upLoad, this);
		this.showGridCbx.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onShowGrid, this);
		this.savePath.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSavePath, this);
		this.lookPathBtn.addEventListener(egret.TouchEvent.CHANGE, this._onLookPath, this)
		this.lookGoodsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onLookGoods, this)
		this.exportDataBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onExportData, this)
		this.clearPathBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClearPath, this)
		this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onConfirm, this)
		this.stopClick.visible = false;

		this.stopClick.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (this.state == 0) {
				SystemTipsUtil.showTips("正在播放动画！禁止操作！(不然容易报错)", ColorUtil.COLOR_RED)
			}
			else {
				SystemTipsUtil.showTips("导出数据后禁止操作，请刷新页面", ColorUtil.COLOR_RED)
			}
		}, null)
		this.lookPathBtn.selected = this.lookGoodsBtn.selected = true;
		let len2 = this.bgGroup.numChildren;
		for (let i: number = 0; i < len2; i++) {
			let item = this.bgGroup.getElementAt(i);
			item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onBgDown, this)
		}
	}

	private _onConfirm(): void {
		let curObj = SelectPanel.instance.curSubitem;
		curObj.data.x = curObj.runTarget.x;
		curObj.data.y = curObj.runTarget.y;
		curObj.removeUpdatePos();

	}

	private _onClearPath(): void {
		if (this.curChapter && this.curLevel && this.curEditPathObject) {
			PathEditor.instance.finalLine = null;
			PathEditor.instance.finalPoint = null;
			PathEditor.instance.lastPoint = null;
			MapEditor.instance.pathLine.removeChildren();
			MapEditor.instance.pathPoint.removeChildren();
			MapEditor.instance.curEditPathObject.runTarget.x = -100;
			MapEditor.instance.curEditPathObject.runTarget.y = -100
			PathEditor.instance.pathPoints.length = 0;
		}
		else {
			SystemTipsUtil.showTips("请先选中关卡和章节和编辑路径对象！", ColorUtil.COLOR_RED)
		}
	}


	/**
	 * 导出数据
	 */
	private _onExportData(): void {
		let exportData = this.chapterData.slice();
		for (let item of exportData) {
			for (let subItem of item.levelData) {
				for (let subItem2 of subItem.monster) {
					delete subItem2.pathData;
					delete subItem2.objectMirror;
					delete subItem2.pathMirror;
				}
				for (let subItem3 of subItem.sceneInteractiveObject) {
					delete subItem3.pathData;
					delete subItem3.objectMirror;
					delete subItem3.pathMirror;
					let sum: number = 0;
					for (let subitem4 of subItem3.carrySubitem) {
						sum += subitem4.weight;
						subitem4["offsetX"] = subitem4.x - subItem3.exportData[0].x;
						subitem4["offsetY"] = subitem4.y - subItem3.exportData[0].y;
					}
					let sumOdds: number = 0;
					for (let subitem4 of subItem3.carrySubitem) {
						sumOdds += subitem4.weight / sum;
						subitem4["weightOdds"] = sumOdds;
						delete subitem4.weight;
					}
				}
			}
		}

		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("http://129.28.87.105:8080", egret.HttpMethod.POST);
		// request.open("http://127.0.0.1:8080", egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let data = JSON.stringify(exportData)
		request.send("exportData" + data);
		request.addEventListener(egret.Event.COMPLETE, () => {
			SystemTipsUtil.showTips("导出数据成功！")
		}, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
			SystemTipsUtil.showTips("导出数据失败", ColorUtil.COLOR_RED)
		}, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, () => { }, this);
		this.state = 1;
		this.stopClick.visible = true;
	}

	private _onLookPath(e: egret.TouchEvent): void {
		this.editorPathBtn.visible = this.pathCanvas.visible = this.lookPathBtn.selected;
	}

	private _onLookGoods(e: egret.TouchEvent): void {
		this.sceneCanvas.visible = this.lookGoodsBtn.selected;
	}

	private _onBgDown(e: egret.TouchEvent): void {
		if (this.curChapter && this.curLevel) {
			this.levelBg.source = e.target.source;
			this.curLevel.data.bgSource = e.target.source
		}
		else {
			SystemTipsUtil.showTips("请先选中关卡和章节！", ColorUtil.COLOR_RED)
		}
	}

	private _onSavePath(e: egret.TouchEvent): void {
		if (this.curChapter && this.curLevel && this.curEditPathObject) {
			if (PathEditor.instance.pathPoints.length) {
				PathEditor.instance.savePath();
				SystemTipsUtil.showTips("保存路径成功！")
			}
			else {
				SystemTipsUtil.showTips("路径数据不能为空!", ColorUtil.COLOR_RED);
			}
		}
		else {
			SystemTipsUtil.showTips("请先选中关卡和章节和怪物！", ColorUtil.COLOR_RED)
		}
	}

	private _onShowGrid(): void {
		this.gridContainer.visible = this.showGridCbx.selected;
	}


	/**
	 * 上传
	 */
	private _upLoad(): void {
		this._saveDataOnServe()
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
		let data = {
			chapterID: chapterID,
			chapterName: "新的章节",
			levelData: [],
			effData: []
		};

		chapterBtn.setData(data);
		this.chapterMap.set(chapterID, chapterBtn);
		group.addChild(chapterBtn);
		this.levelGroup.addChild(group);
		chapterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickChapter, this)
		this._addChapterData(chapterBtn, data.levelData);
	}

	/**
	 * 添加章节数据
	 */
	private _addChapterData(chapterBtn: ChapterBtn, levelData: any): void {
		let chapterID: number = chapterBtn.data.chapterID;


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
		return this.chapterData.length;
	}

	private _onRemoveLevel(): void {
		if (this.curLevel) {
			this._clear();
			this.curLevel.parent.removeChild(this.curLevel);
			this.deleteLevelData(this.curLevel);
			this.curLevel = null
		}
		else {
			SystemTipsUtil.showTips("请先选中要删除的关卡！！", ColorUtil.COLOR_RED)
		}
	}

	private _clear(): void {
		this.curLevelOrnaments.length = 0;
		this.curEffs.length = 0;

		PathEditor.instance.finalLine = null;
		PathEditor.instance.finalPoint = null;
		PathEditor.instance.lastPoint = null;
		MapEditor.instance.curEditPathObject = null;
		PathEditor.instance.pathPoints.length = 0;
		MapEditor.instance.pathLine.removeChildren();
		MapEditor.instance.pathPoint.removeChildren();
		MapEditor.instance.monsterShowBox.removeChildren();
		this.sceneCanvas.removeChildren();

	}

	/**
	 * 清除场景
	 */
	private _onClearScene(): void {
		this.curLevelOrnaments.length = 0;
		this.sceneCanvas.removeChildren();
	}

	private _getServeInfo(): void {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("http://129.28.87.105:8080/", egret.HttpMethod.GET);
		// request.open("http://127.0.0.1:8080/", egret.HttpMethod.GET);
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
		let data: string = e.target.response
		console.log(data)
		if (data == "") {
			SystemTipsUtil.showTips("暂无数据");
			return;
		}
		this.chapterData = JSON.parse(data);
		for (let item of this.chapterData) {
			let group = new eui.Group();
			let layoutV = new eui.VerticalLayout();
			layoutV.gap = 0;
			layoutV.horizontalAlign = "center";
			group.layout = layoutV;
			let chapterBtn = new ChapterBtn();
			chapterBtn.setData(item);
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
		let levelID: number = this.getLastLevel(this.curChapter.data.chapterID);
		levelID++;
		let data = {
			level: levelID,
			bgSource: "",
			monster: [],
			sceneInteractiveObject: [],
			mapData: [],
			effData: []
		};
		level.addListen();
		level.setData(this.curChapter.data.chapterID, data)
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
	private _onSaveScene(): void {
		if (MapEditor.instance.curChapter && MapEditor.instance.curLevel) {
			MapEditor.instance.setMapData(MapEditor.instance.curLevel)
			SystemTipsUtil.showTips("保存成功！")
		}
		else {
			SystemTipsUtil.showTips("请先选中关卡和章节！", ColorUtil.COLOR_RED)
		}
	}

	/**
	 * 保存数据到服务器
	 */
	private _saveDataOnServe(): void {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("http://129.28.87.105:8080", egret.HttpMethod.POST);
		// request.open("http://127.0.0.1:8080", egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// request.setRequestHeader('Access-Control-Allow-Origin', '*')
		// request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// request.setRequestHeader("Access-control-allow-methods", "GET, POST, OPTIONS, PUT, DELETE");
		let data = JSON.stringify(this.chapterData)
		request.send("editorData" + data);
		request.addEventListener(egret.Event.COMPLETE, () => {
			SystemTipsUtil.showTips("提交成功！")
		}, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
			SystemTipsUtil.showTips("提交失败", ColorUtil.COLOR_RED)
		}, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, () => { }, this);
	}

	private _onDown(e: egret.TouchEvent): void {
		if (GlobeConst.isEditScene) {
			if (this.editorPathBtn.selected) {
				SystemTipsUtil.showTips("请先取消编辑路径勾选!", ColorUtil.COLOR_RED);
				return;
			}
			if (this.curLevel && this.curChapter) {
				let target = e.target;
				let img = new SceneOrnamentImg(target.source);
				img.x = e.stageX - target.width / 2 - this.sceneGroup.x;
				img.y = e.stageY - target.height / 2;
				this.sceneCanvas.addChild(img);
				this.curLevelOrnaments.push(img);
			}
			else {
				SystemTipsUtil.showTips("请先选择章节和关卡！", ColorUtil.COLOR_RED);
			}
		}
	}









	/**
	 * 删除关卡数据
	 */
	public deleteLevelData(levelBtn: LevelBtn) {
		let chapterID: number = levelBtn.belongChapterID;


		/**
		 * 章节上的数据
		 */
		let chapterBtn: ChapterBtn = this.chapterMap.get(chapterID)
		chapterBtn.data.levelData.remove(levelBtn.data);

	}
	/**
	 * 添加关卡数据
	 */
	public addLevelData(chapterBtn: ChapterBtn, levelBtn: LevelBtn) {
		/**
		 * 章节上的数据
		 */
		chapterBtn.data.levelData.push(levelBtn.data)
	}

	/**
	 * 设置地图数据
	 */
	public setMapData(levelBtn: LevelBtn) {
		let chapterID: number = levelBtn.belongChapterID;
		let levelID: number = levelBtn.data.level;

		let mapData: { source, x, y, width, height }[] = [];
		for (let i: number = 0; i < this.curLevelOrnaments.length; i++) {
			let item = this.curLevelOrnaments[i];
			let data = { source: item.image.source, x: item.x, y: item.y, width: item.image.width, height: item.image.height };
			mapData.push(data);
		}
		levelBtn.data.mapData = mapData
		let effData: { source, x, y }[] = [];
		for (let i: number = 0; i < this.curEffs.length; i++) {
			let item = this.curEffs[i];
			let data = { source: item.source, x: item.x, y: item.y };
			effData.push(data);
		}
		levelBtn.data.effData = effData;

	}

}
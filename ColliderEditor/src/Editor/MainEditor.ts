class MainEditor extends eui.Component {

	public gridBox: eui.Group;

	private static GRID_COLOR: number = 0x00ff00;

	private static GRID_SIZE: number = 40;

	public monsterBox: eui.Group;

	public monsterTable: table.MonsterTable[];

	// public colliderMap: { [sign: number]: { posX: number, posY: number, radius: number }[] } = {};

	public curMonsterBtn: MonsterBtn = null;
	/**
	 * 怪兽按钮组
	 */
	public monsterBtns: MonsterBtn[] = [];

	public editAreaRect: eui.Rect;
	/**
	 * 怪兽层级
	 */
	public monsterShowBox: eui.Group;
	/**
	 * 怪兽碰撞体层级
	 */
	public monsterColliderBox: eui.Group;



	private static _instance: MainEditor = null;

	public drawShape: egret.Shape;

	private _originP: { x: number, y: number } = { x: 0, y: 0 };

	public curCicrle: { x: number, y: number, radius: number };

	public colliderMap: {
		id: number,
		colliderAry: { x: number, y: number, radius: number }[]
	}[] = []

	public clearBtn: eui.Button;

	public constructor() {
		super();
		this.skinName = "MainEditorSkin"

		this.monsterTable = RES.getRes("MonsterTable_json");
		this._createGrid();
		this._creatMonster();
		this.editAreaRect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this);
		this.editAreaRect.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this);
		this.editAreaRect.addEventListener(egret.TouchEvent.TOUCH_END, this._onEnd, this);
		this.clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClear, this)
		// this._loadColliderData();
	}

	public i

	private _loadColliderData(): void {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("http://129.28.87.105:8080/", egret.HttpMethod.GET);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
		request.send("Collider Edit");
	}

	private onGetComplete(e: egret.Event) {
		let data: string = e.target.response
		data = data.slice(0, data.length - 1)
		if (data == "") {
			SystemTipsUtil.showTips("暂无数据");
			return;
		}
		this.colliderMap = JSON.parse(data);
		for (let item of this.colliderMap) {
			for (let monster of this.monsterBtns) {
				if (item.id == monster.id) {
					monster.setData(item);
					break;
				}
			}
		}
		SystemTipsUtil.showTips("加载成功");
	}

	private onGetIOError() {

	}

	private onGetProgress() {

	}

	/**
	 * 清除
	 */
	private _onClear(): void {
		this.monsterColliderBox.removeChildren();
		for (let item of this.colliderMap) {
			if (item.id == this.curMonsterBtn.data.id) {
				item.colliderAry.length = 0;
				return;
			}
		}
	}

	private _onDown(e: egret.TouchEvent): void {
		this._originP.x = e.stageX;
		this._originP.y = e.stageY;
		let shape = new egret.Shape();
		this.drawShape = shape;
		this.addChild(this.drawShape);
	}

	private _onEnd(): void {
		for (let item of this.colliderMap) {
			if (item.id == this.curMonsterBtn.data.id) {
				item.colliderAry.push(this.curCicrle);
				return;
			}
		}
	}

	private _onMove(e: egret.TouchEvent): void {
		let radius = UIUtil.getDistanceByPoint(this._originP, { x: e.stageX, y: e.stageY });
		this.drawCollider(this.drawShape.x, this.drawShape.y, radius);
	}

	/**
	 * 画碰撞
	 */
	public drawCollider(x: number, y: number, radius: number): void {
		let shape = this.drawShape;
		shape.graphics.clear();
		shape.graphics.beginFill(ColorUtil.COLOR_RED, 0.5);
		shape.graphics.drawCircle(0, 0, radius);
		shape.graphics.endFill();

		shape.x = x;
		shape.y = y;
		this.curCicrle = { x: this._originP.x, y: this._originP.y, radius: radius }

	}

	public setData(id: number, data: { x: number, y: number, radius: number }[]): void {
		for (let item of this.colliderMap) {
			if (item.id == id) {
				item.colliderAry = data;
			}
		}
	}

	public getColliderData(id: number): { id: number, colliderAry: { x: number, y: number, radius: number }[] } {
		for (let item of this.colliderMap) {
			if (item.id == id) {
				return item;
			}
		}
		return null;
	}



	public static get instance(): MainEditor {
		if (this._instance == null) {
			this._instance = new MainEditor();
		}
		return this._instance;
	}

	/**
	 * 创建怪物
	 */
	private _creatMonster(): void {


		for (let i: number = 0; i < 2; i++) {
			let blank = new eui.Group();
			blank.width = 100
			blank.height = 100;
			this.monsterBox.addChild(blank);
		}

		for (let item of this.monsterTable) {
			let source = ConfigParse.getPropertyByProperty(this.monsterTable, "id", item.id.toString(), "dragonBones")
			let btn = new MonsterBtn(item.id, source);
			let dataItem = {
				id: item.id,
				colliderAry: [{ x: 0, y: 0, radius: 0 }]
			}
			this.colliderMap.push(dataItem);
			this.monsterBtns.push(btn);
		}
	}




	/**
	 * 创建网格
	 */
	private _createGrid() {
		this.gridBox.touchEnabled = false;
		this.gridBox.touchChildren = false;
		var shp: egret.Shape = new egret.Shape();
		shp.graphics.lineStyle(1, MainEditor.GRID_COLOR);
		this.gridBox.addChild(shp);
		for (let i = 0; i < 1000; i += MainEditor.GRID_SIZE) {
			shp.graphics.moveTo(i, 0);
			shp.graphics.lineTo(i, 1000);

		}
		for (let i = 0; i < 1000; i += MainEditor.GRID_SIZE) {
			shp.graphics.moveTo(0, i);
			shp.graphics.lineTo(1000, i);
		}
		this.gridBox.alpha = 0.5;
	}

	//格式化保存的数据;
	protected formatResult(): string {
		let result: string = "";
		let outputStr = function (msg: string) {
			result = result + msg + "\n";
		}
		outputStr("sign,region");
		for (let item of this.colliderMap) {
			let regions = item.colliderAry
			regions.removeAll(v => v.radius < 5);
			let region = "\"[";
			for (let j: number = 0; j < regions.length; j++) {
				let item = regions[j];
				region += ("[" + item.x + "," + item.y + "," + Math.floor(item.radius) + "," + "]");
				if (j != regions.length - 1) {
					region += ",";
				}
			}
			region += "]\"";
			outputStr("" + item.id + "," + region);
		}
		return result;
	}
}
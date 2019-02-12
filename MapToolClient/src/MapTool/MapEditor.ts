class MapEditor extends eui.Component {

	public saveBtn: eui.Button;
	public addBtn: eui.Button;
	public removeLevel: eui.Button;
	public removeDecorate: eui.Button;
	public clearScene: eui.Button;

	public itemGroup: eui.Group;
	public itemList: eui.Image[] = []
	public constructor() {
		super();
		this.skinName = "MapEditorSkin";
		this._init();
	}

	/**
	 * 初始化
	 */
	private _init(): void {
		let len = this.itemGroup.numChildren;
		for (let i: number = 0; i < len; i++) {
			let item = this.itemGroup.getElementAt(i);
			item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this)
		}
		this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSave, this)
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this._onAdd,this);
	}

	/**
	 * 添加关卡
	 */
	private _onAdd():void{
		let levelBtn = 
	}

	/**
	 * 保存
	 */
	private _onSave(): void {
		let dataAry: { source, x, y }[] = [];
		for (let i: number = 0; i < this.itemList.length; i++) {
			let item = this.itemList[i];
			let data = { source: item.source, x: item.x, y: item.y };
			dataAry.push(data);
		}
		let json: string = JSON.stringify(dataAry);
		this._saveDataOnServe(json);
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
		request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
	}

	private onGetComplete() {

	}

	private onGetIOError() {

	}

	private onGetProgress() {

	}

	private _onDown(e: egret.TouchEvent): void {
		let target = e.target;
		let img = new eui.Image(target.source);
		img.x = e.stageX - target.width / 2;
		img.y = e.stageY - target.height / 2;
		this.addChild(img);
		this.itemList.push(img);

		img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
			this.addChild(e.target)
		}, this)
		img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this, true)

	}



	/**
	 * 点击
	 */
	private _onMove(e: egret.TouchEvent): void {
		let target = e.target;
		target.x = e.stageX - target.width / 2;;
		target.y = e.stageY - target.height / 2;;
	}

	private _remove(): void {
		let len = this.itemGroup.numChildren;
		for (let i: number = 0; i < len; i++) {
			let item = this.itemGroup.getElementAt(i);
			item.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this)
		}
	}
}
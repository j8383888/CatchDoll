/**
 * 爪子
 */
module catchDoll {
	export class Paws extends eui.Component implements IGameObject {
		/**
		 * 缓存标识符
		 */
		public sign: GAMEOBJECT_SIGN;
		/**
		 * uid
		 */
		public uID: number = NaN;
		/**
		 * 放置哪个图层
		 */
		public layerType: LAYER;
		/**
		 * 携带参数
		 */
		public varsData: IGameObjectVars = null;
		/**
		 * 是否可以被释放
		 */
		public canDispose: boolean = false;
		/**
		 * 引用计数
		 */
		public refCount: number = 0;
		/**
		 * 注册操作id
		 */
		private _registerAry: number[] = [];
		/**
		 * 夹子头
		 */
		public pawsHead: eui.Group;
		/**
		 * 绳子
		 */
		public rope: eui.Image;
		/**
		 * 起始Y
		 */
		public pawsHeadStartPosY: number = 0;

		/**
		 * 头像
		 */
		public headImg: eui.Image;
		/**
		 * 夹子盒子
		 */
		public pawBox: eui.Group;
		/**
		 * 夹子ID
		 */
		public clipID: number;
		/**
		 * 下夹子效果
		 */
		public downEff: egret.MovieClip;
		/**
		 * 伤害
		 */
		public hurt: number;

		public constructor() {
			super();
			this.skinName = "PawsSkin";
		}


		/**
		 * 设置数据
		 */
		public setData(sign: GAMEOBJECT_SIGN, uID: number, varsData: IGameObjectVars, layerType: LAYER = LAYER.MONSTER): void {
			this.sign = sign;
			this.uID = uID;
			this.varsData = varsData;
			this.layerType = layerType;
		}

		/**
		 * 加载资源
		 */
		public loadConfigAsset(assetData: IConfigAsset): void {

		}

		/**
		 * 校准绳子长度
		 */
		public confirmRopeHeight(): void {
			this.rope.height = this.pawsHead.y - this.headImg.y - 15
		}

		/**
		 * 加载配置数据
		 */
		public loadConfigData(configData: IConfigData): void {
			this.pawsHeadStartPosY = this.pawsHead.y;
		}

		/**
		 * 只初始化一次（在loadConfigData之后调用）
		 */
		public initOther(): void {
			this.confirmRopeHeight();
			this.pawsHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clikPawsHead, this);
		}

		/**
		 * 切换夹子
		 */
		private _clikPawsHead(): void {

			this.switchClip(UIUtil.circleAdd(this.clipID, 1, 4));
		}

		/**
		 * 切换夹子
		 */
		public switchClip(clipID: number): void {
			if (this.downEff) {
				this.pawsHead.removeChild(this.downEff);
			}

			this.clipID = clipID;
			let assetData: table.ClipTable.MovieClipAryItem = ConfigParse.getPropertyByProperty(TableCenter.instance.ClipTable, "id", clipID.toString(), "movieClipAry")[0];
			this.downEff = UIUtil.creatMovieClip(assetData.groupName, assetData.actionName);
			this.downEff.x = this.pawsHead.width / 2;
			this.downEff.y = this.pawsHead.height / 2;
			this.downEff.gotoAndStop(1);
			this.downEff.frameRate = 8;
			this.hurt = ConfigParse.getPropertyByProperty(TableCenter.instance.ClipTable, "id", clipID.toString(), "hurt")
			this.pawsHead.addChild(this.downEff);
		}

		/**
		 * 初始化
		 */
		public initialize(): void {
			LayerManager.instance.addToLayer(this, LAYER.MONSTER);
			this._registerAry.push(OperationManager.instance.registerOperation(this, OPERATION_TYPE.MASTER));
		}

		/**
		 * 反初始化
		 */
		public uninitialize(): void {
			for (let i: number = 0; i < this._registerAry.length; i++) {
				OperationManager.instance.unregisterOperation(this._registerAry[i])
			}
			this._registerAry.length = 0;
			LayerManager.instance.removeFromLayer(this, LAYER.MONSTER);

		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this.pawsHead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clikPawsHead, this);
			this.uID = NaN;
			this.varsData = null;
			this.refCount = 0;
		}
	}
}
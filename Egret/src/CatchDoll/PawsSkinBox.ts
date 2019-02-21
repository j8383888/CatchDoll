module catchDoll {
	export class PawsSkinBox extends eui.Component {

		/**
		 * 夹子盒子
		 */
		public pawBox: eui.Group;

		/**
		 * 夹子头
		 */
		public pawsHead: eui.Group;
		/**
		 * 绳子
		 */
		public rope: eui.Image;
		/**
		 * 头像
		 */
		public headImg: eui.Image;
		/**
		 * 起始Y
		 */
		public pawsHeadStartPosY: number = 0;
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


			this.pawsHeadStartPosY = this.pawsHead.y;
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
		 * 释放
		 */
		public dispose(): void {
			this.pawsHead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clikPawsHead, this);
		}
	}
}
module catchDoll {
	export class PawsBody extends eui.Component {

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
		public pawHeadImg: eui.Image;
		/**
		 * 伤害
		 */
		public hurt: number;
		/**
		 * 前摇
		 */
		public actionBefore: number = -1;
		/**
		 * 伤血持续时间
		 */
		public hurtDuration: number[];
		/**
		 * 下夹子
		 */
		public isDown: boolean = false;


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
			if (this.isDown) {
				return;
			}
			this.clipID = clipID;
			this.pawHeadImg.source =  ConfigParse.getPropertyByProperty(TableCenter.instance.ClipTable, "id", clipID.toString(), "render");
			this.hurt = ConfigParse.getPropertyByProperty(TableCenter.instance.ClipTable, "id", clipID.toString(), "hurt")
			this.actionBefore = ConfigParse.getPropertyByProperty(TableCenter.instance.ClipTable, "id", clipID.toString(), "actionBefore");
			this.hurtDuration = ConfigParse.getPropertyByProperty(TableCenter.instance.ClipTable, "id", clipID.toString(), "hurtDuration");
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this.pawsHead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clikPawsHead, this);
		}
	}
}
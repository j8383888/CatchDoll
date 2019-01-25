/**
 * 视图模板
 * @author suo
 */
module catchDoll {
	export class FunctionUIView extends BasePopPanel implements BaseUIView {

		/**
		 * 菜单按钮
		 */
		public menuBtn: Button;
		/**
		 * 钻石
		 */
		public diamond: eui.Label;
		/**
		 * 钱
		 */
		public money: eui.Label;
		/**
		 * 转盘按钮
		 */
		public turnTableBtn: Button;
		/**
		 * 签到按钮
		 */
		public registerBtn: Button;
		/**
		 * 设置按钮
		 */
		public setUpBtn: Button;
		/**
		 * 右按钮
		 */
		public rightBtn: Button
		/**
		 * 左按钮
		 */
		public leftBtn: Button;
		/**
		 * 底部菜单
		 */
		public bottomMenu: eui.Group;
		/**
		 * 底部按钮菜单
		 */
		public bottomBtnGroup: eui.Group;
		/**
		 * 左按钮
		 */
		public shopBtn: Button;
		/**
		 * 任务按钮
		 */
		public taskBtn: Button;
		/**
		 * 背包按钮
		 */
		public bagBtn: Button;
		/**
		 * 排行榜
		 */
		public rankBtn: Button;
		/**
		 * 邀请按钮
		 */
		public inventBtn: Button
		/**
		 * 收拢按钮
		 */
		public furlBtn: Button;
		/**
		 * 左侧菜单
		 */
		public leftMenu: eui.Group;
		/**
		 * 左侧菜单背景
		 */
		public leftMenuBg: eui.Image;
		/**
		 * 滑动条
		 */
		public scroller:eui.Scroller;


		public constructor() {
			super();
			this.skinName = "FunctionUISkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			let item = this.skin["_menuBtn"]
			this.menuBtn = new Button(this.skin["_menuBtn"])
			this.registerBtn = new Button(this.skin["_registerBtn"]);
			this.turnTableBtn = new Button(this.skin["_turnTableBtn"]);
			this.setUpBtn = new Button(this.skin["_setUpBtn"]);
			this.leftBtn = new Button(this.skin["_leftBtn"]);
			this.rightBtn = new Button(this.skin["_rightBtn"]);
			this.shopBtn = new Button(this.skin["_shopBtn"]);
			this.taskBtn = new Button(this.skin["_taskBtn"]);
			this.bagBtn = new Button(this.skin["_bagBtn"]);
			this.rankBtn = new Button(this.skin["_rankBtn"]);
			this.inventBtn = new Button(this.skin["_inventBtn"])
			this.furlBtn = new Button(this.skin["_furlBtn"])

			this.bottomMenu.x = 720;
			EventManager.registerEvent(EVENT_ID.UPDATE_MONEY, Handler.create(this, this._updateMoney));
		}

		/**
		 * 更新钱
		 */
		private _updateMoney(): void {
			this.money.text = GlobeTool.getProp(ITEM_ID.MONEY).toString();
		}



		/**
		 * 展示时
		 */
		public onShow(): void {
			this.diamond.text = GlobeTool.getProp(ITEM_ID.DIMOND).toString();
			this.money.text = GlobeTool.getProp(ITEM_ID.MONEY).toString();
			this.addToStage(LAYER.UI)

		}

		/**
		 * 清除
		 */
		public clear(): void {

		}

		/**
		 * 隐藏时
		 */
		public onHide(): void {

		}

		/**
		 * 释放时
		 */
		public dispose(): void {
			EventManager.unregisterEvent(EVENT_ID.UPDATE_MONEY, this, this._updateMoney);
			this.turnTableBtn.dispose();
			this.turnTableBtn = null;
			this.menuBtn.dispose();
			this.menuBtn = null;
			this.registerBtn.dispose();
			this.registerBtn = null;
			this.setUpBtn.dispose();
			this.setUpBtn = null;
			this.leftBtn.dispose();
			this.leftBtn = null;
			this.rightBtn.dispose();
			this.rightBtn = null;
			this.shopBtn.dispose();
			this.shopBtn = null;
			this.bagBtn.dispose();
			this.bagBtn = null;
			this.taskBtn.dispose();
			this.taskBtn = null;
			this.rankBtn.dispose();
			this.rankBtn = null;
			this.inventBtn.dispose();
			this.inventBtn = null;
			this.furlBtn.dispose();
			this.furlBtn = null;
			super.dispose();
		}
	}
}
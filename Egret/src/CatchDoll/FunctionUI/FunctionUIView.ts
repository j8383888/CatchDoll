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
		 * 任务按钮
		 */
		public taskBtn: Button;




		public constructor() {
			super();
			this.skinName = "FunctionUISkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.menuBtn = new Button(this.skin["_menuBtn"])
			this.registerBtn = new Button(this.skin["_registerBtn"]);
			this.taskBtn = new Button(this.skin["_taskBtn"]);
			this.setUpBtn = new Button(this.skin["_setUpBtn"]);
			this.leftBtn = new Button(this.skin["_leftBtn"]);
			this.rightBtn = new Button(this.skin["_rightBtn"]);



			this.bottomMenu.x = 720;
			EventManager.registerEvent(EVENT_ID.UPDATE_MONEY, Handler.create(this, this._updateMoney));
			EventManager.registerEvent(EVENT_ID.UPDATE_DIAMOND, Handler.create(this, this._updateDiamond));
		}

		/**
		 * 更新钱
		 */
		private _updateMoney(): void {
			this.money.text = GlobeTool.getProp(PROP_ID.MONEY).toString();
		}

		/**
		 * 更新钱
		 */
		private _updateDiamond(): void {
			this.diamond.text = GlobeTool.getProp(PROP_ID.DIAMOND).toString();
		}



		/**
		 * 展示时
		 */
		public onShow(): void {
			this.diamond.text = GlobeTool.getProp(PROP_ID.DIAMOND).toString();
			this.money.text = GlobeTool.getProp(PROP_ID.MONEY).toString();
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
			this.taskBtn.dispose();
			this.taskBtn = null;
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

			super.dispose();
		}
	}
}
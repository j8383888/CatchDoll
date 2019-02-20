/**
 * 简易UI框架
 * @suo
 */

module catchDoll {
	export class SimpleUICenter {

		/**
		 * 单例
		 */
		private static _instance: SimpleUICenter;
		/**
		 * UI字典
		 */
		private _UIMap: Dictionary = new Dictionary();
		/**
		 * 已打开UI数组
		 */
		private _openUIMap: Dictionary = new Dictionary();

		public constructor() {
			this.addUI(SIMPLE_UI.ShopPanel, ShopPanel);
			this.addUI(SIMPLE_UI.bagPanel, BagPanel);
			this.addUI(SIMPLE_UI.taskPanel, TaskPanel);
			this.addUI(SIMPLE_UI.rankPanel, RankPanel);
			this.addUI(SIMPLE_UI.SettlePanel, SettlePanel);
			this.addUI(SIMPLE_UI.illustrations, IllustrationsPanel);
			this.addUI(SIMPLE_UI.buyItemPanel, BuyItemPanel);
			this.addUI(SIMPLE_UI.ConfirmPanel, ConfirmPanel);
			this.addUI(SIMPLE_UI.SystemTips, SystemTips);
			this.addUI(SIMPLE_UI.BattleSelect, BattleSelectLevelPanel);
		}

		/**
		 * 添加UI
		 */
		private addUI(id: SIMPLE_UI, cls: any): void {
			this._UIMap.set(id, cls);
		}

		/**
		 * 获得单例
		 */
		public static get instance(): SimpleUICenter {
			if (this._instance == null) {
				this._instance = new SimpleUICenter();
			}
			return this._instance;
		}

		/**
		 * 获取视图
		 */
		public getUI(id: number): IBaseSimpleUI {
			return this._openUIMap.get(id);
		}

		/**
		 * 打开视图
		 */
		public openUI(id: number, param?: any): void {
			if (this._openUIMap.isExist(id)) {

			}
			else {
				let cls: any = this._UIMap.get(id);
				let panel: IBaseSimpleUI = new cls();
				if (param) {
					panel.openParam = param;
				}
				panel.onInit();
				panel.onShow();
				this._openUIMap.set(id, panel);
			}
		}

		/**
		 * 关闭视图
		 */
		public closeUI(id: number): void {
			if (this._openUIMap.isExist(id)) {
				let panel: IBaseSimpleUI = this.getUI(id);
				panel.onHide();
				panel.dispose();
				this._openUIMap.remove(id)
			}
		}

		/**
		 * 关闭所有
		 */
		public closeAll(): void {
			let len: number = this._openUIMap.length;
			let keys: number[] = this._openUIMap.keys.slice()
			for (let i: number = 0; i < len; i++) {
				let panelID: number = keys[i];
				this.closeUI(panelID);
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._UIMap.clear();
			this._openUIMap.clear();
		}

	}

	export const enum SIMPLE_UI {
		/*商店*/
		ShopPanel,
		/*任务面板*/
		taskPanel,
		/*背包*/
		bagPanel,
		/*排行*/
		rankPanel,
		/*结算*/
		SettlePanel,
		/*图鉴面板*/
		illustrations,
		/*购买道具面板*/
		buyItemPanel,
		/*确认面板*/
		ConfirmPanel,
		/*系统提示*/
		SystemTips,
		/*战役选关*/
		BattleSelect
	}
}
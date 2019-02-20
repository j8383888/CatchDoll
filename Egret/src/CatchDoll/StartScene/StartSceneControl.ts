/**
 * 控制器模板
 * @author suo
 */
module catchDoll {
	export class StartSceneControl extends BaseUIControl {
		/*视图*/
		private _view: StartSceneView;

		public constructor() {
			super();
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this._view = this._viewCenter.getView(StartSceneView);
			EventManager.registerEvent(EVENT_ID.SERVE_COMPLETE, Handler.create(this, this._serveComplete), REG_TYPE.ONCE)

		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this._view.startBtn.mouseClickHandler = Handler.create(null, () => {
				UICenter.instance.closeUI(commonUI.StartScene);
				UICenter.instance.openUI(commonUI.FunctionUI);
				UICenter.instance.openUI(commonUI.WorldMap);
			})
		}

		/**
		 * 服务器数据同步完毕
		 */
		private _serveComplete(): void {
			this._view.startBtn.enabled = true;
			egret.Tween.get(this._view.startBtn.root, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 600 * 1.5).
				to({ scaleX: 0.9, scaleY: 0.9 }, 900 * 1.5).to({ scaleX: 1, scaleY: 1 }, 300 * 1.5);
			
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			egret.Tween.removeTweens(this._view.startBtn.root);
			this._view = null;
			super.dispose();
		}
	}
}
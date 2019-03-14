/**
 * 视图模板
 * @author suo
 */
module catchDoll {
	export class StartSceneView extends BasePopPanel implements BaseUIView {

		/**
		 * 开始按钮
		 */
		public startBtn: Button;

		public bg: eui.Image;

		public customFilter: egret.CustomFilter;

		public constructor() {
			super();
			this.skinName = "StartSceneSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.startBtn = new Button(this.skin["_startBtn"]);
			this.startBtn.enabled = false;

		}

		/**
		 * 展示时
		 */
		public onShow(): void {
			this.addToStage(LAYER.SCENE);
			this.customFilter = UIUtil.brightShader()
			this.bg.filters = [this.customFilter];
			Laya.timer.loop(30, this, this._onLoop)
		}

		private _onLoop(): void {
			let customFilter1 = this.customFilter
			customFilter1.uniforms.customUniform += 0.1;
			if (customFilter1.uniforms.customUniform > Math.PI * 2) {
				customFilter1.uniforms.customUniform = 0.0;
			}
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
			Laya.timer.clear(this, this._onLoop)
			this.startBtn.dispose();
			this.startBtn = null;
			super.dispose();
		}
	}
}
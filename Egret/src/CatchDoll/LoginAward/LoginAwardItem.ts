module catchDoll {
	export class LoginAwardItem extends eui.Component {

		public bg: eui.Image;
		public dayLabel: eui.Label;
		public alreadyGet: eui.Label;



		public constructor() {
			super();
			this.skinName = "LoginAwardItemSkin"
			this.onInit();
		}

		/**
		 * 初始化
		 */
		public onInit(): void {

		}

		public setData(state: number, day: number): void {
			/**
			 * 已经领取
			 */
			if (state == 1) {
				this.bg.source = "otherRes3_10"
				UIUtil.setGray(this.bg);
				this.alreadyGet.visible = true;
			}
			/**
			 * 未领取 今天
			 */
			else if (state == 2) {
				this.alreadyGet.visible = true;
			}
			/**
			 * 未领取 
			 */
			else if (state == 3) {
				this.alreadyGet.visible = true;
			}
		}
	}
}
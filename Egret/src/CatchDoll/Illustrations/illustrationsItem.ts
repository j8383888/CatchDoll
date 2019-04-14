module catchDoll {
	export class illustrationsItem extends eui.Component {

		public id: number = -1
		public nameLabel: eui.Label;
		public renderBox: eui.Group;

		public renderTarget: dragonBones.EgretArmatureDisplay | eui.Image;


		public constructor() {
			super();
			this.skinName = "illstationsItemSkin"
		}

		/**
		 * 设置数据
		 */
		public setData(id: number, name: string, renderName: string, isDragon: boolean): void {
			this.nameLabel.text = name;
			this.id = id;
			if (isDragon) {
				this.renderTarget = UIUtil.creatDragonbones(renderName);
				this.renderTarget.touchEnabled = true;
				this.renderTarget.animation.play(null, 0)
				this.renderTarget.x = this.renderBox.width / 2;
				this.renderTarget.y = this.renderBox.height / 2;
				if (id == 10)
					this.renderTarget.y += 10
			}
			else {
				this.renderTarget = new eui.Image();
				this.renderTarget.source = renderName;
				this.renderTarget.horizontalCenter = 0;
				this.renderTarget.verticalCenter = 0;
			}
			this.renderBox.addChild(this.renderTarget);

		}


		public dispose(): void {
			if (this.renderTarget instanceof dragonBones.EgretArmatureDisplay) {
				this.renderTarget.dispose();
			}
			this.renderTarget = null;
		}
	}
}
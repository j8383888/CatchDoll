/**
 * 抽的卡牌
 */
module catchDoll {
	export class PumpingCardItem extends eui.Component {


		public levelBg: eui.Image;
		public starBox: eui.Group;
		public levelImg: eui.Image;
		public levelFont: eui.Image;
		public renderBox: eui.Group;
		public starBoxBg: eui.Image;

		public renderTarget: dragonBones.EgretArmatureDisplay;

		public constructor() {
			super();
			this.skinName = "PumpingCardItemSkin"
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2
		}

		/**
		 * 设置数据
		 */
		public setData(id: number): void {
			let data = ConfigParse.getWholeByProperty(TableCenter.instance.MonsterTable, "id", id.toString()) as table.MonsterTable;
			let level = data.level
			this.levelBg.source = "fragment_40" + level;
			for (let i: number = 0; i < level; i++) {
				let img = new eui.Image();
				img.source = "otherRes3_1";
				this.starBox.addChild(img)
			}
			this.levelImg.source = "fragment_10" + level;
			this.levelFont.source = "fragment_30" + level;
			this.starBoxBg.source = "fragment_50" + level;;

			this.renderTarget = UIUtil.creatDragonbones(data.dragonBones);
			this.renderTarget.touchEnabled = true;
			this.renderTarget.animation.play(null, 0)
			this.renderTarget.x = this.renderBox.width / 2;
			this.renderTarget.y = this.renderBox.height / 2;
			this.renderBox.addChild(this.renderTarget);
		}

		public dispose(): void {
			this.renderTarget.dispose();
			this.renderTarget = null;
		}


	}
}
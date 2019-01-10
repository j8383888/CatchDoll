/**
 * 排行项
 * @author suo
 */
module catchDoll {
	export class RankItem extends eui.Component {

		private nameLabel: eui.Label;
		private scoreLabel: eui.Label
		private rankBg1: eui.Image;
		private rankBg2: eui.Image;
		private rankLabel: eui.BitmapLabel;


		public constructor() {
			super();
			this.skinName = "RankItemItem";
		}

		/**
		 * 设置数据
		 */
		public setData(name: string, score: number, rankNum: number): void {
			if (rankNum == 1) {
				this.rankBg1.source = "rankingList_10";
				this.rankBg1.visible = true;
				this.rankBg2.visible = false;
			}
			else if (rankNum == 2) {
				this.rankBg1.source = "rankingList_12";
				this.rankBg1.visible = true;
				this.rankBg2.visible = false;
			}
			else if (rankNum == 3) {
				this.rankBg1.source = "rankingList_11";
				this.rankBg1.visible = true;
				this.rankBg2.visible = false;
			}
			else {
				this.rankBg1.visible = false;
				this.rankBg2.visible = true;
				this.rankLabel.text = rankNum.toString();
			}
			this.nameLabel.text = name;
			this.scoreLabel.text = score.toString();

		}
	}
}
/**
 * 
 * @author suo 
 */
module catchDoll {
	export class BattleLevelItem extends eui.Component {

		public group: eui.Group;
		public dragoneP: eui.Rect;
		public enterLevel: eui.Rect;

		/**
		 * 进入关卡按钮
		 */
		public enterLevelBtn: Button;
		/**
		 * 龙骨
		 */
		public dragon: dragonBones.EgretArmatureDisplay;
		/**
		 * 关卡
		 */
		public levelData: {
			level: number,
			bgSource: string,
			monster: {
				monsterID: number,
				fixedRotation: number,
				pathMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number },
				pathData: {
					origin: { x, y },
					ctrlP1: { x, y },
					ctrlP2: { x, y },
					beforeAnchor: { x, y },
					nextAnchor: { x, y },
				}[]
			}[],
			mapData: { source, x, y }[],
		};



		public constructor() {
			super()
			this.skinName = "BattleLevelItemSkin";
			this.onInit();
			this.onShow();
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.enterLevelBtn = new Button(this.enterLevel)
			this.enterLevelBtn.mouseClickHandler = Handler.create(this, this._onEnterLevel)
		}

		/**
		 * 进入关卡
		 */
		private _onEnterLevel(): void {
			UICenter.instance.openUI(commonUI.BattleScene, this.levelData);
			SimpleUICenter.instance.closeUI(SIMPLE_UI.BattleSelect);
		}

		public setData(levelData: {
			level: number,
			bgSource: string,
			monster: {
				monsterID: number,
				fixedRotation: number,
				pathMirror: boolean,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number },
				pathData: {
					origin: { x, y },
					ctrlP1: { x, y },
					ctrlP2: { x, y },
					beforeAnchor: { x, y },
					nextAnchor: { x, y },
				}[]
			}[],
			mapData: { source, x, y }[],
		}): void {

			this.levelData = levelData;
			let firstMonsterID = levelData.monster[0].monsterID;
			let monsterData = TableCenter.instance.getMonsterDataByID(firstMonsterID);
			this.dragon = UIUtil.creatDragonbones(monsterData.dragonBones);
			this.dragon.animation.play("Standby", 0);
			this.dragon.x = this.dragoneP.x;
			this.dragon.y = this.dragoneP.y;
			this.group.addChild(this.dragon);
		}

		/**
		 * 显示时
		 */
		public onShow(): void {

		}



		/**
		 * 释放
		 */
		public dispose(): void {
			this.levelData = null;
			this.dragon.dispose();
			this.dragon = null;
			this.enterLevelBtn.dispose();
			this.enterLevelBtn = null;
		}
	}
}
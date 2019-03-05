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
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
			}[],
			sceneInteractiveObject: {
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				carrySubitem: {
					id: number,
					weightOdds: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
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
			UICenter.instance.closeUI(commonUI.WorldMap);
		}

		public setData(levelData: {
			level: number,
			bgSource: string,
			monster: {
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
			}[],
			sceneInteractiveObject: {
				id: number,
				fixedRotation: number,
				exportData: { x: number, y: number, angle: number, distNext: number, distTotal: number, scaleX: number }[],
				carrySubitem: {
					id: number,
					weightOdds: number,
				}[]
			}[],
			mapData: { source, x, y, width, height }[],
		}): void {

			this.levelData = levelData;
			let firstMonsterID = levelData.monster[0].id;
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
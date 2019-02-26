/**
 * 怪物
 * @author suo
 */
module catchDoll {
	export class Monster extends GameObjectCollider {

		/**
		 * 注册操作id
		 */
		private _registerAry: number[] = [];
		/**
		 * 生命值
		 */
		public life: number = NaN;
		/**
		 * 最大生命值
		 */
		public maxLife: number = NaN
		/**
		 * 是否活着
		 */
		public isAlive: boolean = false;
		/**
		 * 移动速度
		 */
		public speed: number = 0;
		/**
		 * 血条
		 */
		public haemalStrand: eui.Image;
		/**
		 * 血条框
		 */
		public haemalStrandFrame: eui.Image;
		/**
		 * 血条初始长度
		 */
		public haemalStrandWidth: number = 100;
		/**
		 * 血条容器
		 */
		public haemalGroup: egret.DisplayObjectContainer;
		/**
		 * 僵直
		 */
		public isSpasticity: boolean = false;

		public constructor() {
			super();
		}




		public loadConfigAsset(assetData: IConfigAsset): void {
			super.loadConfigAsset(assetData);

		}

		/**
         * 加载配置
         */
		public loadConfigData(data: IMonsterConfigData): void {
			super.loadConfigData(data)
			this.speed = data.speed;

			this.maxLife = data.life;
			this.haemalStrand = new eui.Image();
			this.haemalStrand.source = "battle_13"
			this.haemalStrandFrame = new eui.Image();
			this.haemalStrandFrame.source = "battle_10";
			this.haemalStrandFrame.scale9Grid = this.haemalStrand.scale9Grid = new egret.Rectangle(10, 10, 27, 2);
			this.haemalStrand.y = this.haemalStrandFrame.y = -100;

			this.haemalStrand.width = this.haemalStrandFrame.width = this.haemalStrandWidth;
			this.haemalStrandFrame.x = this.haemalStrand.x = -this.haemalStrand.width / 2
			this.haemalGroup = new egret.DisplayObjectContainer();
			this.addChild(this.haemalGroup)
			this.haemalGroup.addChild(this.haemalStrand);
			this.haemalGroup.addChild(this.haemalStrandFrame);
		}

		/**
         * 初始化
         */
		public initialize(): void {
			this.x = -1000;
			this.y = -1000;
			this.isSpasticity = false;
			let view: BattleSceneView = UICenter.instance.getManager(commonUI.BattleScene).getView(BattleSceneView)
			view.monsterBox.addChild(this);

			if (this._dragonBones) {
				this._dragonBones.animation.gotoAndPlayByFrame("Walk", MathUtil.random(0, 20), 0);
			}
			this.life = this.maxLife;
			this.haemalStrand.width = this.haemalStrandWidth;
			this.isAlive = true;
			let varsData: IMonsterVars = this.varsData as IMonsterVars
			if (varsData.operation) {
				for (let i: number = 0; i < varsData.operation.length; i++) {
					this._registerAry.push(OperationManager.instance.registerOperation(this, varsData.operation[i].type));
				}
			}
		}

		public get dragonBones(): dragonBones.EgretArmatureDisplay {
			return this._dragonBones;
		}

		/**
		 * 移除行为
		 */
		public unregisterOperation(): void {
			for (let i: number = 0; i < this._registerAry.length; i++) {
				OperationManager.instance.unregisterOperation(this._registerAry[i])
			}
			this._registerAry.length = 0;
		}


        /**
         * 反初始化
         */
		public uninitialize(): void {
			if (this._moviePlayer) {
				this._moviePlayer.stop();
			}
			if (this._dragonBones) {
				this._dragonBones.animation.stop();
			}
			if (this.parent) {
				this.parent.removeChild(this);
			}
			this.unregisterOperation();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._registerAry.length = 0
			this.haemalStrand = null;
			this.haemalStrandFrame = null;
			super.dispose();
		}
	}
}
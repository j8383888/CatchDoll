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
		 * 移动速度
		 */
		public speed: number = 0;
		/**
		 * 原移动速度
		 */
		public configSpeed: number = 0;
		/**
		 * 血条
		 */
		public haemalStrand: eui.Image;
		/**
		 * 血条框
		 */
		public haemalStrandFrame: eui.Image;
		/**
		 * 血条遮罩
		 */
		public haemalStrandMask: eui.Image;
		/**
		 * 血条初始长度
		 */
		public haemalStrandWidth: number = 100;
		/**
		 * 血条容器
		 */
		public haemalGroup: egret.DisplayObjectContainer;
		/**
		 * 偏移
		 */
		public offsetY: number = 0;
		/**
		 * 开始时间
		 */
		public startTime: number = 0;

		/**
		 * 是否禁足
		 */
		public isStopMove: boolean = false;
		/**
		 * 是否隐藏
		 */
		public isHide: boolean = false;
		/**
		 * 是否减速
		 */
		public isSlowMove: boolean = false;
		/**
		 * 已经移动距离
		 */
		public moveDistance: number = 0;

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
			this.configSpeed = data.speed;

			this.maxLife = data.life;
			this.haemalStrand = new eui.Image();


			this.haemalStrand.source = "battle_13"
			this.haemalStrandFrame = new eui.Image();
			this.haemalStrandFrame.source = "battle_10";
			this.haemalStrandFrame.scale9Grid = new egret.Rectangle(10, 10, 27, 2);
			this.haemalStrand.scale9Grid = new egret.Rectangle(10, 10, 27, 2);
			this.haemalStrandMask = new eui.Image();
			this.haemalStrandMask.scale9Grid = new egret.Rectangle(10, 10, 27, 2);
			this.haemalStrandMask.source = "battle_13"

			this.haemalStrandMask.y = this.haemalStrand.y = this.haemalStrandFrame.y = -100;
			this.haemalStrandMask.width = this.haemalStrand.width = this.haemalStrandFrame.width = this.haemalStrandWidth;
			this.haemalStrandMask.x = this.haemalStrandFrame.x = this.haemalStrand.x = -this.haemalStrand.width / 2
			this.haemalGroup = new egret.DisplayObjectContainer();
			this.addChild(this.haemalGroup)
			this.haemalGroup.addChild(this.haemalStrand);
			this.haemalGroup.addChild(this.haemalStrandFrame);

			this.haemalGroup.addChild(this.haemalStrandMask);
			this.haemalStrand.mask = this.haemalStrandMask;


		}

		private _createEff(): egret.MovieClip {
			let mov = UIUtil.creatMovieClip("enterEff" + 5/*MathUtil.random(1, 3)*/)
			// mov.blendMode = egret.BlendMode.ADD
			return mov;
		}

		public initOther(): void {
			if (this.sign >= 10 && this.sign <= 14) {
				this.offsetY = 180;
			}
			else {
				this.offsetY = 140;
			}
		}

		/**
		 * isSlow true:减速开始, false:减速结束
		 */
		public slowMove(isSlow: boolean): void {
			this.isSlowMove = isSlow;
			let now = egret.getTimer();
			this.moveDistance += this.speed * (now - this.startTime) / 1000;
			this.startTime = now;
			if (this.isSlowMove) {
				this.speed = this.configSpeed - 100;
			}
			else {
				this.speed = this.configSpeed
			}
		}

		/**
		 * 隐藏
		 */
		public hide(isHide: boolean): void {
			if (isHide == this.isHide) {
				return;
			}
			this.isHide = isHide
			if (this.isHide) {
				this.alpha = 0.5
			}
			else {
				this.alpha = 1;
			}
		}

		/**
		 * 禁止移动
		 */
		public stopMove(): void {
			this.isStopMove = true;
			this.startTime += 4000;
			Laya.timer.once(4000, this, this._recoverMove)
		}

		private _recoverMove(): void {
			this.isStopMove = false;
		}

		/**
         * 初始化
         */
		public initialize(): void {
			super.initialize();
			this.isHide = false;
			this.moveDistance = 0;
			if (this._dragonBones) {
				this._dragonBones.animation.gotoAndPlayByFrame("Walk", MathUtil.random(0, 20), 0);
			}
			this.life = this.maxLife;
			this.haemalStrandMask.width = this.haemalStrandWidth;
			let varsData: IMonsterVars = this.varsData as IMonsterVars

			let exportData = varsData.exportData[0];
			this.x = exportData.x;
			this.y = exportData.y;
			this.alpha = 0
			this.isOpen = false;
			egret.Tween.get(this).to({ alpha: 1 }, 2000).call(() => {
				this.isOpen = true;
				if (varsData.operation) {
					for (let i: number = 0; i < varsData.operation.length; i++) {
						this._registerAry.push(OperationManager.instance.registerOperation(this, varsData.operation[i].type));
					}
				}
			})


			let mov: egret.MovieClip = Pool.getItemByCreateFun(Pool.enterEff, Handler.create(this, this._createEff))

			mov.alpha = 0;

			mov.x = varsData.exportData[0].x;
			mov.y = varsData.exportData[0].y;
			mov.gotoAndPlay(1, -1);
			LayerManager.instance.addToLayer(mov, LAYER.BATTLE_HIGH)

			egret.Tween.get(mov).to({ alpha: 1 }, 1000).wait(500).to({ alpha: 0 }, 500).call(() => {
				mov.stop();
				Pool.recover(Pool.enterEff, mov);
				LayerManager.instance.removeFromLayer(mov, LAYER.BATTLE_HIGH)
			})
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

			this.unregisterOperation();
			if (this.isStopMove) {
				this.isStopMove = false;
				Laya.timer.clear(this, this._recoverMove);
			}
			super.uninitialize();
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
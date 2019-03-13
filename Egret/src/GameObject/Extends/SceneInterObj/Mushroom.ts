module catchDoll {
	export class Mushroom extends SceneInteractiveObject {

		public bitmapLabel: eui.BitmapLabel = new eui.BitmapLabel();

		public time: number = 5;

		public constructor() {
			super();
		}

		public initOther(): void {
			if (this.sign == GAMEOBJECT_SIGN.Mushroom_GREEN) {
				this.bitmapLabel.font = "font_1_fnt"
			}
			else {
				this.bitmapLabel.font = "font_2_fnt"
			}
			this.bitmapLabel.textAlign = "center";
			this.bitmapLabel.y = -150;
			this.bitmapLabel.x = -100;
			this.bitmapLabel.width = 200;
			this.addChild(this.bitmapLabel);
		}

		public initialize(): void {
			super.initialize();
			this.isMonsterHitOpen = false;
			this._dragonBones.animation.play(this.actionNameAry[1], 0);
			this._resetTime();
			Laya.timer.loop(1000, this, this._onTrigger)
		}

		/**
		 * 触发
		 */
		private _onTrigger(): void {
			this.time--;
			this.bitmapLabel.text = this.time.toString();
			if (this.time == 0) {
				Laya.timer.clear(this, this._onTrigger)
				this._dragonBones.animation.play(this.actionNameAry[0], 1);

				this._dragonBones.once(dragonBones.EgretEvent.COMPLETE, this._onComplete, this)

				let monsterMap = LevelCreate.inSenceMonsterMap
				let monsterMapLen: number = monsterMap.length;
				if (monsterMapLen == 0) {
					return;
				}

				let i: number = 0;
				for (i = 0; i < monsterMapLen; i++) {
					let monster: Monster = monsterMap.values[i];
					if (!monster.isOpen) {
						continue;
					}
					let monsterColliderAry = monster.colliderAry
					if (GameObjectCollider.isIntersect(monsterColliderAry, this.hitMonsterColliderAry)) {
						monster.slowMove(true)
						Laya.timer.once(5000, null, () => {
							monster.slowMove(false)
						})
					}
				}
			}
		}

		/**
		 * 重置时间
		 */
		private _resetTime(): void {
			this.time = 5;
			this.bitmapLabel.text = "5";
		}

		/**
		 * 动画完毕
		 */
		private _onComplete(): void {
			this._dragonBones.animation.play(this.actionNameAry[1], 0);
			Laya.timer.loop(1000, this, this._onTrigger);
			this._resetTime();
		}

		public uninitialize(): void {
			this._dragonBones.removeEventListener(dragonBones.EgretEvent.COMPLETE, this._onComplete, this);
			Laya.timer.clear(this, this._onTrigger)
			super.uninitialize();
		}
	}
}
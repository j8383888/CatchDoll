/**
 * 图鉴面板
 * @author suo 
 */
module catchDoll {
	export class IllustrationsPanel extends BasePopPanel implements IBaseSimpleUI {

		/**
		 * 切换按钮组
		 */
		private _toggleButtonGroup: ToggleButtonGroup = new ToggleButtonGroup();
		/**
		 * 项组
		 */
		private itemGroup: eui.Group;
		/**
		 * 项list
		 */
		private _itemList: illustrationsItem[] = [];
		/**
		 * 上一次在舞台中央对象
		 */
		private _lastStageCenterTarget: dragonBones.EgretArmatureDisplay | eui.Image = null;
		/**
		 * 显示容器
		 */
		public group: eui.Group;
		/**
		 * 名字Label
		 */
		public nameLabel: eui.Label;
		/**
		 * 碎片图片
		 */
		public fragmentImg: eui.Image;
		/** 
		 * 碎片顶部图片
		 */
		public fragmentTopImg: eui.Image;

		/**
		 * 选中背景
		 */
		private readonly SELECT_BG_SOURCE: string = "otherRes2_6";
		/**
		 * 未选中背景
		 */
		private readonly UN_SELECT_BG_SOURCE: string = "otherRes2_5";


		public constructor() {
			super();
			this.skinName = "illustrationsPanelSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {

			for (let i: number = 1; i < 5; i++) {
				this.skin["pro" + i].mask = this.skin["mask" + i]
			}
			let toggle1: ToggleButton = new ToggleButton(this.skin["switchBtn1"])
			let toggle2: ToggleButton = new ToggleButton(this.skin["switchBtn2"])
			toggle1.selectHandler = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle1).source = this.SELECT_BG_SOURCE;
				this._clear();
				this._showMonster(1)
				this._showAllMonster();
			})
			toggle1.cancelHanlder = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle1).source = this.UN_SELECT_BG_SOURCE;
			})
			toggle2.selectHandler = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle2).source = this.SELECT_BG_SOURCE;
				this._clear();
				this._showClip(1)
				this._showAllClip();

			})
			toggle2.cancelHanlder = Handler.create(null, () => {
				this._getSwitchBtnBG(toggle2).source = this.UN_SELECT_BG_SOURCE;
			})

			this._toggleButtonGroup.push(toggle1);
			this._toggleButtonGroup.push(toggle2);
			this._toggleButtonGroup.clickByIndex = 0
		}

		/**
		 * 获得切换按钮背景
		 */
		private _getSwitchBtnBG(btn: Button): eui.Image {
			return (btn.root as eui.Group).getChildAt(0) as eui.Image
		}

		/**
		 * 显示时
		 */
		public onShow(): void {
			this.addToStage();
			this.closeBtnHandler = Handler.create(null, () => {
				SimpleUICenter.instance.closeUI(SIMPLE_UI.illustrations);
			}, null, true)
		}

		/**
		 * 清除
		 */
		private _clear(): void {
			for (let item of this._itemList) {
				if (item.renderTarget instanceof dragonBones.EgretArmatureDisplay) {
					item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickMonster, this)
				}
				else {
					item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickClip, this)
				}
				item.dispose();
				item = null;
			}
			this._itemList.length = 0;
			this.itemGroup.removeChildren();
			this.group.removeChildren()
			if (this._lastStageCenterTarget) {
				if (this._lastStageCenterTarget instanceof dragonBones.EgretArmatureDisplay) {
					this._lastStageCenterTarget.dispose();
				}
				this._lastStageCenterTarget = null;
			}

		}

		/**
		 * 点击夹子
		 */
		private _clickClip(e: egret.TouchEvent): void {
			this._showClip(e.currentTarget.id);
		}

		/**
		 * 显示一枚夹子
		 */
		private _showClip(id: number): void {
			this.group.removeChildren();
			let data = ConfigParse.getWholeByProperty(TableCenter.instance.ClipTable, "id", id.toString()) as table.ClipTable;
			this._lastStageCenterTarget = new eui.Image();
			this._lastStageCenterTarget.horizontalCenter = 0;
			this._lastStageCenterTarget.bottom = 20;
			this._lastStageCenterTarget.source = data.render;
			this.group.addChild(this._lastStageCenterTarget);
			this.nameLabel.text = data.name;
			this.fragmentImg.source = "fragment_" + data.level;
			this.fragmentTopImg.source = "fragment_10" + data.level
		}

		/**
		 * 显示所有怪物
		 */
		private _showAllMonster(): void {
			let table = TableCenter.instance.MonsterTable;
			for (let i: number = 0; i < table.length; i++) {
				if (table[i].showInIllustrations) {
					let item = new illustrationsItem();
					item.setData(table[i].id, table[i].name, table[i].dragonBones, true)
					item.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickMonster, this)
					this.itemGroup.addChild(item);
					this._itemList.push(item);
				}
			}
		}

		/**
		 * 显示一只怪物
		 */
		private _showMonster(id: number): void {
			if (this._lastStageCenterTarget) {
				this.group.removeChild(this._lastStageCenterTarget)
				if (this._lastStageCenterTarget instanceof dragonBones.EgretArmatureDisplay) {
					this._lastStageCenterTarget.dispose();
				}
				this._lastStageCenterTarget = null;
			}

			let data = ConfigParse.getWholeByProperty(TableCenter.instance.MonsterTable, "id", id.toString()) as table.MonsterTable;
			this._lastStageCenterTarget = UIUtil.creatDragonbones(data.dragonBones)
			this.group.addChild(this._lastStageCenterTarget);
			this.group.width = this._lastStageCenterTarget.width;
			this.group.height = this._lastStageCenterTarget.height;
			this._lastStageCenterTarget.animation.play(null, 0)
			this._lastStageCenterTarget.x = this.group.width / 2
			this._lastStageCenterTarget.y = this.group.height / 2
			let life = data.life;
			let moveSpeed = data.moveSpeed;
			let skill = data.skill;
			let power = data.power;
			this.skin["v1"].text = life;
			this.skin["v2"].text = moveSpeed;
			this.skin["v3"].text = skill;
			this.skin["v4"].text = power;
			let v1 = life / 500 * 77;
			let v2 = moveSpeed / 300 * 77;
			let v3 = skill / 5 * 77;
			let v4 = power / 5 * 77;
			egret.Tween.get(this.skin["mask1"], null, null, true).set({ width: 0 }).to({ width: v1 }, 300, egret.Ease.quadIn)
			egret.Tween.get(this.skin["mask2"], null, null, true).set({ width: 0 }).to({ width: v2 }, 300, egret.Ease.quadIn)
			egret.Tween.get(this.skin["mask3"], null, null, true).set({ width: 0 }).to({ width: v3 }, 300, egret.Ease.quadIn)
			egret.Tween.get(this.skin["mask4"], null, null, true).set({ width: 0 }).to({ width: v4 }, 300, egret.Ease.quadIn)
			this.nameLabel.text = data.name;
			this.fragmentImg.source = "fragment_" + data.level;
			this.fragmentTopImg.source = "fragment_10" + data.level
		}

		/**
		 * 显示夹子
		 */
		private _showAllClip(): void {
			let table = TableCenter.instance.ClipTable;
			for (let i: number = 0; i < table.length; i++) {
				let item = new illustrationsItem();
				item.setData(table[i].id, table[i].name, table[i].render, false)
				item.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickClip, this);
				this.itemGroup.addChild(item);
				this._itemList.push(item);
			}
		}

		/**
		 * 点击
		 */
		private _clickMonster(e: egret.TouchEvent): void {
			this._showMonster(e.currentTarget.id)
		}


		/**
		 * 隐藏时
		 */
		public onHide(): void {

		}

		/**
		 * 释放
		 */
		public dispose(): void {
			for (let item of this._itemList) {
				if (item instanceof dragonBones.EgretArmatureDisplay) {
					item.dispose();
					item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickMonster, this)
				}
				else {
					item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickClip, this)
				}
				item = null;
			}
			this._itemList.length = 0;
			this._itemList = null
			this._toggleButtonGroup.dispose();
			this._toggleButtonGroup = null;
			super.dispose();
		}
	}
}
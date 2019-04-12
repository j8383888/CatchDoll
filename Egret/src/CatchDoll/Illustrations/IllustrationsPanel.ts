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
		private _itemList: any[] = [];
		/**
		 * 上一次的龙骨
		 */
		private _lastMonster: dragonBones.EgretArmatureDisplay = null;
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

		/**
		 * 上一次的夹子
		 */
		private _lastClip: eui.Image;


		public constructor() {
			super();
			this.skinName = "illustrationsPanelSkin";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {

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
			this.itemGroup.removeChildren();
			this.group.removeChildren()
			if (this._lastMonster) {
				this._lastMonster.dispose();
				this._lastMonster = null;
			}
			if (this._lastClip) {
				this._lastClip = null;
			}

		}

		/**
		 * 点击夹子
		 */
		private _clickClip(e: egret.TouchEvent): void {
			this._showClip(e.target.name);
		}

		/**
		 * 显示一枚夹子
		 */
		private _showClip(id: number): void {
			this.group.removeChildren();
			let data = ConfigParse.getWholeByProperty(TableCenter.instance.ClipTable, "id", id.toString()) as table.ClipTable;
			this._lastClip = new eui.Image();
			this._lastClip.horizontalCenter = 0;
			this._lastClip.bottom = 20;
			this._lastClip.source = data.render;
			this.group.addChild(this._lastClip);
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
					let dragon: dragonBones.EgretArmatureDisplay = UIUtil.creatDragonbones(table[i].dragonBones);
					dragon.touchEnabled = true;
					let group = new eui.Group();
					group.width = dragon.width;
					group.height = 200;

					dragon.animation.play(null, 0)
					dragon.x = dragon.width / 2
					dragon.y = group.height - dragon.height / 2
					group.addChild(dragon);
					dragon.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickMonster, this)
					dragon.name = table[i].id.toString();
					this.itemGroup.addChild(group);
					this._itemList.push(dragon);
				}
			}
		}

		/**
		 * 显示一只怪物
		 */
		private _showMonster(id: number): void {
			if (this._lastMonster) {
				this.group.removeChild(this._lastMonster)
				this._lastMonster.dispose();
				this._lastMonster = null;
			}

			let data = ConfigParse.getWholeByProperty(TableCenter.instance.MonsterTable, "id", id.toString()) as table.MonsterTable;
			this._lastMonster = UIUtil.creatDragonbones(data.dragonBones)
			this.group.addChild(this._lastMonster);
			this.group.width = this._lastMonster.width;
			this.group.height = this._lastMonster.height;
			this._lastMonster.animation.play(null, 0)
			this._lastMonster.x = this.group.width / 2
			this._lastMonster.y = this.group.height / 2
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
				let img = new eui.Image();
				img.source = table[i].render;
				img.name = table[i].id.toString();
				img.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickClip, this);
				this.itemGroup.addChild(img);
				this._itemList.push(img);
			}
		}

		/**
		 * 点击
		 */
		private _clickMonster(e: egret.TouchEvent): void {
			this._showMonster(e.target.name)
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
/**
 * 层级管理
 * @author suo
 */
module catchDoll {
	export class LayerManager {
		/**
		 * 单例
		 */
		private static _instance: LayerManager;
		/**
		 * 层级字典
		 */
		private _layerMap: SimpleMap<egret.DisplayObjectContainer> = new SimpleMap<egret.DisplayObjectContainer>();
		/**
		 * 跟节点
		 */
		private _root: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		/**
		 * Y方向适配偏移
		 */
		public adapteOffsetY: number = 0;

		constructor() {
			egret.MainContext.instance.stage.addChild(this._root);
			for (let i: number = LAYER.BG; i < LAYER.LOADING + 1; i++) {
				let layer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
				this._layerMap.set(i, layer);
				this._root.addChild(layer);
			}

			this.adapteOffsetY = (GameCenter.stageH - 1280) / 2
		}

		/**
		 * 获得单例
		 */
		public static get instance(): LayerManager {
			if (this._instance == null) {
				this._instance = new LayerManager();
			}
			return this._instance;
		}

		/**
		 * 添加到对应层级
		 */
		public addToLayer(source: egret.DisplayObject, layerType: LAYER): void {
			var layer: egret.DisplayObjectContainer = this._layerMap.get(layerType);
			if (layer != null) {
				layer.addChild(source);
			}
			else {
				console.assert(false, "不存在该layerType！")
			}


		}


		/**
		 * 移除
		 */
		public removeFromLayer(source: egret.DisplayObject, layerType?: LAYER): void {
			if (source) {
				if (layerType) {
					let layer: egret.DisplayObjectContainer = this._layerMap.get(layerType);
					if (layer != null) {
						layer.removeChild(source);
					}
				}
				else {
					UIUtil.removeSelf(source);
				}
			}
			else {
				console.assert(false, "source为空！")
			}

		}


		/**
		 * 获得层级
		 */
		public getLayer(layerType: LAYER): egret.DisplayObjectContainer {
			return this._layerMap.get(layerType);
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._layerMap.clear();
		}
	}
}

/**
 * 层级
 */
const enum LAYER {
	BG,
	WorldMap,
	BattleChapter,
	UI,

	BATTLE_LOW,
	/*场景低层*/
	BATTLE_SCENE,
	BATTLE_EFFECT_LOW,
	SCENE_INTERACTIVE_LOW,
	/*可交互对象*/
	SCENE_INTERACTIVE_HIGH,

	/*怪物层*/
	MONSTER,
	/*场景特效层*/
	BATTLE_EFFECT_HIGH,
	/*场景高层*/
	BATTLE_HIGH,
	/*场景操作层*/
	BATTLE_OP,
	POP,
	EFFECT,
	LOADING,
}
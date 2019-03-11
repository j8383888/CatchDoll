/**
 * UI工具
 * @author suo
 */
import Point = egret.Point;

class UIUtil {

	public constructor() {
	}

	/** 
	 * @param contentBox 内容盒子
	 * @param item 项
	 * @param num 总数量
	 * @param col 列
	 * @param spacing 左右间距
	 * @param lending 垂直间距
	 * @param offsetX X偏移
	 * @param offsetY Y偏移
	 * @return itemList 项list
	 * 网格布局
	 */
	public static setItemGridLayout(contentBox: egret.DisplayObjectContainer, item: egret.DisplayObject, num: number, col: number, spacing: number = 0,
		lending: number = 0, offsetX: number = 0, offsetY: number = 0): void {
		for (var i: number = 0; i < num; i++) {
			var pos: [number, number] = this.getGridItemPos(i, item, col, spacing, lending, offsetX, offsetY)
			item.x = pos[0];
			item.y = pos[1];
			contentBox.addChild(item);
		}
	}

	/**
	 * 传入索引 获得该Index Item坐标
	 */
	public static getGridItemPos(index: number, item: egret.DisplayObject, col: number, spacing: number = 0,
		lending: number = 0, offsetX: number = 0, offsetY: number = 0): [number, number] {
		/**列数量*/
		var x: number = (index % col) * (item.width + spacing) + offsetX;
		var y: number = Math.floor(index / col) * (item.height + lending) + offsetY;
		return [x, y];
	}

	/**
	 * 置灰
	 */
	public static setGray(target: egret.DisplayObject): void {
		var matrix: Array<number> = [0.3086, 0.6094, 0.0820, 0, 0,// red
			0.3086, 0.6094, 0.0820, 0, 0,// green
			0.3086, 0.6094, 0.0820, 0, 0,// blue
			0, 0, 0, 1, 0];
		var stateFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(matrix);
		target.filters = [stateFilter];
	}

	/**
	 * 恢复正常
	 */
	public static setNomarl(target: egret.DisplayObject): void {
		if (target) {
			target.filters = [];
		}
	}

	/**
	 * 高亮
	 */
	public static setLight(target: egret.DisplayObject): void {
		var matrix: Array<number> = [1, 0, 0, 0, 0xff * 0.2, // red
			0, 1, 0, 0, 0xe0 * 0.2, // green
			0, 0, 1, 0, 0x8d * 0.2, // blue
			0, 0, 0, 1, 0];// alpha
		var stateFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(matrix);
		target.filters = [stateFilter];
	}

	/**
	 * 变红色
	 */
	public static setRed(target: egret.DisplayObject): void {
		var matrix: Array<number> = [1, 0.964, 0.999, 0.96, 0xff * 0.2, // red
			0, 1, 0, 0, 0, // green
			0, 1, 1, 0, 0, // blue
			0, 0, 0, 1, 0];// alpha
		var stateFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(matrix);
		target.filters = [stateFilter];
	}


	/**
	 * 从显示列表内移除自身
	 */
	public static removeSelf(...rest) {
		var len: number = rest.length
		for (var i: number = 0; i < len; i++) {
			var target = rest[i];
			if (egret.is(target, "egret.DisplayObject")) {
				if (target && target.parent) {
					target.parent.removeChild(target);
				}
			}
		}
	}



	/**
	 * 创建影片剪辑
	 */
	public static creatMovieClip(groupName: string, action: string = "action"): egret.MovieClip {
		var data: JSON = RES.getRes(groupName + "_json");
		var txtr = RES.getRes(groupName + "_png");
		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		return new egret.MovieClip(mcFactory.generateMovieClipData(action));
	}




	/**
	 * 循环加法
	 */
	public static circleAdd(value: number, addNum: number, maxNum: number): number {
		value += addNum;
		if (value > maxNum) {
			value -= maxNum;
		}
		return value;
	}





	/**
	 * 通过角度获得弧度
	 */
	public static getRadian(angle: number): number {
		return angle * Math.PI / 180;
	}

	/**
	 * 通过弧度获得角度
	 */
	public static getAngle(radian: number): number {
		return radian * 180 / Math.PI;
	}

	/**
	 * 设置对象跳跃动画
	 */
	public static setJumpTween(target: egret.DisplayObject, JumpMaxY: number, JumpMinY: number, durationTime: number = 1000, waitTime: number = MathUtil.random(0, 3000)): void {
		egret.Tween.get(target).to({ scaleX: 1, scaleY: 1, y: JumpMinY }, durationTime, egret.Ease.bounceOut).wait(waitTime).call(() => {
			egret.Tween.get(target).to({ scaleX: 0.9, scaleY: 1.1, y: JumpMaxY }, durationTime, egret.Ease.bounceIn).call(this.setJumpTween, this, [target, JumpMaxY, JumpMinY, durationTime])
		}, this);
	}

	/**
	 * 设置对象呼吸动画
	 */
	public static setBreatheTween(target: egret.DisplayObject, durationTime: number): void {
		egret.Tween.get(target).to({ alpha: 0 }, durationTime).call(() => {
			egret.Tween.get(target).to({ alpha: 1 }, durationTime).wait(500).call(this.setBreatheTween, this, [target, durationTime])
		}, this);
	}

	/**
	 * 设置对象缩放动画
	 */
	public static setScaleTween(target: egret.DisplayObject, scaleXGene: number, scaleYGene: number, durationTime: number = 600): void {
		egret.Tween.get(target).to({ scaleX: 1.1 * scaleXGene, scaleY: 1.1 * scaleYGene }, durationTime).call(() => {
			egret.Tween.get(target).to({ scaleX: 0.9 * scaleXGene, scaleY: 0.9 * scaleYGene }, durationTime).call(this.setScaleTween, this, [target, scaleXGene, scaleYGene, durationTime])
		}, this);
	}

	/**
	 * 设置对象上下移动动画
	 */
	public static setDownUpTween(target: egret.DisplayObject, MaxY: number, MinY: number, durationTime: number = 1000): void {
		egret.Tween.get(target).to({ y: MaxY }, durationTime).call(() => {
			egret.Tween.get(target).to({ y: MinY }, durationTime).call(this.setDownUpTween, this, [target, MaxY, MinY, durationTime])
		}, this);
	}

	/**
	 * 局部坐标转全局
	 */
	public static localToGlobal(target: egret.DisplayObject, localX: number = 0, localY: number = 0): [number, number] {
		let p: egret.Point = Point.create(0, 0);
		p = target.localToGlobal(localX, localY, p);
		let x: number = p.x;
		let y: number = p.y;
		Point.release(p);
		return [x, y];
	}

	/**
	 * 创建龙骨
	 */
	public static creatDragonbones(groupName: string, armatureName = "armatureName"): dragonBones.EgretArmatureDisplay {
		let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
		if (egretFactory.getDragonBonesData(groupName) == null) {
			var dragonbonesData = RES.getRes(groupName + "_ske_dbbin");
			var textureData = RES.getRes(groupName + "_tex_json");
			var texture = RES.getRes(groupName + "_tex_png");
			egretFactory.parseDragonBonesData(dragonbonesData, groupName);
			egretFactory.parseTextureAtlasData(textureData, texture, groupName);
		}
		let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(armatureName, groupName);
		return armatureDisplay;
	}
	/**
	 * 获取俩点的弧度
	 */
	public static getRadianByPoint(p1: { x: number, y: number }, p2: { x: number, y: number }): number {

		let px = p1.x;
		let py = p1.y;
		let mx = p2.x;
		let my = p2.y;
		var x = Math.abs(px - mx);
		var y = Math.abs(py - my);
		var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		var cos = y / z;
		var radina = Math.acos(cos);
		var radian = Math.floor(180 / (Math.PI / radina));

		if (mx > px && my > py) {
			radian = 180 - radian;
		}
		if (mx == px && my > py) {
			radian = 180;
		}
		if (mx > px && my == py) {
			radian = 90;
		}
		if (mx < px && my > py) {
			radian = 180 + radian;
		}
		if (mx < px && my == py) {
			radian = 270;
		}
		if (mx < px && my < py) {
			radian = 360 - radian;
		}
		return radian;
	}
	/**
	 *获取俩点的距离 
	 */
	public static getDistanceByPoint(p1: { x: number, y: number }, p2: { x: number, y: number }): number {
		var x = Math.abs(p1.x - p2.x);
		var y = Math.abs(p1.y - p2.y);
		return Math.sqrt(x * x + y * y);
	}
}





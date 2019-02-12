var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * UI工具
 * @author suo
 */
var Point = egret.Point;
var UIUtil = (function () {
    function UIUtil() {
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
    UIUtil.setItemGridLayout = function (contentBox, item, num, col, spacing, lending, offsetX, offsetY) {
        if (spacing === void 0) { spacing = 0; }
        if (lending === void 0) { lending = 0; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        for (var i = 0; i < num; i++) {
            var pos = this.getGridItemPos(i, item, col, spacing, lending, offsetX, offsetY);
            item.x = pos[0];
            item.y = pos[1];
            contentBox.addChild(item);
        }
    };
    /**
     * 传入索引 获得该Index Item坐标
     */
    UIUtil.getGridItemPos = function (index, item, col, spacing, lending, offsetX, offsetY) {
        if (spacing === void 0) { spacing = 0; }
        if (lending === void 0) { lending = 0; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        /**列数量*/
        var x = (index % col) * (item.width + spacing) + offsetX;
        var y = Math.floor(index / col) * (item.height + lending) + offsetY;
        return [x, y];
    };
    /**
     * 置灰
     */
    UIUtil.setGray = function (target) {
        var matrix = [0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0];
        var stateFilter = new egret.ColorMatrixFilter(matrix);
        target.filters = [stateFilter];
    };
    /**
     * 恢复正常
     */
    UIUtil.setNomarl = function (target) {
        if (target) {
            target.filters = [];
        }
    };
    /**
     * 高亮
     */
    UIUtil.setLight = function (target) {
        var matrix = [1, 0, 0, 0, 0xff * 0.2,
            0, 1, 0, 0, 0xe0 * 0.2,
            0, 0, 1, 0, 0x8d * 0.2,
            0, 0, 0, 1, 0]; // alpha
        var stateFilter = new egret.ColorMatrixFilter(matrix);
        target.filters = [stateFilter];
    };
    /**
     * 变红色
     */
    UIUtil.setRed = function (target) {
        var matrix = [1, 0.964, 0.999, 0.96, 0xff * 0.2,
            0, 1, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 0, 1, 0]; // alpha
        var stateFilter = new egret.ColorMatrixFilter(matrix);
        target.filters = [stateFilter];
    };
    /**
     * 从显示列表内移除自身
     */
    UIUtil.removeSelf = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        var len = rest.length;
        for (var i = 0; i < len; i++) {
            var target = rest[i];
            if (egret.is(target, "egret.DisplayObject")) {
                if (target && target.parent) {
                    target.parent.removeChild(target);
                }
            }
        }
    };
    /**
     * 创建影片剪辑
     */
    UIUtil.creatMovieClip = function (groupName, action) {
        if (action === void 0) { action = "action"; }
        var data = RES.getRes(groupName + "_json");
        var txtr = RES.getRes(groupName + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        return new egret.MovieClip(mcFactory.generateMovieClipData(action));
    };
    /**
     * 循环加法
     */
    UIUtil.circleAdd = function (value, addNum, maxNum) {
        value += addNum;
        if (value > maxNum) {
            value -= maxNum;
        }
        return value;
    };
    /**
     * 通过角度获得弧度
     */
    UIUtil.getRadian = function (angle) {
        return angle * Math.PI / 180;
    };
    /**
     * 通过弧度获得角度
     */
    UIUtil.getAngle = function (radian) {
        return radian * 180 / Math.PI;
    };
    /**
     * 设置对象跳跃动画
     */
    UIUtil.setJumpTween = function (target, JumpMaxY, JumpMinY, durationTime, waitTime) {
        var _this = this;
        if (durationTime === void 0) { durationTime = 1000; }
        if (waitTime === void 0) { waitTime = MathUtil.random(0, 3000); }
        egret.Tween.get(target).to({ scaleX: 1, scaleY: 1, y: JumpMinY }, durationTime, egret.Ease.bounceOut).wait(waitTime).call(function () {
            egret.Tween.get(target).to({ scaleX: 0.9, scaleY: 1.1, y: JumpMaxY }, durationTime, egret.Ease.bounceIn).call(_this.setJumpTween, _this, [target, JumpMaxY, JumpMinY, durationTime]);
        }, this);
    };
    /**
     * 设置对象呼吸动画
     */
    UIUtil.setBreatheTween = function (target, durationTime) {
        var _this = this;
        egret.Tween.get(target).to({ alpha: 0 }, durationTime).call(function () {
            egret.Tween.get(target).to({ alpha: 1 }, durationTime).wait(500).call(_this.setBreatheTween, _this, [target, durationTime]);
        }, this);
    };
    /**
     * 设置对象缩放动画
     */
    UIUtil.setScaleTween = function (target, scaleXGene, scaleYGene, durationTime) {
        var _this = this;
        if (durationTime === void 0) { durationTime = 600; }
        egret.Tween.get(target).to({ scaleX: 1.1 * scaleXGene, scaleY: 1.1 * scaleYGene }, durationTime).call(function () {
            egret.Tween.get(target).to({ scaleX: 0.9 * scaleXGene, scaleY: 0.9 * scaleYGene }, durationTime).call(_this.setScaleTween, _this, [target, scaleXGene, scaleYGene, durationTime]);
        }, this);
    };
    /**
     * 设置对象上下移动动画
     */
    UIUtil.setDownUpTween = function (target, MaxY, MinY, durationTime) {
        var _this = this;
        if (durationTime === void 0) { durationTime = 1000; }
        egret.Tween.get(target).to({ y: MaxY }, durationTime).call(function () {
            egret.Tween.get(target).to({ y: MinY }, durationTime).call(_this.setDownUpTween, _this, [target, MaxY, MinY, durationTime]);
        }, this);
    };
    /**
     * 局部坐标转全局
     */
    UIUtil.localToGlobal = function (target, localX, localY) {
        if (localX === void 0) { localX = 0; }
        if (localY === void 0) { localY = 0; }
        var p = Point.create(0, 0);
        p = target.localToGlobal(localX, localY, p);
        var x = p.x;
        var y = p.y;
        Point.release(p);
        return [x, y];
    };
    return UIUtil;
}());
__reflect(UIUtil.prototype, "UIUtil");
//# sourceMappingURL=UIUtil.js.map
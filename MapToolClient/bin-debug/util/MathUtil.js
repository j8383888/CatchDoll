var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     * 两个整数之间随机
     */
    MathUtil.random = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
//# sourceMappingURL=MathUtil.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ColorUtil = (function () {
    function ColorUtil() {
    }
    ColorUtil.COLOR_WHITE = 0xffffff;
    ColorUtil.COLOR_BLACK = 0x000000;
    ColorUtil.COLOR_RED = 0xFF0000;
    /*米色*/
    ColorUtil.COLOR_BUFF = 0xFFE7BA;
    ColorUtil.COLOR_YELLOW = 0xE9FC1E;
    ColorUtil.COLOR_GREEN = 0x3CEA68;
    ColorUtil.COLOR_ORANGE = 0xFF7F24;
    /*淡棕色*/
    ColorUtil.COLOR_MAPLE = 0xDCBF9C;
    ColorUtil.COLOR_GOLD = 0xFFD700;
    /*阴影颜色*/
    ColorUtil.COLOR_SHADOW = 0x0C0901;
    ColorUtil.STR_COLOR_WHITE = "0xffffff";
    ColorUtil.STR_COLOR_BLACK = "0x000000";
    ColorUtil.STR_COLOR_RED = "0xFF0000";
    return ColorUtil;
}());
__reflect(ColorUtil.prototype, "ColorUtil");
//# sourceMappingURL=ColorUtil.js.map
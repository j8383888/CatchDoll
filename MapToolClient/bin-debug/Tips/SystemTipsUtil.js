var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SystemTipsUtil = (function () {
    function SystemTipsUtil() {
    }
    SystemTipsUtil.showTips = function (msg) {
        new SystemTips(msg);
    };
    return SystemTipsUtil;
}());
__reflect(SystemTipsUtil.prototype, "SystemTipsUtil");
//# sourceMappingURL=SystemTipsUtil.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全局定义
 */
var catchDoll;
(function (catchDoll) {
    var GlobeConst = (function () {
        function GlobeConst() {
        }
        /*是否微信小游戏*/
        GlobeConst.isWXGame = false;
        /*是否调试模式*/
        GlobeConst.isDebug = false;
        /*地址*/
        GlobeConst.host = "";
        /*端口*/
        GlobeConst.post = -1;
        return GlobeConst;
    }());
    catchDoll.GlobeConst = GlobeConst;
    __reflect(GlobeConst.prototype, "catchDoll.GlobeConst");
})(catchDoll || (catchDoll = {}));
//# sourceMappingURL=GlobeConst.js.map
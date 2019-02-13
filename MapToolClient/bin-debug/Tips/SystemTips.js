var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SystemTips = (function (_super) {
    __extends(SystemTips, _super);
    function SystemTips(msg) {
        var _this = _super.call(this) || this;
        _this.openParam = msg;
        _this.skinName = "SystemTipsSkin";
        _this.onInit();
        _this.onShow();
        return _this;
    }
    /**
     * 初始化
     */
    SystemTips.prototype.onInit = function () {
        MapEditor.instance.addChild(this);
    };
    /**
     * 显示时
     */
    SystemTips.prototype.onShow = function () {
        var _this = this;
        this.msgLabel.text = this.openParam;
        this.y = egret.MainContext.instance.stage.stageHeight;
        egret.Tween.get(this).to({ y: (egret.MainContext.instance.stage.stageHeight - this.height) / 2 }, 400, egret.Ease.quadOut).wait(1500).to({ y: 0 - this.height }, 400, egret.Ease.quadIn).call(function () {
            _this.onHide();
        });
    };
    /**
     * 隐藏时
     */
    SystemTips.prototype.onHide = function () {
        MapEditor.instance.removeChild(this);
    };
    /**
     * 释放
     */
    SystemTips.prototype.dispose = function () {
    };
    return SystemTips;
}(eui.Component));
__reflect(SystemTips.prototype, "SystemTips");
//# sourceMappingURL=SystemTips.js.map
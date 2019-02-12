var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * PC端鼠标帮助
 * @author suo
 */
var PCMouseHelper = (function () {
    function PCMouseHelper() {
    }
    /**
     * 切换指针形状
     */
    PCMouseHelper.changeCursor = function () {
        var canvas = document.getElementsByTagName("canvas")[0];
        var style = canvas.style;
        style.cursor = 'url(cursor/cursor.png) 37.5 38,auto';
    };
    /**
     * 恢复正常
     */
    PCMouseHelper.recover = function () {
        var canvas = document.getElementsByTagName("canvas")[0];
        var style = canvas.style;
        style.cursor = 'auto';
    };
    return PCMouseHelper;
}());
__reflect(PCMouseHelper.prototype, "PCMouseHelper");
//# sourceMappingURL=PCMouseHelper.js.map
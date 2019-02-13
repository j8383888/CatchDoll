var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
if (!Array.prototype.remove) {
    Array.prototype.remove = function (value, fromIndex) {
        var index = this.indexOf(value, fromIndex);
        if (index < 0)
            return false;
        this.splice(index, 1);
        return true;
    };
}
var Extendtion = (function () {
    function Extendtion() {
    }
    return Extendtion;
}());
__reflect(Extendtion.prototype, "Extendtion");
//# sourceMappingURL=Extendtion.js.map
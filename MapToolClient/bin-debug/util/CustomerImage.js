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
/**
 * 中心点在中间的Image
 * @author suo
 */
var CustomImage = (function (_super) {
    __extends(CustomImage, _super);
    function CustomImage() {
        return _super.call(this) || this;
    }
    CustomImage.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.touchEnabled = false;
    };
    return CustomImage;
}(eui.Image));
__reflect(CustomImage.prototype, "CustomImage");
//# sourceMappingURL=CustomerImage.js.map
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
var MapEditor = (function (_super) {
    __extends(MapEditor, _super);
    function MapEditor() {
        var _this = _super.call(this) || this;
        _this.itemList = [];
        _this.skinName = "MapEditorSkin";
        _this._init();
        return _this;
    }
    /**
     * 初始化
     */
    MapEditor.prototype._init = function () {
        var len = this.itemGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var item = this.itemGroup.getElementAt(i);
            item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this);
        }
        this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSave, this);
    };
    /**
     * 保存
     */
    MapEditor.prototype._onSave = function () {
        var dataAry = [];
        for (var i = 0; i < this.itemList.length; i++) {
            var item = this.itemList[i];
            var data = { source: item.source, x: item.x, y: item.y };
            dataAry.push(data);
        }
        var json = JSON.stringify(dataAry);
        this._saveDataOnServe(json);
    };
    /**
     * 保存数据到服务器
     */
    MapEditor.prototype._saveDataOnServe = function (json) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://127.0.0.1:4000", egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // request.setRequestHeader('Access-Control-Allow-Origin', '*')
        // request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // request.setRequestHeader("Access-control-allow-methods", "GET, POST, OPTIONS, PUT, DELETE");
        request.send(json);
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    MapEditor.prototype.onGetComplete = function () {
    };
    MapEditor.prototype.onGetIOError = function () {
    };
    MapEditor.prototype.onGetProgress = function () {
    };
    MapEditor.prototype._onDown = function (e) {
        var _this = this;
        var target = e.target;
        var img = new eui.Image(target.source);
        img.x = e.stageX - target.width / 2;
        img.y = e.stageY - target.height / 2;
        this.addChild(img);
        this.itemList.push(img);
        img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.addChild(e.target);
        }, this);
        img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this, true);
    };
    /**
     * 点击
     */
    MapEditor.prototype._onMove = function (e) {
        var target = e.target;
        target.x = e.stageX - target.width / 2;
        ;
        target.y = e.stageY - target.height / 2;
        ;
    };
    MapEditor.prototype._remove = function () {
        var len = this.itemGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var item = this.itemGroup.getElementAt(i);
            item.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this);
        }
    };
    return MapEditor;
}(eui.Component));
__reflect(MapEditor.prototype, "MapEditor");
//# sourceMappingURL=MapEditor.js.map
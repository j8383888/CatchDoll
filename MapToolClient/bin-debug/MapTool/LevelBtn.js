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
var LevelBtn = (function (_super) {
    __extends(LevelBtn, _super);
    function LevelBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = "LevelBtnSkin";
        return _this;
    }
    /**
     * 设置数据
     */
    LevelBtn.prototype.setData = function (level, chapterID, mapData) {
        this.levelID = level;
        this.labelDisplay.text = level.toString();
        this.belongChapterID = chapterID;
        this.mapData = mapData;
    };
    LevelBtn.prototype.addListen = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this);
    };
    LevelBtn.prototype._onClick = function (e) {
        MapEditor.instance.curMapGoods.length = 0;
        if (MapEditor.instance.curLevel) {
            MapEditor.instance.curLevel.onSelect(false);
        }
        MapEditor.instance.curLevel = e.currentTarget;
        /**
         * 记录
         */
        var chapterID = MapEditor.instance.curLevel.belongChapterID;
        if (MapEditor.instance.lastChapterID != chapterID) {
            if (MapEditor.instance.curChapter) {
                MapEditor.instance.curChapter.onSelect(false);
            }
            MapEditor.instance.lastChapterID = chapterID;
            var chapterBtn = MapEditor.instance.chapterMap.get(chapterID);
            chapterBtn.onSelect(true);
            MapEditor.instance.curChapter = chapterBtn;
        }
        MapEditor.instance.lastLevelID = MapEditor.instance.curLevel.levelID;
        MapEditor.instance.curLevel.onSelect(true);
        MapEditor.instance.sceneCanvas.removeChildren();
        for (var _i = 0, _a = this.mapData; _i < _a.length; _i++) {
            var item = _a[_i];
            var img = new eui.Image();
            img.source = item.source;
            img.x = item.x;
            img.y = item.y;
            MapEditor.instance.curMapGoods.push(img);
            MapEditor.instance.sceneCanvas.addChild(img);
            MapEditor.instance.addListener(img);
        }
    };
    LevelBtn.prototype.onSelect = function (value) {
        value ? UIUtil.setLight(this) : UIUtil.setNomarl(this);
    };
    return LevelBtn;
}(eui.Component));
__reflect(LevelBtn.prototype, "LevelBtn");
//# sourceMappingURL=LevelBtn.js.map
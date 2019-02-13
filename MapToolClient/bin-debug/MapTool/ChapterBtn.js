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
var ChapterBtn = (function (_super) {
    __extends(ChapterBtn, _super);
    function ChapterBtn() {
        var _this = _super.call(this) || this;
        _this.isOpen = false;
        _this.skinName = "ChapterBtnSkin";
        return _this;
    }
    /**
     * 设置数据
     */
    ChapterBtn.prototype.setData = function (label, chapterID, levelData) {
        this.labelDisplay.text = label;
        this.chapterID = chapterID;
        this.levelData = levelData;
    };
    /**
     * 是否点击
     */
    ChapterBtn.prototype.onClick = function () {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            for (var _i = 0, _a = this.levelData; _i < _a.length; _i++) {
                var subitem = _a[_i];
                var levelBtn = new LevelBtn();
                levelBtn.setData(subitem.level, subitem.mapData);
                levelBtn.addListen();
                this.parent.addChild(levelBtn);
                if (MapEditor.instance.curLevel && levelBtn.levelID == MapEditor.instance.curLevel.levelID) {
                    levelBtn.onSelect(true);
                }
            }
        }
        else {
            var parent_1 = this.parent;
            this.parent.removeChildren();
            parent_1.addChild(this);
        }
    };
    ChapterBtn.prototype.onSelect = function (value) {
        value ? UIUtil.setLight(this) : UIUtil.setNomarl(this);
    };
    return ChapterBtn;
}(eui.Component));
__reflect(ChapterBtn.prototype, "ChapterBtn");
//# sourceMappingURL=ChapterBtn.js.map
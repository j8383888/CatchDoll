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
        _this._chapterID = 0;
        /**
         * 当前场景的物品数据
         */
        _this.curMapGoods = [];
        /**
         * 上一次点击章节ID
         */
        _this.lastChapterID = -1;
        /**
         * 上一次点击关卡ID
         */
        _this.lastLevelID = -1;
        _this.skinName = "MapEditorSkin";
        _this._init();
        return _this;
    }
    Object.defineProperty(MapEditor, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new MapEditor();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化
     */
    MapEditor.prototype._init = function () {
        this._getServeInfo();
        var len = this.itemGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var item = this.itemGroup.getElementAt(i);
            item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this);
        }
        this.addChapter.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAddChapter, this);
        this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSave, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAddLevel, this);
        this.clearSceneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClearScene, this);
        this.removeLevelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onRemoveLevel, this);
    };
    /**
     * 添加章节
     */
    MapEditor.prototype._onAddChapter = function () {
        var group = new eui.Group();
        var layoutV = new eui.VerticalLayout();
        layoutV.gap = 0;
        layoutV.horizontalAlign = "center";
        group.layout = layoutV;
        var chapterID = this._getLastChapterID();
        chapterID++;
        var chapterBtn = new ChapterBtn();
        chapterBtn.setData("新的章节", chapterID, []);
        group.addChild(chapterBtn);
        this.levelGroup.addChild(group);
        chapterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickChapter, this);
        this._addChapterData(chapterBtn);
    };
    /**
     * 添加章节数据
     */
    MapEditor.prototype._addChapterData = function (chapterBtn) {
        var chapterID = chapterBtn.chapterID;
        /**
         * 总数据
         */
        this.chapterData.push({
            chapterID: chapterID,
            chapterName: "新的章节",
            levelData: []
        });
    };
    MapEditor.prototype._getLastChapterID = function () {
        return this.chapterData[this.chapterData.length - 1].chapterID;
    };
    MapEditor.prototype._onRemoveLevel = function () {
        if (this.curLevel) {
            this.curChapter.parent.removeChild(this.curLevel);
            this.deleteLevelData(this.curChapter, this.curLevel);
            this.curLevel = null;
        }
        else {
            SystemTipsUtil.showTips("请先选中要删除的关卡！！");
        }
    };
    /**
     * 清除场景
     */
    MapEditor.prototype._onClearScene = function () {
        this.curMapGoods.length = 0;
        this.sceneCanvas.removeChildren();
    };
    MapEditor.prototype._getServeInfo = function () {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://127.0.0.1:4000", egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // request.setRequestHeader('Access-Control-Allow-Origin', '*')
        // request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // request.setRequestHeader("Access-control-allow-methods", "GET, POST, OPTIONS, PUT, DELETE");
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        request.send();
    };
    MapEditor.prototype.onGetComplete = function (e) {
        this.chapterData = JSON.parse(e.target.response);
        for (var _i = 0, _a = this.chapterData; _i < _a.length; _i++) {
            var item = _a[_i];
            var group = new eui.Group();
            var layoutV = new eui.VerticalLayout();
            layoutV.gap = 0;
            layoutV.horizontalAlign = "center";
            group.layout = layoutV;
            var chapterBtn = new ChapterBtn();
            chapterBtn.setData(item.chapterName, item.chapterID, item.levelData);
            group.addChild(chapterBtn);
            this.levelGroup.addChild(group);
            chapterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickChapter, this);
        }
        SystemTipsUtil.showTips("加载成功");
    };
    MapEditor.prototype._onClickChapter = function (e) {
        if (this.curChapter) {
            this.curChapter.onSelect(false);
        }
        this.curChapter = e.currentTarget;
        this.curChapter.onClick();
        this.curChapter.onSelect(true);
    };
    MapEditor.prototype.onGetIOError = function () {
    };
    MapEditor.prototype.onGetProgress = function () {
    };
    /**
     * 添加关卡
     */
    MapEditor.prototype._onAddLevel = function () {
        var group = this.curChapter.parent;
        var level = new LevelBtn();
        var levelID = this.getLastLevel(this.curChapter.chapterID);
        levelID++;
        level.addListen();
        level.setData(levelID, this.curChapter.chapterID, []);
        group.addChild(level);
        this.addLevelData(this.curChapter, level);
    };
    /**
     * 获得最后一个关卡
     */
    MapEditor.prototype.getLastLevel = function (chapterID) {
        for (var _i = 0, _a = this.chapterData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.chapterID == chapterID) {
                var levelData = item.levelData;
                if (levelData.length) {
                    return levelData[levelData.length - 1].level;
                }
                else {
                    return 0;
                }
            }
        }
    };
    /**
     * 保存
     */
    MapEditor.prototype._onSave = function () {
        if (MapEditor.instance.curChapter && MapEditor.instance.curLevel) {
            MapEditor.instance.setMapData(MapEditor.instance.curChapter, MapEditor.instance.curLevel);
        }
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
        request.addEventListener(egret.Event.COMPLETE, function () { }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () { }, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, function () { }, this);
    };
    MapEditor.prototype._onDown = function (e) {
        var target = e.target;
        var img = new eui.Image(target.source);
        img.x = e.stageX - target.width / 2;
        img.y = e.stageY - target.height / 2;
        this.sceneCanvas.addChild(img);
        this.curMapGoods.push(img);
        this.addListener(img);
    };
    MapEditor.prototype.addListener = function (img) {
        var _this = this;
        img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.sceneCanvas.addChild(e.target);
        }, this);
        img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this, true);
    };
    /**
     * 点击
     */
    MapEditor.prototype._onMove = function (e) {
        var target = e.target;
        target.x = e.stageX - target.width / 2;
        target.y = e.stageY - target.height / 2;
    };
    /**
     * 删除关卡数据
     */
    MapEditor.prototype.deleteLevelData = function (chapterBtn, levelBtn) {
        var chapterID = chapterBtn.chapterID;
        var levelID = levelBtn.levelID;
        /**
         * 章节上的数据
         */
        for (var _i = 0, _a = chapterBtn.levelData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.level == levelID) {
                chapterBtn.levelData.remove(item);
                break;
            }
        }
        /**
         * 总数据
         */
        for (var _b = 0, _c = this.chapterData; _b < _c.length; _b++) {
            var item = _c[_b];
            if (item.chapterID == chapterID) {
                for (var _d = 0, _e = item.levelData; _d < _e.length; _d++) {
                    var subitem = _e[_d];
                    if (subitem.level == levelID) {
                        item.levelData.remove(subitem);
                        return;
                    }
                }
            }
        }
    };
    /**
     * 添加关卡数据
     */
    MapEditor.prototype.addLevelData = function (chapterBtn, levelBtn) {
        var chapterID = chapterBtn.chapterID;
        var levelID = levelBtn.levelID;
        /**
         * 章节上的数据
         */
        chapterBtn.levelData.push({ level: levelBtn.levelID, mapData: [] });
    };
    /**
     * 设置地图数据
     */
    MapEditor.prototype.setMapData = function (chapterBtn, levelBtn) {
        var chapterID = chapterBtn.chapterID;
        var levelID = levelBtn.levelID;
        var mapData = [];
        for (var i = 0; i < this.curMapGoods.length; i++) {
            var item = this.curMapGoods[i];
            var data = { source: item.source, x: item.x, y: item.y };
            mapData.push(data);
        }
        /**
         * 章节上的数据
         */
        for (var _i = 0, _a = chapterBtn.levelData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.level == levelID) {
                item.mapData = mapData;
                break;
            }
        }
        /**
         * 关卡按钮上的数据
         */
        levelBtn.mapData = mapData;
    };
    MapEditor.prototype._remove = function () {
        var len = this.itemGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var item = this.itemGroup.getElementAt(i);
            item.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this);
        }
    };
    MapEditor._instance = null;
    return MapEditor;
}(eui.Component));
__reflect(MapEditor.prototype, "MapEditor");
//# sourceMappingURL=MapEditor.js.map
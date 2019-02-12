/**
* 单帧按钮
* @author suo
*/
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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(root, soundName, canExpand, isOffset) {
        if (soundName === void 0) { soundName = null; }
        if (canExpand === void 0) { canExpand = false; }
        if (isOffset === void 0) { isOffset = false; }
        var _this = _super.call(this, root) || this;
        /*是否可以点击*/
        _this._enabled = true;
        /*声音源*/
        _this._soundName = null;
        /*点击会放大*/
        _this._canExpand = false;
        /*携带数据*/
        _this.data = null;
        _this.label = new eui.Label();
        if (root instanceof egret.DisplayObjectContainer) {
            root.touchChildren = false;
        }
        _this._canExpand = canExpand;
        if (isOffset) {
            if (root instanceof eui.Image) {
                root.once(egret.Event.RENDER, function () {
                    _this._root.anchorOffsetX = _this.width / 2;
                    _this._root.anchorOffsetY = _this.height / 2;
                    _this._root.x += _this.width / 2;
                    _this._root.y += _this.height / 2;
                }, null);
            }
            else {
                _this._root.anchorOffsetX = _this.width / 2;
                _this._root.anchorOffsetY = _this.height / 2;
                _this._root.x += _this.width / 2;
                _this._root.y += _this.height / 2;
            }
        }
        _this.setSound(soundName);
        return _this;
    }
    /**
     * 设置文本
     */
    Button.prototype.setLabel = function (str, size, OffsetX, offsetY) {
        if (size === void 0) { size = 30; }
        if (OffsetX === void 0) { OffsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var label = this.label;
        label.text = str;
        label.size = size;
        if (this._root instanceof egret.DisplayObjectContainer) {
            this._root.addChild(label);
            label.x = (this._root.width - label.width) / 2 + OffsetX;
            label.y = (this._root.height - label.height) / 2 + offsetY;
        }
        else if (this._root.parent) {
            this._root.parent.addChild(label);
            label.x = (this._root.width - label.width) / 2 + this._root.x + OffsetX;
            label.y = (this._root.height - label.height) / 2 + this._root.y + offsetY;
        }
    };
    // /**
    //  * 取消触摸
    //  */
    // protected onTouchCancle(e:egret.Event):void{
    // 	super.onTouchCancle(e);
    // 	this.changeStatus(BTN_STATE.STATUS_DEFAULT);
    // }
    /**
     * 设置声音
     */
    Button.prototype.setSound = function (name) {
        this._soundName = name;
    };
    /**
     * 鼠标OutSide事件
     */
    Button.prototype.onMouseOustide = function (e) {
        _super.prototype.onMouseOustide.call(this, e);
        this.changeStatus(BTN_STATE.STATUS_DEFAULT);
        if (this._canExpand) {
            this._root.scaleX = this._root.scaleY = 1;
        }
    };
    /**
     * 鼠标按下函数
     */
    Button.prototype.onMouseDown = function (e) {
        _super.prototype.onMouseDown.call(this, e);
        this.changeStatus(BTN_STATE.STATUS_HIGH_LIGHT);
        // if (this._soundName != null) {
        // 	SoundManager.instance.playSoundByName(this._soundName);
        // }
        if (this._canExpand) {
            this._root.scaleX = this._root.scaleY = 1.1;
        }
    };
    /**
     * 鼠标抬起函数
     */
    Button.prototype.onMouseUp = function (e) {
        _super.prototype.onMouseUp.call(this, e);
        this.changeStatus(BTN_STATE.STATUS_DEFAULT);
        if (this._canExpand) {
            this._root.scaleX = this._root.scaleY = 1;
        }
    };
    /**
     * 鼠标点击函数
     */
    Button.prototype.onMouseClick = function (e) {
        if (this._mouseClickHandler != null) {
            this._mouseClickHandler.runWith(this);
        }
    };
    /**
     * 释放
     */
    Button.prototype.dispose = function () {
        this.label = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(Button.prototype, "enabled", {
        /**
         * 获得按钮鼠标state
         */
        get: function () {
            return this._enabled;
        },
        /**
         * 设置鼠标事件是否启用
         */
        set: function (value) {
            if (this._enabled != value) {
                this._enabled = value;
                this._root.touchEnabled = value;
                if (this._enabled) {
                    this.changeStatus(BTN_STATE.STATUS_DEFAULT);
                }
                else {
                    this.changeStatus(BTN_STATE.STATUS_GRAY);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 改变按钮状态
     */
    Button.prototype.changeStatus = function (status) {
        var matrix;
        var stateFilter;
        switch (status) {
            case BTN_STATE.STATUS_DEFAULT:
                stateFilter = null;
                break;
            case BTN_STATE.STATUS_HIGH_LIGHT:
                matrix =
                    [1, 0, 0, 0, 0xff * 0.2,
                        0, 1, 0, 0, 0xe0 * 0.2,
                        0, 0, 1, 0, 0x8d * 0.2,
                        0, 0, 0, 1, 0]; // alpha
                stateFilter = new egret.ColorMatrixFilter(matrix);
                break;
            case BTN_STATE.STATUS_DOWN:
                matrix =
                    [1, 0, 0, 0, -30,
                        0, 1, 0, 0, -30,
                        0, 0, 1, 0, -30,
                        0, 0, 0, 1, 0]; // alpha
                stateFilter = new egret.ColorMatrixFilter(matrix);
                break;
            case BTN_STATE.STATUS_GRAY:
                matrix = [0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0, 0, 0, 1, 0]; // alpha
                stateFilter = new egret.ColorMatrixFilter(matrix);
                break;
        }
        if (null == stateFilter) {
            this._root.filters = [];
        }
        else {
            this._root.filters = [stateFilter];
        }
    };
    return Button;
}(InteractiveObject));
__reflect(Button.prototype, "Button");
var BTN_STATE;
(function (BTN_STATE) {
    BTN_STATE[BTN_STATE["STATUS_DEFAULT"] = 0] = "STATUS_DEFAULT";
    BTN_STATE[BTN_STATE["STATUS_HIGH_LIGHT"] = 1] = "STATUS_HIGH_LIGHT";
    BTN_STATE[BTN_STATE["STATUS_DOWN"] = 2] = "STATUS_DOWN";
    BTN_STATE[BTN_STATE["STATUS_GRAY"] = 3] = "STATUS_GRAY";
})(BTN_STATE || (BTN_STATE = {}));
//# sourceMappingURL=Button.js.map
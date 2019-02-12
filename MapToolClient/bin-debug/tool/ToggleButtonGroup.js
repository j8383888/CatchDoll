var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 切换按钮组
 * @author suo
 */
var ToggleButtonGroup = (function () {
    function ToggleButtonGroup() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /*按钮组*/
        this._btnGroup = [];
        /*是否可以点击同一对象*/
        this._clickSameObject = false;
        /*当前点击按钮索引*/
        this.index = -1;
        var len = args.length;
        for (var i = 0; i < len; i++) {
            if (args[i] instanceof ToggleButton) {
                var btn = args[i];
                btn.mouseClickHandler = Handler.create(this, this._onClick);
                this._btnGroup.push(btn);
            }
        }
    }
    Object.defineProperty(ToggleButtonGroup.prototype, "clickSameObject", {
        /**
         * 设置是否互斥
         */
        set: function (value) {
            this._clickSameObject = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleButtonGroup.prototype, "length", {
        /**
         * 获得长度
         */
        get: function () {
            return this._btnGroup.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleButtonGroup.prototype, "changeHandler", {
        /**
         * 设置切页函数
         */
        set: function (value) {
            this._changeHandler = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获得该按钮在按钮组内的索引
     */
    ToggleButtonGroup.prototype.getIndexByBtn = function (btn) {
        return this._btnGroup.indexOf(btn);
    };
    Object.defineProperty(ToggleButtonGroup.prototype, "clickByIndex", {
        /**
         * 通过索引设置点击哪个按钮
         */
        set: function (index) {
            var btn = this._btnGroup[index];
            if (btn) {
                this._onClick(btn);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 根据索引获得按钮
     */
    ToggleButtonGroup.prototype.getBtnByIndex = function (index) {
        return this._btnGroup[index];
    };
    /**
     * 点击函数
     */
    ToggleButtonGroup.prototype._onClick = function (targetBtn) {
        if (this._lastClickBtn) {
            if (this._lastClickBtn == targetBtn && !this._clickSameObject) {
                return;
            }
            this._lastClickBtn.selected = false;
        }
        this._lastClickBtn = targetBtn;
        this.index = this.getIndexByBtn(targetBtn);
        targetBtn.selected = true;
        if (this._changeHandler) {
            this._changeHandler.runWith(targetBtn);
        }
    };
    Object.defineProperty(ToggleButtonGroup.prototype, "lastClickBtn", {
        /**
         * 获得上一次点击按钮
         */
        get: function () {
            return this._lastClickBtn;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加按钮
     */
    ToggleButtonGroup.prototype.push = function (btn) {
        btn.mouseClickHandler = Handler.create(this, this._onClick);
        this._btnGroup.push(btn);
    };
    /**
     * 释放
     */
    ToggleButtonGroup.prototype.dispose = function () {
        if (this._changeHandler) {
            this._changeHandler.recover();
            this._changeHandler = null;
        }
        for (var i = 0; i < this._btnGroup.length; i++) {
            this._btnGroup[i].dispose();
            this._btnGroup[i] = null;
        }
        this._btnGroup.length = 0;
        this._btnGroup = null;
    };
    /**
     * 清理
     */
    ToggleButtonGroup.prototype.clear = function () {
        if (this._changeHandler) {
            this._changeHandler.recover();
            this._changeHandler = null;
        }
        for (var i = 0; i < this._btnGroup.length; i++) {
            this._btnGroup[i].dispose();
            this._btnGroup[i] = null;
        }
        this._btnGroup.length = 0;
    };
    return ToggleButtonGroup;
}());
__reflect(ToggleButtonGroup.prototype, "ToggleButtonGroup");
//# sourceMappingURL=ToggleButtonGroup.js.map
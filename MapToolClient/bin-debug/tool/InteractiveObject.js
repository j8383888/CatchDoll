var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 代理逻辑交互对象
* @author suo
*/
var InteractiveObject = (function () {
    function InteractiveObject(root) {
        /*callback function*/
        this._mouseDownHandler = null;
        this._mouseUpHandler = null;
        this._mouseOutsideHandler = null;
        this._mouseDownAndMoveHandler = null;
        this._mouseClickHandler = null;
        this._touchCancleHandler = null;
        if (root == null) {
            console.assert(false, "请检查传入参数是否为egret.DisplayObject!");
        }
        this._root = root;
        this._root.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
        this._root.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUp, this);
        this._root.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseOustide, this);
        this._root.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseDownAndMove, this);
        this._root.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMouseClick, this);
        this._root.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
    }
    /*鼠标按下事件*/
    InteractiveObject.prototype.onMouseDown = function (e, data) {
        if (data === void 0) { data = null; }
        if (this._mouseDownHandler != null) {
            this._mouseDownHandler.runWith(e);
        }
    };
    /*鼠标抬起事件*/
    InteractiveObject.prototype.onMouseUp = function (e) {
        if (this._mouseUpHandler != null) {
            this._mouseUpHandler.runWith(e);
        }
    };
    /**
     * 取消触摸
     */
    InteractiveObject.prototype.onTouchCancle = function (e) {
        if (this._touchCancleHandler) {
            this._touchCancleHandler.runWith(e);
        }
    };
    /*鼠标OutSide事件*/
    InteractiveObject.prototype.onMouseOustide = function (e) {
        if (this._mouseOutsideHandler != null) {
            this._mouseOutsideHandler.runWith(e);
        }
    };
    /*鼠标悬浮事件*/
    InteractiveObject.prototype.onMouseDownAndMove = function (e) {
        if (this._mouseDownAndMoveHandler != null) {
            this._mouseDownAndMoveHandler.runWith(e);
        }
    };
    /*鼠标点击事件*/
    InteractiveObject.prototype.onMouseClick = function (e) {
        if (this._mouseClickHandler != null) {
            this._mouseClickHandler.runWith(e);
        }
    };
    /*释放*/
    InteractiveObject.prototype.dispose = function () {
        this._root.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
        this._root.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUp, this);
        this._root.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseOustide, this);
        this._root.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseDownAndMove, this);
        this._root.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMouseClick, this);
        this._root.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        if (this._mouseDownHandler != null) {
            this._mouseDownHandler.recover();
            this._mouseDownHandler = null;
        }
        if (this._mouseUpHandler) {
            this._mouseUpHandler.recover();
            this._mouseUpHandler = null;
        }
        if (this._mouseOutsideHandler) {
            this._mouseOutsideHandler.recover();
            this._mouseOutsideHandler = null;
        }
        if (this._mouseDownAndMoveHandler) {
            this._mouseDownAndMoveHandler.recover();
            this._mouseDownAndMoveHandler = null;
        }
        if (this._touchCancleHandler) {
            this._touchCancleHandler.recover();
            this._touchCancleHandler = null;
        }
        if (this._root instanceof egret.MovieClip) {
            this._root.stop();
        }
        this._root = null;
    };
    Object.defineProperty(InteractiveObject.prototype, "mouseDownHandler", {
        set: function (value) {
            this._mouseDownHandler = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "mouseUpHandler", {
        set: function (value) {
            this._mouseUpHandler = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "mouseOutsideHandler", {
        set: function (value) {
            this._mouseOutsideHandler = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "mouseDownAndMoveHandler", {
        set: function (value) {
            this._mouseDownAndMoveHandler = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "mouseClickHandler", {
        set: function (value) {
            this._mouseClickHandler = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "touchCancleHandler", {
        set: function (value) {
            this._touchCancleHandler = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "visible", {
        /**
         * 设置是否可见
         */
        set: function (value) {
            this._root.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "x", {
        /**
         * 获得x坐标
         */
        get: function () {
            return this._root.x;
        },
        /**
         * 设置x坐标
         */
        set: function (value) {
            this._root.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "y", {
        /**
         * 获得y坐标
         */
        get: function () {
            return this._root.y;
        },
        /**
         * 设置y坐标
         */
        set: function (value) {
            this._root.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "width", {
        /**
         * 获得宽
         */
        get: function () {
            return this._root.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractiveObject.prototype, "height", {
        /**
         * 获得高
         */
        get: function () {
            return this._root.height;
        },
        enumerable: true,
        configurable: true
    });
    return InteractiveObject;
}());
__reflect(InteractiveObject.prototype, "InteractiveObject");
//# sourceMappingURL=InteractiveObject.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 分页组件
* @author suo
*/
var PageComponent = (function () {
    /**
     * 构造函数
     * @param btnPre 上一页
     * @param btnNext 下一页
     * @param tfPage 页码文本
     * @param btnFinally 最后一页
     */
    function PageComponent(btnPre, btnNext, tfPage, btnFinally) {
        if (btnNext === void 0) { btnNext = null; }
        if (tfPage === void 0) { tfPage = null; }
        if (btnFinally === void 0) { btnFinally = null; }
        var _this = this;
        /*页码文本*/
        this._tfPage = null;
        /*前翻按钮*/
        this._btnPre = null;
        /*后翻按钮*/
        this._btnNext = null;
        /*跳到最终页按钮*/
        this._btnFinally = null;
        /*callback function*/
        this._changePage = null;
        /*当前页码*/
        this._curPage = 1;
        /*最大页码*/
        this._maxPage = 1;
        /*一页展示几项*/
        this._showNum = -1;
        /*开始索引*/
        this._startIndex = -1;
        /*最后一个索引*/
        this._endIndex = -1;
        this._btnPre = btnPre;
        this._btnNext = btnNext;
        this._btnFinally = btnFinally;
        this._tfPage = tfPage;
        if (this._btnPre != null) {
            this._btnPre.mouseClickHandler = Handler.create(this, function () { _this.curPage--; });
        }
        if (this._btnNext != null) {
            this._btnNext.mouseClickHandler = Handler.create(this, function () { _this.curPage++; });
        }
        if (this._btnFinally != null) {
            this._btnFinally.mouseClickHandler = Handler.create(this, function () { _this.curPage = _this.maxPage; });
        }
    }
    /**
     * 设置声音
     */
    PageComponent.prototype.setSound = function (perBtnSound, nextBtnSound) {
        this._btnPre.setSound(perBtnSound);
        this._btnNext.setSound(nextBtnSound);
    };
    /*释放*/
    PageComponent.prototype.dispose = function () {
        if (this._btnPre != null) {
            this._btnPre.dispose();
            this._btnPre = null;
        }
        if (this._btnNext != null) {
            this._btnNext.dispose();
            this._btnNext = null;
        }
        if (this._changePage != null) {
            this._changePage.recover();
            this._changePage = null;
        }
        if (this._btnFinally != null) {
            this._btnFinally.dispose();
            this._btnFinally = null;
        }
        this._tfPage = null;
    };
    Object.defineProperty(PageComponent.prototype, "onChangePage", {
        /**无回调参数*/
        set: function (changePage) {
            this._changePage = changePage;
        },
        enumerable: true,
        configurable: true
    });
    PageComponent.prototype.setData = function (dataLength, showNum) {
        this._showNum = showNum;
        this._maxPage = Math.ceil(dataLength / this._showNum);
    };
    Object.defineProperty(PageComponent.prototype, "maxPage", {
        get: function () {
            return this._maxPage;
        },
        set: function (value) {
            this._maxPage = value > 0 ? value : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageComponent.prototype, "curPage", {
        get: function () {
            return this._curPage;
        },
        set: function (value) {
            if (value >= 1 && value <= this._maxPage) {
                this._curPage = value;
                this._startIndex = (this._curPage - 1) * this._showNum;
                this._endIndex = this._curPage * this._showNum;
                if (this._changePage != null) {
                    this._changePage.run();
                }
                if (this._btnPre != null) {
                    this._btnPre.enabled = this._curPage > 1;
                }
                if (this._btnNext != null) {
                    this._btnNext.enabled = this._curPage < this._maxPage;
                }
                if (this._btnFinally != null) {
                    this._btnFinally.enabled = !(this._curPage == this._maxPage);
                }
            }
            if (this._tfPage != null) {
                this._tfPage.text = this._curPage + "/" + this._maxPage;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageComponent.prototype, "endIndex", {
        /**Array.slice(startIndex, endIndex)*/
        get: function () {
            return this._endIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageComponent.prototype, "startIndex", {
        /**Array.slice(startIndex, endIndex)*/
        get: function () {
            return this._startIndex;
        },
        enumerable: true,
        configurable: true
    });
    return PageComponent;
}());
__reflect(PageComponent.prototype, "PageComponent");
//# sourceMappingURL=PageComponent.js.map
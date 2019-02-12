var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @private
 * 对象缓存统一管理类
 * @author suo
 */
var CacheManager = (function () {
    function CacheManager() {
    }
    /**
     * 注册cache管理函数
     * @param disposeFunction 释放函数 fun(force:Boolean)
     * @param getCacheListFunction 获取cache列表函数fun():Array
     *
     */
    CacheManager.regCacheByFunction = function (disposeFunction, getCacheListFunction) {
        this.unRegCacheByFunction(disposeFunction, getCacheListFunction);
        var cache;
        cache = { tryDispose: disposeFunction, getCacheList: getCacheListFunction };
        this._cacheList.push(cache);
    };
    /**
     * 移除cache管理函数
     * @param disposeFunction 释放函数 fun(force:Boolean)
     * @param getCacheListFunction 获取cache列表函数fun():Array
     *
     */
    CacheManager.unRegCacheByFunction = function (disposeFunction, getCacheListFunction) {
        var i, len;
        len = this._cacheList.length;
        for (i = 0; i < len; i++) {
            if (this._cacheList[i].tryDispose == disposeFunction && this._cacheList[i].getCacheList == getCacheListFunction) {
                this._cacheList.splice(i, 1);
                return;
            }
        }
    };
    /**
     * 强制清理所有管理器
     *
     */
    CacheManager.forceDispose = function () {
        var i, len = this._cacheList.length;
        for (i = 0; i < len; i++) {
            this._cacheList[i].tryDispose(true);
        }
    };
    /**
     * 开始检测循环
     * @param waitTime 检测间隔时间
     *
     */
    CacheManager.beginCheck = function (waitTime) {
        if (waitTime === void 0) { waitTime = 15000; }
        // Laya.timer.loop(waitTime, null, _checkLoop);
    };
    /**
     * 停止检测循环
     *
     */
    CacheManager.stopCheck = function () {
        // Laya.timer.clear(null, _checkLoop);
    };
    /**
     * @private
     * 检测函数
     */
    CacheManager._checkLoop = function () {
        var cacheList = this._cacheList;
        if (cacheList.length < 1)
            return;
        var tTime = Date.now();
        var count;
        var len;
        len = count = cacheList.length;
        while (count > 0) {
            this._index++;
            this._index = this._index % len;
            cacheList[this._index].tryDispose(false);
            if (Date.now() - tTime > this.loopTimeLimit)
                break;
            count--;
        }
    };
    /**
     * 单次清理检测允许执行的时间，单位ms。
     */
    CacheManager.loopTimeLimit = 2;
    /**
     * @private
     */
    CacheManager._cacheList = [];
    /**
     * @private
     * 当前检测的索引
     */
    CacheManager._index = 0;
    return CacheManager;
}());
__reflect(CacheManager.prototype, "CacheManager");
//# sourceMappingURL=CacheManager.js.map
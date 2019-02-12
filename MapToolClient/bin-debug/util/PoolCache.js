var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @private
 * 基于个数的对象缓存管理器
 * 原作者 layaBox
 * @author suo
 */
var PoolCache = (function () {
    function PoolCache() {
        /**
         * 允许缓存的最大数量
         */
        this.maxCount = 1000;
    }
    /**
     * 获取缓存的对象列表
     * @return
     *
     */
    PoolCache.prototype.getCacheList = function () {
        return Pool.getPoolBySign(this.sign);
    };
    /**
     * 尝试清理缓存
     * @param force 是否强制清理
     *
     */
    PoolCache.prototype.tryDispose = function (force) {
        var list;
        list = Pool.getPoolBySign(this.sign);
        if (list.length > this.maxCount) {
            list.splice(this.maxCount, list.length - this.maxCount);
        }
    };
    /**
     * 添加对象缓存管理
     * @param sign 对象在Pool中的标识
     * @param maxCount 允许缓存的最大数量
     *
     */
    PoolCache.addPoolCacheManager = function (sign, maxCount) {
        if (maxCount === void 0) { maxCount = 100; }
        var cache;
        cache = new PoolCache();
        cache.sign = sign;
        cache.maxCount = maxCount;
        CacheManager.regCacheByFunction(cache.tryDispose, cache.getCacheList);
    };
    return PoolCache;
}());
__reflect(PoolCache.prototype, "PoolCache");
//# sourceMappingURL=PoolCache.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * <p> <code>Pool</code> 是对象池类，用于对象的存贮、重复使用。</p>
 * <p>合理使用对象池，可以有效减少对象创建的开销，避免频繁的垃圾回收，从而优化游戏流畅度。</p>
 * 原作者 LayaBox
 * @author suo
 */
var Pool = (function () {
    function Pool() {
    }
    /**
     * 根据对象类型标识字符，获取对象池。
     * @param sign 对象类型标识字符。
     * @return 对象池。
     */
    Pool.getPoolBySign = function (sign) {
        return this._poolDic[sign] || (this._poolDic[sign] = []);
    };
    /**
     * 清除对象池的对象。
     * @param sign 对象类型标识字符。
     */
    Pool.clearBySign = function (sign) {
        var index = this._signAry.indexOf(sign);
        if (index != -1) {
            this._signAry.splice(index, 1);
        }
        if (this._poolDic[sign])
            this._poolDic[sign].length = 0;
    };
    /**
     * 将对象放到对应类型标识的对象池中。
     * @param sign 对象类型标识字符。
     * @param item 对象。
     */
    Pool.recover = function (sign, item) {
        this.getPoolBySign(sign).push(item);
    };
    /**
     * <p>根据传入的对象类型标识字符，获取对象池中此类型标识的一个对象实例。</p>
     * <p>当对象池中无此类型标识的对象时，则根据传入的类型，创建一个新的对象返回。</p>
     * @param sign 对象类型标识字符。
     * @param cls 用于创建该类型对象的类。
     * @return 此类型标识的一个对象。
     */
    Pool.getItemByClass = function (sign, cls) {
        if (this._signAry.indexOf(sign) == -1) {
            this._signAry.push(sign);
        }
        var pool = this.getPoolBySign(sign);
        var rst = pool.length ? pool.pop() : new cls();
        return rst;
    };
    /**
     * <p>根据传入的对象类型标识字符，获取对象池中此类型标识的一个对象实例。</p>
     * <p>当对象池中无此类型标识的对象时，则使用传入的创建此类型对象的函数，新建一个对象返回。</p>
     * @param sign 对象类型标识字符。
     * @param createFun 用于创建该类型对象的方法。
     * @return 此类型标识的一个对象。
     */
    Pool.getItemByCreateFun = function (sign, createFun) {
        if (this._signAry.indexOf(sign) == -1) {
            this._signAry.push(sign);
        }
        var pool = this.getPoolBySign(sign);
        var rst = pool.length ? pool.pop() : createFun.run();
        return rst;
    };
    /**
     * 根据传入的对象类型标识字符，获取对象池中已存储的此类型的一个对象，如果对象池中无此类型的对象，则返回 null 。
     * @param sign 对象类型标识字符。
     * @return 对象池中此类型的一个对象，如果对象池中无此类型的对象，则返回 null 。
     */
    Pool.getItem = function (sign) {
        var pool = this.getPoolBySign(sign);
        var rst = pool.length ? pool.pop() : null;
        return rst;
    };
    /**
     * 释放
     */
    Pool.clearAll = function () {
        for (var i = 0; i < this._signAry.length; i++) {
            var sign = this._signAry[i];
            var itemAry = this._poolDic[sign];
            for (var j = 0; j < itemAry.length; j++) {
                if (itemAry[j]) {
                    itemAry[j] = null;
                    // if (itemAry[j] instanceof dragonBones.EgretArmatureDisplay) {
                    // 	itemAry[j].animation.stop();
                    // 	itemAry[j].dispose();
                    // }
                }
            }
            itemAry.length = 0;
        }
        this._signAry.length = 0;
    };
    /**
     * 旋转金币
     */
    Pool.rotationCoin = "rotationCoin";
    /**@private  对象存放池。*/
    Pool._poolDic = {};
    /*标识组*/
    Pool._signAry = [];
    return Pool;
}());
__reflect(Pool.prototype, "Pool");
//# sourceMappingURL=Pool.js.map
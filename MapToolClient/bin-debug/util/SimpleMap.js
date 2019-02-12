var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *  <code>DictionaryFast</code>是一个字典型的数据存取类。
 * 	与Dictionary相比更为高效，但键值仅只能为string类型
 * 	由于string类型的键值已能满足大部分需求 所以单独写成一个类
 *  @author suo
 */
var SimpleMap = (function () {
    function SimpleMap() {
    }
    Object.defineProperty(SimpleMap.prototype, "keys", {
        get: function () {
            return Object.getOwnPropertyNames(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 给指定的键名设置值。
     * @param	key 键名。
     * @param	value 值。
     */
    SimpleMap.prototype.set = function (key, value) {
        this[key] = value;
    };
    /**
     * 返回指定键名的值。
     * @param	key 键名对象。
     * @return 指定键名的值。
     */
    SimpleMap.prototype.get = function (key) {
        if (this.isExist(key)) {
            return this[key];
        }
        else {
            return null;
        }
    };
    /**
     * 返回指定键名的值。
     * @param	key 键索引。
     * @return 指定键名的值。
     */
    SimpleMap.prototype.getByKeyIndex = function (index) {
        return this[this.keys[index]];
    };
    /**
     * 是否存在该键
     */
    SimpleMap.prototype.isExist = function (key) {
        var result = this[key];
        if (result === void 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Object.defineProperty(SimpleMap.prototype, "length", {
        /**
         * 获得字典长度
         */
        get: function () {
            return this.keys.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 移除指定键名的值。
     * @param	key 键名对象。
     * @return 是否成功移除。
     */
    SimpleMap.prototype.remove = function (key) {
        if (this.isExist(key)) {
            delete this[key];
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 清理
     */
    SimpleMap.prototype.clear = function () {
        var keys = this.keys.slice();
        for (var i = 0; i < keys.length; i++) {
            delete this[keys[i]];
        }
    };
    /**
     * 回收
     */
    SimpleMap.prototype.recover = function () {
        this.clear();
        Pool.recover("simpleMap", this);
    };
    /**
     * 拷贝字典
     */
    SimpleMap.prototype.copy = function () {
        var map = Pool.getItemByClass("simpleMap", SimpleMap);
        var keys = this.keys.slice();
        for (var i = 0; i < keys.length; i++) {
            map.set(keys[i], this[keys[i]]);
        }
        return map;
    };
    return SimpleMap;
}());
__reflect(SimpleMap.prototype, "SimpleMap");
//# sourceMappingURL=SimpleMap.js.map
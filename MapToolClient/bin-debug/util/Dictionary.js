var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * <code>Dictionary</code> 是一个字典型的数据存取类。
 * 原作者 LayaBox
 * author suo(修改部分源码 添加数组常用方法)
 */
var Dictionary = (function () {
    function Dictionary() {
        this._values = [];
        this._keys = [];
    }
    Object.defineProperty(Dictionary.prototype, "values", {
        /**
         * 获取所有的子元素列表。
         */
        get: function () {
            return this._values;
        },
        /**
         * 设置所有的子元素列表。
         */
        set: function (value) {
            this._values = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "keys", {
        /**
         * 获取所有的子元素键名列表。
         */
        get: function () {
            return this._keys;
        },
        /**
         * 设置所有的子元素键名列表。
         */
        set: function (value) {
            this._keys = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 给指定的键名设置值。
     * @param	key 键名。
     * @param	value 值。
     */
    Dictionary.prototype.set = function (key, value) {
        var index = this.indexOf(key);
        if (index >= 0) {
            this._values[index] = value;
            return;
        }
        this._keys.push(key);
        this._values.push(value);
    };
    /**
     * 获取指定对象的键名索引。
     * @param	key 键名对象。
     * @return 键名索引。
     */
    Dictionary.prototype.indexOf = function (key) {
        return this._keys.indexOf(key);
    };
    /**
     * 返回指定键名的值。
     * @param	key 键名对象。
     * @return 指定键名的值。
     */
    Dictionary.prototype.get = function (key) {
        var index = this.indexOf(key);
        return index < 0 ? null : this._values[index];
    };
    /**
     * 移除指定键名的值。
     * @param	key 键名对象。
     * @return 是否成功移除。
     */
    Dictionary.prototype.remove = function (key) {
        var index = this.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * 清除此对象的键名列表和键值列表。
     */
    Dictionary.prototype.clear = function () {
        this._values.length = 0;
        this._keys.length = 0;
    };
    Object.defineProperty(Dictionary.prototype, "length", {
        /**
         * 获得字典长度
         */
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 拷贝字典
     */
    Dictionary.prototype.copy = function (start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = Number.MAX_VALUE; }
        var dic = new Dictionary;
        dic.values = this._values.slice(start, end);
        dic.keys = this._keys.slice(start, end);
        return dic;
    };
    /**
     * 根据值找键（心里有点B数再用）
     */
    Dictionary.prototype.getKeyByValue = function (value) {
        var index = this._values.indexOf(value);
        return index < 0 ? null : this._keys[index];
    };
    /**
     * 是否存在
     */
    Dictionary.prototype.isExist = function (key) {
        return this.indexOf(key) != -1;
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
//# sourceMappingURL=Dictionary.js.map
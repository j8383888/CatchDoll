/**
 * @author suo
 */
declare interface Array<T> {
	remove(item: T, fromIndex?: number)

	removeAt(index: number)
}
if (!Array.prototype.remove) {
	Array.prototype.remove = function (value, fromIndex) {
		var index = this.indexOf(value, fromIndex);
		if (index < 0)
			return false;
		this.splice(index, 1);
		return true;
	};
}

if (!Array.prototype.removeAt) {
	Array.prototype.removeAt = function (index) {
		if (index < 0 || index >= this.length)
			return false;
		this.splice(index, 1);
		return true;
	};
}

class Extendtion {
	public constructor() {
	}
}


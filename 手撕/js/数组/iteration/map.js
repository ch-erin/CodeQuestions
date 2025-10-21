Array.prototype.myMap = function (fn, thisArg) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    // 跳过稀疏数组的空位
    if (!this.hasOwnProperty(i)) continue;

    const mappedValue = fn.call(thisArg, this[i], i, this);

    result[i] = mappedValue;
  }

  return result;
};

const arr = [1, 2, 3];
const squared = arr.myMap((n) => n * n);
console.log(squared);

Array.prototype.myFind = function (fn, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, this[i], i, this)) return this[i];
  }

  return undefined;
};

// 测试代码
const arr = [1, 2, 3, 4, 5];

// 查找第一个大于 3 的元素
const result1 = arr.myFind((element) => element > 3);
console.log(result1); // 输出：4

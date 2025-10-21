/*
// 累加器，当前项，当前索引，原数组
array.reduce((accumulator, currentValue, currentIndex, array) => {
  // 迭代逻辑
}, initialValue);
*/

Array.prototype.myReduce = function (fn, value) {
  let acc = value || this[0];
  const startIndex = value ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    acc = fn(acc, this[i], i, this);
  }

  return acc;
};

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.myReduce((acc, cur) => acc + cur);
console.log("求和结果:", sum); // 预期输出：15

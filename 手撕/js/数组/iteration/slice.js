Array.prototype.mySlice = function (start = 0, end = this.length) {
  if (start < 0) start = Math.max(0, this.length + start);
  if (end < 0) end = Math.max(0, this.length + end);

  start = Math.min(start, this.length);
  end = Math.min(end, this.length);

  const result = [];

  for (let i = start; i < end; i++) {
    result.push(this[i]);
  }

  return result;
};

// 测试代码
const arr = [1, 2, 3, 4, 5];
console.log("Original array:", arr);

console.log("mySlice(1, 3):", arr.mySlice(1, 3)); // [2, 3]
console.log("mySlice(1):", arr.mySlice(1)); // [2, 3, 4, 5]
console.log("mySlice(-2):", arr.mySlice(-2)); // [4, 5]
console.log("mySlice(0, -1):", arr.mySlice(0, -1)); // [1, 2, 3, 4]
console.log("mySlice():", arr.mySlice()); // [1, 2, 3, 4, 5]

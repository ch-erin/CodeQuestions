Array.prototype.mySlice = function (start, end) {
  const arr = this;
  const len = arr.length;
  const result = [];

  // 处理起始索引
  if (start === undefined) {
    start = 0;
  } else if (start < 0) {
    // 负数索引：从末尾开始计算，最小为0
    start = len + start;
    if (start < 0) {
      start = 0;
    }
  } else {
    // 正数索引：最大不超过数组长度
    if (start > len) {
      start = len;
    }
  }

  // 处理结束索引
  if (end === undefined) {
    end = len;
  } else if (end < 0) {
    // 负数索引：从末尾开始计算，最小为0
    end = len + end;
    if (end < 0) {
      end = 0;
    }
  } else {
    // 正数索引：最大不超过数组长度
    if (end > len) {
      end = len;
    }
  }

  // 复制元素（如果start >= end则不执行循环）
  for (let i = start; i < end; i++) {
    result.push(arr[i]);
  }

  return result;
};

// 测试案例
const testArr = [1, 2, 3, 4, 5];
console.log(testArr.mySlice(1, 3)); // [2, 3]
console.log(testArr.mySlice(2)); // [3, 4, 5]
console.log(testArr.mySlice(-2)); // [4, 5]
console.log(testArr.mySlice(1, -1)); // [2, 3, 4]
console.log(testArr.mySlice(5, 3)); // [] (空数组)
console.log(testArr.mySlice(-10)); // [1, 2, 3, 4, 5]（索引修正为0）

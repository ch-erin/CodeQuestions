Array.prototype.flatMap = function (callback, thisArg) {
  // 使用 map 方法对数组中的每个元素执行回调函数
  const mappedArray = this.map(callback, thisArg);

  // 递归扁平化数组
  const flatten = (arr) => {
    return arr.reduce((acc, item) => {
      // 如果当前元素是数组，递归扁平化
      if (Array.isArray(item)) {
        return acc.concat(flatten(item));
      } else {
        return acc.concat(item);
      }
    }, []);
  };

  // 返回扁平化后的数组
  return flatten(mappedArray);
};

Array.prototype.flatMap = function (callback, thisArg) {
  // 使用 map 方法对数组中的每个元素执行回调函数
  const mappedArray = this.map(callback, thisArg);

  // 使用栈进行迭代扁平化
  const stack = [...mappedArray];
  const result = [];

  while (stack.length > 0) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      // 如果当前元素是数组，将其元素推入栈中
      stack.push(...item);
    } else {
      // 如果当前元素不是数组，直接推入结果数组
      result.push(item);
    }
  }

  // 由于栈是后进先出，所以需要反转结果数组
  return result.reverse();
};

// 测试代码
const arr = [1, 2, [3, 4], [5, [6, 7]]];
const result = arr.flatMap((x) => x);
console.log(result); // 输出: [1, 2, 3, 4, 5, 6, 7]

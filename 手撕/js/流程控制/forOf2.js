// 自定义迭代器对象
function createIterator(iterable) {
  let index = 0;

  return {
    next: function () {
      return index < iterable.length
        ? { value: iterable[index++], done: false }
        : { done: true };
    },
  };
}

// 自定义 for...of 实现
function myForOf(iterable, callback) {
  // 获取自定义迭代器对象
  const iterator = createIterator(iterable);

  // 开始迭代
  let result = iterator.next();
  while (!result.done) {
    // 调用回调函数，传入当前值
    callback(result.value);
    // 继续迭代
    result = iterator.next();
  }
}

// 测试
const arr = [1, 2, 3];
myForOf(arr, (value) => {
  console.log(value); // 输出：1, 2, 3
});

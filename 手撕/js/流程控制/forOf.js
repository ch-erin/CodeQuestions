// 自定义迭代器
function myForOf(iterable, callback) {
  // 获取迭代器对象
  const iterator = iterable[Symbol.iterator]();

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


function createCounter(initialValue = 0) {
  // 私有变量，只能通过返回的方法访问和修改
  let count = initialValue;

  // 返回包含各种操作的对象
  return {
    // 递增并返回新值
    increment: function (step = 1) {
      count += step;
      return count;
    },

    // 递减并返回新值
    decrement: function (step = 1) {
      count -= step;
      return count;
    },

    // 获取当前值
    getValue: function () {
      return count;
    },

    // 重置计数器
    reset: function (value = initialValue) {
      count = value;
      return count;
    },
  };
}

// 使用示例
const counter1 = createCounter(); //0
console.log(counter1.increment()); // 1
console.log(counter1.increment(2)); // 3
console.log(counter1.decrement()); // 2
console.log(counter1.getValue()); // 2
console.log(counter1.reset()); // 0

// 创建另一个独立的计数器，初始值为10
const counter2 = createCounter(10);
console.log(counter2.increment(5)); // 15
console.log(counter2.decrement(3)); // 12
console.log(counter1.getValue()); // 0

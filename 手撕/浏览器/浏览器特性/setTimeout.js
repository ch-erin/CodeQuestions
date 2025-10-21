function mySetTimeout(callback, t) {
  // 创建一个标记，用于控制是否执行回调
  let executed = false;

  // 使用setInterval创建定时器
  const timer = setInterval(() => {
    // 仅在未执行过的情况下执行回调
    if (!executed) {
      callback();
      executed = true; // 标记为已执行
      clearInterval(timer); // 清除定时器，确保只执行一次
    }
  }, t);

  // 返回定时器ID，用于可能的清除操作
  return timer;
}

// 使用示例
mySetTimeout(() => {
  console.log("2秒后执行，只执行一次");
}, 2000);

// 测试清除功能
const timerId = mySetTimeout(() => {
  console.log("这个不会被执行");
}, 1000);

// 清除定时器
clearInterval(timerId);

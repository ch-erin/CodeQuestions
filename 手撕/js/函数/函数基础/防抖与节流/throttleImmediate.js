function throttleImmediate(func, delay) {
  let timer = null;

  return function (...args) {
    if (!timer) {
      // 1. 立即执行目标函数（首次触发无延迟）
      func.apply(this, args);

      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}

// 测试案例
function logMessage() {
  console.log("执行节流函数，时间：", new Date().toLocaleTimeString());
}

// 使用立即执行版节流，间隔1000ms
const throttledLog = throttleImmediate(logMessage, 1000);

// 模拟高频触发（连续调用3次）
console.log("开始触发：");
throttledLog(); // 立即执行（第一次触发）
throttledLog(); // 冷却期内，被忽略
throttledLog(); // 冷却期内，被忽略

// 1秒后再次触发
setTimeout(() => {
  console.log("1秒后再次触发：");
  throttledLog(); // 冷却期已结束，立即执行
}, 1000);

function debubunce(fn, time) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

// 日志函数
function log(msg) {
  console.log(`${msg} - ${Date.now()}`);
}

// 创建防抖版本（延迟1000ms）
const debouncedLog = debounce(log, 1000);

// 测试：每200ms触发一次
let count = 0;
const timer = setInterval(() => {
  count++;
  debouncedLog(`第${count}次触发`);

  // 5秒后停止测试
  if (count >= 25) {
    clearInterval(timer);
    console.log("测试结束，最后一次触发后1秒会执行");
  }
}, 200);

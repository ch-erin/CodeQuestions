// 延迟第一次执行
function throttle(fn, time) {
  let timer = null;

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, time);
    }
  };
}

// 立即第一次执行
function throttle(fn, time) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= time) {
      fn.apply(this, args);
      last = now;
    }
  };
}

function logMessage(message) {
  console.log(`${message} - ${Date.now()}`);
}

const throttledLog = throttle(logMessage, 1000);

// 测试
setInterval(() => {
  throttledLog("Throttled message");
}, 200); // 每 200ms 触发一次，但节流函数会限制为每 1000ms 执行一次

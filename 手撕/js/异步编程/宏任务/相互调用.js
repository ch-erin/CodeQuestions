// 模拟 setInterval 功能：周期性执行函数，返回清除定时器的方法
function mySetInterval(fn, delay, ...args) {
  let timer = null;

  const execute = () => {
    fn(...args);
    timer = setTimeout(execute, delay);
  };

  execute();

  return timer;
}

const clearTimer1 = mySetInterval(
  (message) => console.log(`${message} ${new Date().toLocaleTimeString()}`),
  1000,
  "当前时间："
);

setTimeout(() => {
  clearTimer1();
  console.log("定时器1已停止");
}, 5000);

function mySetTimeout(fn, delay, ...args) {
  const timerId = setInterval(() => {
    fn(...args);
    clearInterval(timerId);
  }, delay);

  return timerId;
}

const timer = mySetTimeout(
  (a, b) => {
    console.log(a + b);
  },
  1000,
  1,
  2
);

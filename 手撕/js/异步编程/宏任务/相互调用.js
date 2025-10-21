// 使用setInterval实现setTimeout
// 使用setTimeout实现setInterval

const mySetTimeout = (fn, time) => {
  let timer = setInterval(() => {
    fn();
    clearInterval(timer);
  }, time);
  return timer;
};

//递归调用
const mySetInterval = (fn, time) => {
  let timerId = null;

  function repeat() {
    fn();
    timerId = setTimeout(repeat, time);
  }

  timerId = setTimeout(repeat, time);

  return () => {
    clearTimeout(timerId);
  };
};

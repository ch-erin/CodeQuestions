const withTimeout = (fn, timeout) =>
  Promise.race([
    Promise.resolve().then(fn),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`超时(${timeout}ms)`)), timeout)
    ),
  ]);

const fastTask = () =>
  new Promise((resolve) => setTimeout(() => resolve("任务完成"), 500));
const slowTask = () =>
  new Promise((resolve) => setTimeout(() => resolve("任务完成"), 3000));

withTimeout(fastTask, 1000)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
withTimeout(slowTask, 1000)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));

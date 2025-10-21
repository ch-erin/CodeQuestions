async function pLimit(limit, tasks, retryLimit = 0, timeoutMs = 3000) {
  const running = [];
  const res = [];

  const wrapTask = async (task, retryCount = 0) => {
    // 创建 AbortController 用于终止任务内部的异步操作
    const controller = new AbortController();
    const { signal } = controller;

    try {
      return await Promise.race([
        // 执行任务时传入 signal，供任务内部监听超时
        Promise.resolve(task(signal)),
        new Promise((_, reject) => {
          const timer = setTimeout(() => {
            reject(new Error("任务超时"));
            // 超时后主动终止任务内部的异步操作
            controller.abort();
          }, timeoutMs);
          // 任务完成后清理定时器
          signal.addEventListener("abort", () => clearTimeout(timer));
        }),
      ]);
    } catch (error) {
      if (retryCount < retryLimit) {
        console.log(
          `任务重试（第 ${retryCount + 1} 次），原因：${error.message}`
        );
        return wrapTask(task, retryCount + 1);
      }
      return error;
    }
  };

  for (let task of tasks) {
    const p = wrapTask(task);
    res.push(p);

    const e = p.finally(() => {
      running.splice(running.indexOf(e), 1);
    });

    running.push(e);

    if (running.length >= limit) {
      await Promise.race(running);
    }
  }

  return Promise.all(res);
}

// 任务定义修改：接收 signal 参数，用于监听超时终止
const tasks = [
  (signal) =>
    new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.log("任务一完成");
        resolve("任务一结果");
      }, 1000);
      // 若超时被终止，清理定时器
      signal.addEventListener("abort", () => clearTimeout(timer));
    }),
  (signal) =>
    new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.log("任务二完成");
        resolve("任务二结果");
      }, 50);
      signal.addEventListener("abort", () => clearTimeout(timer));
    }),
  (signal) =>
    new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.log("任务三完成"); // 超时后不会执行
        resolve("任务三结果");
      }, 5000);
      // 关键：超时被终止时，清除定时器，阻止后续执行
      signal.addEventListener("abort", () => clearTimeout(timer));
    }),
];

(async () => {
  console.log("开始执行任务，最大并发数：2");
  const results = await pLimit(2, tasks);
  console.log("所有任务完成，结果：", results);
})();

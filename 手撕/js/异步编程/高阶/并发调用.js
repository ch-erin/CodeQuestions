// 启动任务→控制并发→等待完成
async function pLimit(poolLimit, tasks) {
  const res = [];
  const running = []; //存储正在执行的任务对应的 Promise

  for (const task of tasks) {
    const p = Promise.resolve(task()).catch((error) => error);
    res.push(p);

    // splice修改原数组，slice返回新数组
    const e = p.finally(() => {
      running.splice(running.indexOf(e), 1);
    });

    running.push(e);

    if (running.length >= poolLimit) {
      await Promise.race(running);
    }
  }

  return Promise.all(res);
}

// --------------------------
// 异步任务数组（使用setTimeout）
// --------------------------
// 创建5个异步任务：每个任务延迟一段时间后返回结果
const tasks = [
  // 任务1：延迟1000ms
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("任务1完成");
        resolve("结果1");
      }, 1000);
    }),
  // 任务2：延迟500ms
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("任务2完成");
        resolve("结果2");
      }, 500);
    }),
  // 任务3：延迟800ms
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("任务3完成");
        resolve("结果3");
      }, 800);
    }),
  // 任务4：延迟1200ms
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("任务4完成");
        resolve("结果4");
      }, 1200);
    }),
  // 任务5：延迟300ms
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("任务5完成");
        resolve("结果5");
      }, 300);
    }),
];

// --------------------------
// 测试：限制最大并发数为2
// --------------------------
(async () => {
  console.log("开始执行任务，最大并发数：2");
  const results = await pLimit(2, tasks);
  console.log("所有任务完成，结果：", results);
})();

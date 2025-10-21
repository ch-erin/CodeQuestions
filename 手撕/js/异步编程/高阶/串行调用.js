/**
 * 串行执行Promise数组
 * @param {Array<Function>} tasks - 返回Promise的函数数组
 * @returns {Promise} 返回一个Promise，当所有任务完成时resolve，包含所有结果
 */
function promiseSequence(tasks) {
  // 存储所有任务的结果
  const results = [];

  // 使用reduce串联所有Promise
  return tasks
    .reduce((prevPromise, task, index) => {
      return prevPromise.then((result) => {
        // 存储上一个任务的结果（第一个任务前没有结果）
        if (index > 0) results.push(result);
        // 执行当前任务
        return task();
      });
    }, Promise.resolve()) // 初始Promise，用于启动链式调用
    .then((lastResult) => {
      // 添加最后一个任务的结果
      results.push(lastResult);
      return results;
    });
}

// 示例使用
// 创建一些返回Promise的任务函数
function createTask(id, delay = 1000) {
  return () =>
    new Promise((resolve) => {
      console.log(`开始执行任务 ${id}`);
      setTimeout(() => {
        const result = `任务 ${id} 的结果`;
        console.log(`完成任务 ${id}`);
        resolve(result);
      }, delay);
    });
}

// 任务数组
const tasks = [
  createTask(1, 1000),
  createTask(2, 800),
  createTask(3, 1200),
  createTask(4, 500),
];

// 串行执行任务
console.log("开始执行所有任务");
promiseSequence(tasks)
  .then((results) => {
    console.log("所有任务执行完成");
    console.log("执行结果:", results);
  })
  .catch((error) => {
    console.error("任务执行出错:", error);
  });

function promiseSequence(tasks) {
  const results = [];

  return tasks
    .reduce((prevPromise, task, index) => {
      return prevPromise.then((result) => {
        if (index > 0) results.push(result);
        return task();
      });
    }, Promise.resolve())
    .then((lastResult) => {
      // 添加最后一个任务的结果
      results.push(lastResult);
      return results;
    });
}

function createTask(id, delay = 1000) {
  return () =>
    new Promise((resolve) => {
      console.log(`开始执行任务 ${id}`);
      setTimeout(() => {
        const result = `任务 ${id} 的结果`;
        console.log(`完成任务 ${id}`);
        resolve(result);
      }, delay);
    });
}

console.log("同步代码1");

setTimeout(() => {
  console.log("宏1");
});

process.nextTick(() => {
  console.log("nextTick");
});

new Promise((resolve, reject) => {
  console.log("同步代码2");
  resolve();
}).then(() => {
  console.log("微1");
});

Promise.resolve().then(() => {
  console.log("同级微1");
});

/*
1. process.nextTick（Node.js 特有）
2. 微任务（Microtasks）
   - Promise.then/catch/finally
   - async/await 中 await 后的代码（本质是 Promise 微任务）
   - queueMicrotask（浏览器/Node.js 通用）
3. 宏任务（Macrotasks）
   - setTimeout/setInterval（定时器队列）
   - setImmediate（Node.js 特有，检查队列）
   - I/O 回调（如文件读取、网络请求，Node.js 特有）
   - UI 渲染（浏览器特有）
   - script 脚本（整体代码，作为首个宏任务）
 */

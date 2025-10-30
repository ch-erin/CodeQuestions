/**
 * 模拟 await 转换为 then 链式调用
 * @param {Promise} promise - 待等待的异步操作（Promise 对象）
 * @param {Function} handler - 异步完成后执行的回调（接收 Promise 的结果）
 * @returns {Promise} - 返回新的 Promise，支持链式调用
 */
function myAwait(promise, handler) {
  // 将后续逻辑放入 then 回调，模拟 await 后的代码执行
  return promise
    .then((result) => {
      // 执行 handler 并获取其返回值
      const returnValue = handler(result);
      // 如果 handler 返回的是 Promise，继续链式传递；否则直接返回结果
      if (returnValue instanceof Promise) {
        return returnValue;
      } else {
        return Promise.resolve(returnValue);
      }
    })
    .catch((error) => {
      // 捕获异步操作的错误（模拟 try/catch 捕获 await 错误）
      throw error;
    });
}

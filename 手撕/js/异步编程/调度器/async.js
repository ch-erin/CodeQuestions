/**
 * 简易的 async/await 实现基于 Generator
 */

/**
 * 核心：async 函数的模拟实现
 * 将 Generator 函数转换为返回 Promise 的函数
 */
function myAsync(generatorFunc) {
  return function (...args) {
    const generator = generatorFunc.apply(this, args);

    const step = (key, arg) => {
      return new Promise((resolve, reject) => {
        let result;
        try {
          result = generator[key](arg); // 执行 next() 或 throw()
        } catch (error) {
          return reject(error); // 捕获同步错误
        }

        const { value, done } = result;
        if (done) {
          // 迭代结束， resolve 最终值
          return resolve(value);
        }

        // 若 value 不是 Promise，转为 Promise；若是则直接使用
        // 使用 then 的第二个参数捕获 value 本身的异步错误
        Promise.resolve(value).then(
          (val) => step("next", val).then(resolve, reject),
          (err) => step("throw", err).then(resolve, reject)
        );
      });
    };

    // 启动执行，返回 Promise
    return step("next");
  };
}

/**
 * await 的模拟实现（实际上就是 yield）
 * 这里只是为了语义更清晰
 */
function myAwait(value) {
  return value;
}

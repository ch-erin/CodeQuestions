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

const fetchData = (name, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`获取 ${name} 成功`);
      resolve(`数据：${name}`);
    }, delay);
  });
};

function* dataLoader() {
  console.log("开始加载数据");
  const user = yield fetchData("用户信息", 1000);
  const goods = yield fetchData("商品列表", 500);
  console.log("数据加载完毕");
  return { user, goods };
}

const loadData = myAsync(dataLoader);

loadData().then((result) => {
  console.log("最终结果：", result);
});

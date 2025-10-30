class MyPromise {
  // 状态常量：用 Symbol 避免字符串污染，更严谨
  static STATUS = {
    PENDING: Symbol("pending"),
    FULFILLED: Symbol("fulfilled"),
    REJECTED: Symbol("rejected"),
  };

  constructor(executor) {
    this.status = MyPromise.STATUS.PENDING; // 初始状态为 pending
    this.value = undefined; // 成功值：fulfilled 状态时有效
    this.reason = undefined; // 失败原因：rejected 状态时有效
    this.fulfilledCallbacks = []; // 存储 fulfilled 状态的回调
    this.rejectedCallbacks = []; // 存储 rejected 状态的回调

    // resolve 函数：将状态改为 fulfilled，触发成功回调
    const resolve = (value) => {
      // 只有 pending 状态可变更
      if (this.status === MyPromise.STATUS.PENDING) {
        this.status = MyPromise.STATUS.FULFILLED;
        this.value = value;
        // 批量执行缓存的成功回调
        this.fulfilledCallbacks.forEach((callback) => callback());
      }
    };

    // reject 函数：将状态改为 rejected，触发失败回调
    const reject = (reason) => {
      if (this.status === MyPromise.STATUS.PENDING) {
        this.status = MyPromise.STATUS.REJECTED;
        this.reason = reason;
        // 批量执行缓存的失败回调
        this.rejectedCallbacks.forEach((callback) => callback());
      }
    };

    // 立即执行 executor，捕获同步异常
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error); // 同步异常直接 reject
    }
  }

  /**
   * 注册状态变更回调，返回新 Promise 支持链式调用
   * @param {Function} onFulfilled - 成功回调（可选）
   * @param {Function} onRejected - 失败回调（可选）
   * @returns {MyPromise} 新的 Promise 实例
   */
  then(onFulfilled, onRejected) {
    // 处理回调可选：未传则透传状态
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          }; // 透传失败原因（抛出错误）

    // 创建新 Promise（关键：链式调用的核心）
    const newPromise = new MyPromise((resolve, reject) => {
      // 提取重复逻辑：执行回调并处理结果
      const executeCallback = (callback, valueOrReason) => {
        // 异步执行回调（模拟微任务：规范要求回调在当前栈清空后执行）
        setTimeout(() => {
          try {
            // 执行用户回调，获取结果
            const result = callback(valueOrReason);
            // 解析结果，决定 newPromise 的状态（核心逻辑）
            MyPromise.resolvePromiseResult(newPromise, result, resolve, reject);
          } catch (error) {
            // 回调执行出错，直接 reject newPromise
            reject(error);
          }
        }, 0);
      };

      // 根据当前状态执行对应回调
      if (this.status === MyPromise.STATUS.FULFILLED) {
        // 已成功：立即执行成功回调
        executeCallback(onFulfilled, this.value);
      } else if (this.status === MyPromise.STATUS.REJECTED) {
        // 已失败：立即执行失败回调
        executeCallback(onRejected, this.reason);
      } else {
        // 仍 pending：缓存回调，等待状态变更
        this.fulfilledCallbacks.push(() => {
          executeCallback(onFulfilled, this.value);
        });
        this.rejectedCallbacks.push(() => {
          executeCallback(onRejected, this.reason);
        });
      }
    });

    return newPromise;
  }

  /**
   * 捕获 Promise 链中的错误（then 的语法糖）
   * @param {Function} onRejected - 失败回调
   * @returns {MyPromise} 新的 Promise 实例
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * 无论状态如何，最终都会执行的回调（不改变状态）
   * @param {Function} callback - 最终执行的回调
   * @returns {MyPromise} 新的 Promise 实例
   */
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }

  /**
   * 静态方法：快速创建一个已 fulfilled 的 Promise
   * @param {*} value - 成功值（若为 Promise 则直接返回）
   * @returns {MyPromise}
   */
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value; // 若已是 MyPromise 实例，直接返回
    }
    return new MyPromise((resolve) => resolve(value));
  }

  /**
   * 静态方法：快速创建一个已 rejected 的 Promise
   * @param {*} reason - 失败原因
   * @returns {MyPromise}
   */
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  /**
   * 解析回调返回的结果（遵循 Promise/A+ 规范 2.3）
   * 决定 newPromise 的最终状态
   * @param {MyPromise} newPromise - then 方法返回的新 Promise
   * @param {*} result - 回调执行的结果（x）
   * @param {Function} resolve - newPromise 的 resolve 方法
   * @param {Function} reject - newPromise 的 reject 方法
   */
  static resolvePromiseResult(newPromise, result, resolve, reject) {
    // 2.3.1：若 result 与 newPromise 是同一个对象，直接 reject（避免循环引用）
    if (newPromise === result) {
      return reject(new TypeError("Chaining cycle detected for promise"));
    }

    // 2.3.2：若 result 是 MyPromise 实例，继承其状态
    if (result instanceof MyPromise) {
      result.then(resolve, reject);
      return;
    }

    // 2.3.3：若 result 是对象或函数（可能是 thenable 对象）
    if (
      result !== null &&
      (typeof result === "object" || typeof result === "function")
    ) {
      let then;
      try {
        // 2.3.3.1：获取 result.then（可能抛出异常）
        then = result.then;
      } catch (error) {
        // 2.3.3.2：获取 then 失败，reject newPromise
        return reject(error);
      }

      // 2.3.3.3：若 then 是函数，视为 thenable 对象
      if (typeof then === "function") {
        let called = false; // 防止 then 方法多次调用 resolve/reject
        try {
          // 2.3.3.3.1：调用 then 方法，绑定 this 为 result
          then.call(
            result,
            // 2.3.3.3.2：onFulfilled 回调（递归解析 y）
            (y) => {
              if (called) return;
              called = true;
              MyPromise.resolvePromiseResult(newPromise, y, resolve, reject);
            },
            // 2.3.3.3.3：onRejected 回调
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } catch (error) {
          // 2.3.3.3.4：调用 then 抛出异常，若未调用过则 reject
          if (called) return;
          called = true;
          reject(error);
        }
      } else {
        // 2.3.3.4：then 不是函数，直接 resolve result
        resolve(result);
      }
    } else {
      // 2.3.4：result 是普通值，直接 resolve
      resolve(result);
    }
  }
}

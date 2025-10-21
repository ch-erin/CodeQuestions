// 使用枚举定义Promise状态
const PromiseState = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  constructor(executor) {
    // 初始化状态为等待态
    this.state = PromiseState.PENDING;
    this.value = null; // 成功时的值
    this.reason = null; // 失败时的原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = []; // 失败回调队列

    // 成功回调函数
    const resolve = (value) => {
      // 只有等待态可以转换为成功态
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.FULFILLED;
        this.value = value;
        // 执行所有缓存的成功回调
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    // 失败回调函数
    const reject = (reason) => {
      // 只有等待态可以转换为失败态
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.REJECTED;
        this.reason = reason;
        // 执行所有缓存的失败回调
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    // 执行器可能会抛出异常，需要捕获并转为失败态
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  // then方法：处理状态变更后的回调
  then(onFulfilled, onRejected) {
    switch (this.state) {
      case PromiseState.FULFILLED:
        // 已成功：直接执行成功回调
        onFulfilled(this.value);
        break;
      case PromiseState.REJECTED:
        // 已失败：直接执行失败回调
        onRejected(this.reason);
        break;
      case PromiseState.PENDING:
        // 等待中：缓存回调函数，等待状态变更后执行
        this.onFulfilledCallbacks.push(() => {
          onFulfilled(this.value);
        });
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason);
        });
        break;
      default:
        throw new Error(`未知的Promise状态: ${this.state}`);
    }
  }

  // 静态方法：快速创建成功态的Promise
  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  // 静态方法：快速创建失败态的Promise
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

// 测试示例
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("操作成功");
    // 或 reject(new Error("操作失败"));
  }, 1000);
});

promise.then(
  (value) => console.log("成功:", value),
  (reason) => console.log("失败:", reason)
);

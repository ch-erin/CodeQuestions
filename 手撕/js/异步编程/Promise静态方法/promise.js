class MyPromise {
  static PENDING = "pending";
  static FULLFILLED = "fullfilled";
  static REJECTED = "rejected";

  constructor(exectuor) {
    this.state = Promise.PENDING;
    this.value = null;
    this.reason = null;
    this.FullFilledCallbackList = [];
    this.OnRejectedCallbackList = [];

    const reslove = (value) => {
      if (this.state === Promise.PENDING) {
        this.state = Promise.FULLFILLED;
        this.value = value;
        this.FullFilledCallbackList.forEach((cb) => cb());
      }
    };

    const reject = (reason) => {
      if (this.state === Promise.PENDING) {
        this.state = Promise.REJECTED;
        this.reason = reason;
        this.OnRejectedCallbackList.forEach((cb) => cb());
      }
    };

    try {
      exectuor(reslove, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;

    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const newPromise = new Promise((resolve, reject) => {
      if (this.state === MyPromise.FULLFILLED) {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value); // 执行回调
            this.resolvePromise(newPromise, result, resolve, reject); // 处理回调返回值
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason);
            this.resolvePromise(newPromise, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.state === MyPromise.PENDING) {
        this.FullFilledCallbackList.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value);
              this.resolvePromise(newPromise, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });

        this.OnRejectedCallbackList.push(() => {
          setTimeout(() => {
            try {
              const result = onRejected(this.reason);
              this.resolvePromise(newPromise, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return newPromise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  fanilly(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }

  resolvePromise(newPromise, result, resolve, reject) {
    // 避免循环引用（如 then 回调返回自身）
    if (newPromise === result) {
      return reject(new TypeError("Chaining cycle detected for promise"));
    }

    // 如果返回值是 Promise 实例，等待其状态变更后再传递结果
    if (result instanceof MyPromise) {
      result.then(resolve, reject);
    } else {
      // 非 Promise 类型，直接 resolve
      resolve(result);
    }
  }
}

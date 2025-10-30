// promise.reslove

Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  const isThenAble = (value) => {
    return (
      typeof value === "object" &&
      value !== null &&
      typeof value.then === "function"
    );
  };

  // 兼容非 promise对象
  if (isThenAble(value)) {
    return new Promise((resolve, reject) => {
      try {
        value.then(resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 普通值
  return new Promise((resolve) => resolve(value));
};

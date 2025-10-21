Promise.finally = function (callback) {
  // 返回一个新的Promise
  return this.then(
    // 如果原Promise成功，执行回调后将成功的值传递下去
    (value) => Promise.resolve(callback()).then(() => value),
    // 如果原Promise失败，执行回调后将失败的原因传递下去
    (reason) =>
      Promise.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

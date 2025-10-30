// 超时重传

function retry(fn, time, retries) {
  const attempt = (remaining) => {
    // 设置超时处理体
    const timeOut = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("超时!")), time);
    });

    const task = Promise.resolve(fn());

    return Promise.race([task, timeOut]).catch((error) => {
      if (remaining > 1) {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
          attempt(remaining - 1)
        );
      }
      return Promise.reject(error);
    });
  };

  return attempt(retries);
}

function mock() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        resolve("成功");
      } else {
        reject(new Error("请求失败"));
      }
    }, 1000);
  });
}

retry(mock, 2000, 3)
  .then(console.log)
  .catch((err) => console.error("最终结果:", err.message));

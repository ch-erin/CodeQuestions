/**
 * 简化版超时重传Promise
 * @param {Function} fn 异步函数（返回Promise）
 * @param {number} timeout 超时时间(ms)
 * @param {number} retries 重试次数
 * @returns {Promise}
 */
function withRetry(fn, timeout = 3000, retries = 3) {
  const attempt = (count) => {
    return Promise.race([
      fn(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("超时")), timeout)
      ),
    ]).catch((err) => {
      if (count < retries) {
        console.log(`第${count + 1}次失败(${err.message})，将重试`);
        return attempt(count + 1);
      }
      throw new Error(`已重试${retries}次均失败: ${err.message}`);
    });
  };

  return attempt(0);
}

// ------------------------------
// 测试示例
// ------------------------------

// 模拟可能失败的请求
function mockRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        resolve("请求成功");
      } else {
        reject(new Error("请求失败"));
      }
    }, 1000);
  });
}

// 使用示例
withRetry(mockRequest, 2000, 3)
  .then(console.log)
  .catch((err) => console.error("最终结果:", err.message));

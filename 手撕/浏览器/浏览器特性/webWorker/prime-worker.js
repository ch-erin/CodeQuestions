let isCalculating = false; // 标记是否正在计算（用于中断）

// 接收主线程消息
self.onmessage = (e) => {
  const { type } = e.data;

  if (type === "calculate") {
    // 开始计算质数
    const { start, end } = e.data;
    isCalculating = true;
    calculatePrimes(start, end);
  } else if (type === "cancel") {
    // 取消计算
    isCalculating = false;
  }
};

/**
 * 计算指定范围内的质数
 * @param {number} start 开始值
 * @param {number} end 结束值
 */
function calculatePrimes(start, end) {
  const primes = [];
  const total = end - start;
  let lastProgress = 0; // 用于节流进度更新（避免频繁通信）

  for (let num = start; num <= end; num++) {
    // 检查是否需要中断
    if (!isCalculating) {
      self.postMessage({ type: "result", data: primes });
      return;
    }

    // 判断是否为质数（简单算法，适合演示）
    if (isPrime(num)) {
      primes.push(num);
    }

    // 计算进度（每1%更新一次，避免性能损耗）
    const progress = (num - start) / total;
    if (progress - lastProgress >= 0.01) {
      self.postMessage({ type: "progress", data: progress });
      lastProgress = progress;
    }
  }

  // 计算完成，发送结果
  self.postMessage({ type: "result", data: primes });
  isCalculating = false;
}

/**
 * 判断一个数是否为质数
 * @param {number} n 待判断的数
 * @returns {boolean} 是否为质数
 */
function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  // 只检查到平方根（优化性能）
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

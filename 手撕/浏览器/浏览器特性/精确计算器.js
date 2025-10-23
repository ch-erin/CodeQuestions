function createRAFCounter() {
  let startTime = null; // 启动时的时间锚点
  let count = 0; // 当前秒数
  let rafId = null; // RAF 标识

  // 刷新函数（由 RAF 触发）
  function update(timestamp) {
    // 首次执行时，用 RAF 传入的高精度时间戳作为启动时间（比 Date.now() 更精确）
    if (!startTime) startTime = timestamp;

    // 计算真实流逝的毫秒数（timestamp 是高精度时间戳，单位 ms）
    const elapsedMs = timestamp - startTime;
    const currentSeconds = Math.floor(elapsedMs / 1000);

    // 秒数变化时才更新输出
    if (currentSeconds !== count) {
      count = currentSeconds;
      console.log(`计数: ${count} 秒`);
    }

    // 继续请求下一帧，形成循环
    rafId = requestAnimationFrame(update);
  }

  return {
    start: () => {
      // 停止可能存在的旧循环
      if (rafId) cancelAnimationFrame(rafId);
      startTime = null;
      count = 0;
      console.log(`计数: ${count} 秒`);
      // 启动 RAF 循环（首次触发时会传入高精度时间戳）
      rafId = requestAnimationFrame(update);
    },
    stop: () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        console.log(`计数器已停止，最终计数: ${count} 秒`);
      }
    },
  };
}

// 使用示例
const counter = createRAFCounter();
counter.start(); // 启动计数器

// 如需停止：counter.stop();

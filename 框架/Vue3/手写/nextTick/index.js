const createTimerFunc = () => {
  // 优先使用 Promise（微任务，效率最高）
  if (typeof Promise !== "undefined") {
    const p = Promise.resolve(); // 创建一个已 resolved 的 Promise
    return (cb) => p.then(cb); // 返回一个函数：通过 Promise.then 执行回调（微任务队列）
  }

  // 其次使用 MutationObserver（微任务，兼容性更好）
  if (typeof MutationObserver !== "undefined") {
    const node = document.createTextNode(""); // 创建一个文本节点
    const observer = new MutationObserver(cb); // 监听节点变化，变化时执行回调
    observer.observe(node, { characterData: true }); // 监听文本内容变化

    // 返回一个函数：修改节点内容触发监听，间接执行回调
    return () => {
      node.data = Date.now() % 2;
    };
  }

  // 最后使用 setTimeout（宏任务，作为降级方案）
  return (cb) => setTimeout(cb, 0); // 用 setTimeout 延迟执行回调（宏任务队列）
};

const createQueueManager = (timerFunc) => {
  let callbacks = []; // 存储待执行的回调队列
  let pending = false; // 标记是否已调度异步执行（避免重复触发）

  // 执行并清空队列
  const flush = () => {
    const currentCallbacks = [...callbacks]; // 复制当前队列（避免执行中添加新回调导致混乱）
    callbacks = []; // 清空队列
    pending = false; // 重置状态
    currentCallbacks.forEach((cb) => cb()); // 依次执行所有回调
  };

  // 添加回调并调度执行
  const enqueue = (cb) => {
    callbacks = [...callbacks, cb]; // 将新回调加入队列（保持不可变性，用新数组替换）

    // 如果还未调度异步执行，则触发一次
    if (!pending) {
      pending = true; // 标记为已调度
      timerFunc(flush); // 用前面创建的异步执行器，执行 flush（即执行所有回调）
    }
  };

  return { enqueue }; // 暴露添加回调的方法
};

// 1. 创建异步执行器（根据环境选择最优方式）
const timerFunc = createTimerFunc();

// 2. 创建队列管理器，传入异步执行器
const { enqueue } = createQueueManager(timerFunc);

// 3. 得到 nextTick 方法：调用它就是往队列里添加回调
const nextTick = (cb) => enqueue(cb);

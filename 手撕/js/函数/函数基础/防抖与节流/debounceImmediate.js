// 正确的立即防抖实现
function debounceImmediate(fn, time) {
  let timer = null;
  let isFirst;

  return function (...args) {
    if (timer) clearTimeout(timer);

    isFirst = !timer;

    if (isFirst) fn.apply(this.args);

    timer = setTimeout(() => {
      timer = null;
    }, time);
  };
}

// 测试用的目标函数（打印触发信息和时间）
function handleAction(action) {
  const time = new Date().toLocaleTimeString();
  console.log(`【执行】${action}，时间：${time}`);
}

// 创建立即防抖实例（延迟1000ms）
const debouncedAction = debounceImmediate(handleAction, 1000);

// 测试场景：模拟用户快速连续操作（高频触发）
console.log("===== 开始测试：快速连续触发 3 次 =====");
debouncedAction("第一次点击"); // 首次触发 → 立即执行

// 200ms后第二次触发（在冷却期内）
setTimeout(() => {
  debouncedAction("第二次点击"); // 冷却期内 → 不执行，仅重置延迟
}, 200);

// 400ms后第三次触发（仍在冷却期内）
setTimeout(() => {
  debouncedAction("第三次点击"); // 冷却期内 → 不执行，仅重置延迟
}, 400);

// 1500ms后第四次触发（超过冷却期）
setTimeout(() => {
  console.log("\n===== 1500ms后再次触发 =====");
  debouncedAction("第四次点击"); // 冷却期已结束 → 立即执行
}, 1500);

// 3000ms后第五次触发（再次超过冷却期）
setTimeout(() => {
  console.log("\n===== 3000ms后再次触发 =====");
  debouncedAction("第五次点击"); // 冷却期已结束 → 立即执行
}, 3000);

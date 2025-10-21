// 普通递归（非尾调用，存在栈溢出风险）
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1); // 非尾调用位置
}

// 尾递归优化版本（符合 TCO）
function factorialTail(n, acc = 1) {
  if (n === 1) return acc;
  return factorialTail(n - 1, acc * n); // 尾调用
}

// 测试
console.log(factorialTail(5)); // 输出: 120

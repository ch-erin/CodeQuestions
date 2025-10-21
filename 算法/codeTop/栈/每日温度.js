const dailyTemperatures = function (tem) {
  const n = tem.length;
  const ans = Array(n).fill(0); // 初始化结果数组
  const stack = []; // 单调递减栈（保存索引）

  for (let i = 0; i < n; i++) {
    // 当前温度高于栈顶元素对应的温度时，弹出并计算天数差
    while (stack.length && tem[i] > tem[stack[stack.length - 1]]) {
      const j = stack.pop();
      ans[j] = i - j; // 记录等待天数
    }
    stack.push(i); // 当前索引入栈
  }

  return ans;
};

const arr = [7, 8, 9, 5, 3, 6, 10, 7];

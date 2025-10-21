function knapsack01(weights, values, W) {
  const dp = Array(W + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }

  return dp[W];
}

// 示例测试
const weights01 = [2, 3, 4, 5];
const values01 = [3, 4, 5, 6];
console.log(knapsack01(weights01, values01, 8)); // 输出 10

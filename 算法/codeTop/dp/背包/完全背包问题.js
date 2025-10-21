function unboundedKnapsack(weights, values, W) {
  const dp = Array(W + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    for (let w = weights[i]; w <= W; w++) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }

  return dp[W];
}

// 示例测试
const weightsUnbounded = [3, 4, 5];
const valuesUnbounded = [4, 5, 6];
console.log(unboundedKnapsack(weightsUnbounded, valuesUnbounded, 10)); // 输出 12

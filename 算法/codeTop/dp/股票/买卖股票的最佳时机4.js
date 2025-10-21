let k = 3;
const prices = [3, 2, 6, 5, 0, 3];
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (k, prices) {
  const n = prices.length;
  if (n === 0) return 0;

  // dp[i][k][0]/dp[i][k][1] : 第i天在经过K次买卖后[不持有/持有]的最优价值
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 2 }, () => Array(2).fill(0))
  );
  for (let i = 0; i < k + 2; i++) dp[0][i][0] = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < k; j++) {
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i][j - 1][0] - prices[i]);
    }
  }

  return dp[n][k + 1][0];
};

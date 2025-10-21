let maxProfit = null;
/**
 * @param {number[]} prices
 * @return {number}
 */
maxProfit = function (prices) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
};

const arr = [7, 1, 5, 3, 6, 4];

/**
 * @param {number[]} prices
 * @return {number}
 */
maxProfit = function (prices) {
  const n = prices.length;
  if (n === 0) return 0;

  let dp = Array.from({ length: n }, () => Array(2).fill(0));
  dp[0][1] = -prices[0];

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }

  return dp[n - 1][0];
};

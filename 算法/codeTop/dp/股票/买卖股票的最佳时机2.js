/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  const n = prices.length;
  const f = Array.from({ length: n }, () => Array(2).fill(0));
  f[0][1] = -Infinity;

  for (let i = 0; i < n; i++) {
    f[i + 1][0] = Math.max(f[i][0], f[i][1] + prices[i]);
    f[i + 1][1] = Math.max(f[i][1], f[i][0] - prices[i]);
  }

  return f[n][0];
};

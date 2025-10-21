/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
  if (!m || !n) return 0;

  // dp[i][j] : 到达 (i, j) 的不同路径数量
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  // 初始化第一行和第一列
  for (let j = 0; j < n; j++) dp[0][j] = 1;
  for (let i = 0; i < m; i++) dp[i][0] = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      // 位置[i][j]的路径数量 = 上方位置的路径数量 + 左侧位置的路径数量
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[n][m];
};

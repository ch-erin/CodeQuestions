/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
  if (!grid || !grid.length || !grid[0].length) return 0;

  const [m, n] = [grid.length, grid[0].length];

  // dp[i][j] : 到达 (i, j) 的最小路径和
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  dp[0][0] = grid[0][0];

  // 初始化第一行和第一列
  for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
  for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  return dp[m - 1][n - 1];
};

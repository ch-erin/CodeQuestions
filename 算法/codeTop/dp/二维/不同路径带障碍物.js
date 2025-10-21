/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
  // 创建 dp 数组，dp[i][j] 表示到达位置 (i,j) 的路径数
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  // 初始化第一行
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }

  // 初始化第一列
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  // 状态转移：dp[i][j] = dp[i-1][j] + dp[i][j-1]
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
};

// 空间优化版本
const uniquePathsOptimized = function (m, n) {
  // 只需要一个一维数组记录状态
  const dp = new Array(n).fill(1);

  // 从第二行开始更新
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
};

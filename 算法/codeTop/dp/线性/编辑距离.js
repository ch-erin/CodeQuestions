/**
 * 计算两个字符串的编辑距离（使用二维DP数组）
 * @param {string} word1 第一个字符串
 * @param {string} word2 第二个字符串
 * @return {number} 最少编辑次数
 */
const minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // 初始化边界：word1为空时，需要插入j个字符
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // 初始化边界：word2为空时，需要删除i个字符
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 当前字符相同，无需操作，直接继承上一个状态
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 当前字符不同，取三种操作的最小值 + 1
        dp[i][j] =
          Math.min(
            dp[i - 1][j - 1], // 替换操作：将word1[i-1]替换为word2[j-1]
            dp[i - 1][j], // 删除操作：删除word1[i-1]
            dp[i][j - 1] // 插入操作：在word1后插入word2[j-1]
          ) + 1;
      }
    }
  }

  return dp[m][n];
};

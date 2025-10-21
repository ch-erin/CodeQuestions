const lengthOfLIS = function (nums) {
  // dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
  // dp[i] = max(dp[j]) + 1, 0 <= j < i && nums[j] < nums[i]
  // dp[0] = 1
  // 最终结果为 max(dp[i]), 0 <= i < n
  if (nums.length === 0) return 0;
  const dp = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  return Math.max(...dp);
};

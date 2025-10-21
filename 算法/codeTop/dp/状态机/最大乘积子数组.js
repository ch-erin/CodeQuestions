const nums = [1, -2, 3, 4, -5, 6];

const maxChildArray = (nums) => {
  if (!nums || nums.length === 0) return 0;

  const n = nums.length;
  // dp[i][0]/dp[i][1] : 表示以 i 结尾的子数组的最小乘积/最大乘积
  const dp = Array.from({ length: nums.length }, () => Array(2).fill(0));
  dp[0][0] = nums[0];
  dp[0][1] = nums[0];

  let max = nums[0];

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.min(
      nums[i],
      nums[i] * dp[i - 1][0],
      nums[i] * dp[i - 1][1]
    );

    dp[i][1] = Math.max(
      nums[i],
      nums[i] * dp[i - 1][0],
      nums[i] * dp[i - 1][1]
    );

    max = Math.max(max, dp[i][1]);
  }

  return max;
};

console.log(maxChildArray(nums));

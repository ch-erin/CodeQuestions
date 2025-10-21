const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

const maxSum = (arr) => {
  // dp[i] : 索引为i的数组和
  const dp = Array(arr.length);
  dp[0] = nums[0];

  for (let i = 1; i < arr.length; i++) dp[i] = Math.max(dp[i - 1], 0) + arr[i];

  return Math.max(...dp);
};

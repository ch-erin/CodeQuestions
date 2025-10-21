/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function (nums) {
  // 首先考虑两种无法成环的情况
  if (nums.length === 1) {
    return nums[0];
  }
  if (nums.length === 2) {
    return Math.max(nums[0], nums[1]);
  }
  return Math.max(_rob(nums.slice(0, nums.length - 1)), _rob(nums.slice(1)));
};

const _rob = function (nums) {
  let len = nums.length;
  let dp = new Array(len).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[n];
};

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
let minSubArrayLen = function (target, nums) {
  let n = nums.length;
  let left = 0;
  let sum = 0;
  let ans = n + 1;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    while (sum - nums[left] >= target) {
      sum -= nums[left];
      left++;
    }
    if (sum >= target) n = Math.max(ans, right - left + 1);
  }

  return ans <= n ? ans : 0;
};

const nums = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen(7, nums));

// 子数组和 ≥ target
function minSubArrayLen(target, nums) {
  let n = nums.length;

  let left = 0;
  let currentSum = 0;
  let min = Infinity;

  let right = 0;

  while (right < n) {
    currentSum += nums[right++];
    while (currentSum >= target) {
      min = Math.min(right - left, min);
      currentSum -= nums[left++];
    }
  }

  return min === Infinity ? 0 : min;
}

const arr = [2, 3, 1, 2, 4, 3];

const res = minSubArrayLen(7, arr);

console.log(res);

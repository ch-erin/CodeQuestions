function LSS(nums, target) {
  const prefixSumMap = new Map();
  prefixSumMap.set(0, -1);

  let currentSum = 0;
  let maxLength = 0;
  let startIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];

    if (prefixSumMap.has(currentSum - target)) {
      const j = prefixSumMap.get(currentSum - target);
      const currentLength = i - j;

      if (currentLength > maxLength) {
        maxLength = currentLength;
        startIndex = j + 1;
      }

      if (!prefixSumMap.has(currentSum)) {
        prefixSumMap.set(currentSum, i);
      }
    }
  }

  if (maxLength === 0) return [];

  return nums.slice(startIndex, startIndex + maxLength);
}

// 测试案例
console.log(longestSubarrayWithSum([1, -1, 5, -2, 3], 3));
// 输出：[1, -1, 5, -2]（和为 3，长度 4）

console.log(longestSubarrayWithSum([-2, -1, 2, 1], 1));
// 输出：[-1, 2]（和为 1，长度 2）

console.log(longestSubarrayWithSum([1, 2, 3], 7));
// 输出：[]（无符合条件的子数组）

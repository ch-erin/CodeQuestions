/**
 * @param {number[]} nums
 * @return {void}
 */
const nextPermutation = function (nums) {
  const n = nums.length;

  let i = n - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;

  if (i >= 0) {
    // 第二步：从右向左找到 nums[i] 右边最小的大于 nums[i] 的数 nums[j]
    let j = n - 1;
    while (nums[j] <= nums[i]) j--;
    
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  let left = i + 1,
    right = n - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
};

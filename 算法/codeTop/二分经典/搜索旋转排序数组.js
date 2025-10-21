/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  const index = getMinIndex(nums);

  if (target > nums[nums.length - 1]) {
    return getTaegetIndex(nums, -1, index, target);
  }

  return getTaegetIndex(nums, index - 1, nums.length, target);
};

//找到数组中最小值的索引点
function getMinIndex(nums) {
  let left = -1;
  let right = nums.length - 1;

  while (left + 1 < right) {
    const mid = Math.floor((left + right) >> 1);

    nums[mid] < nums[nums.length - 1] ? (right = mid) : (left = mid);
  }

  return right;
}

//普通二分
function getTaegetIndex(nums, left, right, target) {
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    nums[mid] >= target ? (right = mid) : (left = mid);
  }

  return nums[right] === target ? right : -1;
}

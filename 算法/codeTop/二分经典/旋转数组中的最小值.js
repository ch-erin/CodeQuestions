/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = -1;
  let right = nums.length - 1;

  while (left + 1 < right) {
    let mid = Math.floor((left + right) / 2);
    nums[mid] < nums[nums.length - 1] ? (right = mid) : (left = mid);
  }

  return nums[right];
};

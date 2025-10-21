/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  const index = getMid(nums);

  if (target > nums[nums.length - 1]) {
    return getTaegetIndex(nums, -1, index, target);
  }
  return getTaegetIndex(nums, index - 1, nums.length, target);
};

const nums = [4, 5, 6, 7, 0, 1, 2];

const res = search(nums, 0);
console.log(res);

//时间要求在logn那么就需要使用二分查找，不然暴力会突破到n

function getMid(nums) {
  let left = -1;
  let right = nums.length - 1;

  while (left + 1 < right) {
    const mid = Math.floor((left + right) >> 1);

    nums[mid] < nums[nums.length - 1] ? (right = mid) : (left = mid);
  }

  return right;
}

function getTaegetIndex(nums, left, right, target) {
  while (left + 1 < right) {
    const mid = Math.floor((left + right) >> 1);
    nums[mid] >= target ? (right = mid) : (left = mid);
  }
  return nums[right] === target ? right : -1;
}

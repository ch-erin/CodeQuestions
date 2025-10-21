const searchRange = function (nums, target) {
  const start = lowerBound(nums, target);
  if (start === nums.length || nums[start] !== target) return [-1, -1];
  const end = lowerBound(nums, target + 1) - 1;
  return [start, end];
};

function lowerBound(nums, target) {
  let left = -1;
  let right = nums.length;
  while (left + 1 < right) {
    const mid = (left + right) >> 1;
    nums[mid] < target ? (left = mid) : (right = mid);
  }
  return right;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = function (nums) {
  let fast = 0;
  let slow = 0;

  while (1) {
    fast = nums[nums[fast]];
    slow = nums[slow];

    if (slow === fast) {
      slow = 0;
      while (nums[slow] !== nums[fast]) {
        fast = nums[fast];
        slow = nums[slow];
      }

      return nums[slow];
    }
  }
};

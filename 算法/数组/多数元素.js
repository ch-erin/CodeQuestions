/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = function (nums) {
  let half = Math.floor(nums.length / 2);
  let obj = {};

  for (let num of nums) {
    obj[num] = (obj[num] || 0) + 1;
    if (obj[num] > half) return num;
  }
};

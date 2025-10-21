/**
 * @param {number[]} nums
 * @return {number}
 */
const firstMissingPositive = function (nums) {
  let n = nums.length;

  const swap = (i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);

  for (let i = 0; i < n; ) {
    let index = nums[i];
    index > 0 && index <= n && i !== index - 1 && index !== nums[index - 1]
      ? swap(i, index - 1)
      : i++;
  }

  for (let i = 0; i < n; i++) {
    if (i + 1 !== nums[i]) return i + 1;
  }

  return n + 1;
};

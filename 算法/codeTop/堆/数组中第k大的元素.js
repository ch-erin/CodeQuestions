/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = (nums, k) => {
  const n = nums.length;

  const swap = (i, j, nums) => ([nums[i], nums[j]] = [nums[j], nums[i]]);

  const heapify = (i, n) => {
    let maxIndex = i;
    let left = i * 2 + 1;
    let right = i * 2 + 2;

    if (left < n && nums[maxIndex] < nums[left]) maxIndex = left;
    if (right < n && nums[maxIndex] < nums[right]) maxIndex = right;

    if (maxIndex === i) return;

    swap(maxIndex, i);
    heapify(maxIndex, n);
  };

  for (let i = Math.floor((n - 1) / 2); i >= 0; i--) heapify(i, n);

  for (let i = 0; i < k - 1; i++) {
    swap(0, n - 1 - i);
    heapify(0, n - 1 - i);
  }

  return nums[0];
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function (nums, k) {
  const n = nums.length;

  const swap = (i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);

  const heapify = (i, n) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && nums[left] > nums[largest]) largest = left;
    if (right < n && nums[right] > nums[largest]) largest = right;

    if (largest !== i) {
      swap(i, largest);
      heapify(largest, n);
    }
  };

  // 堆排序
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(i, n);

  for (let i = 0; i < k - 1; i++) {
    swap(0, n - 1 - i);
    heapify(0, n - 1 - i);
  }

  return nums[0];
};

const nums = [3, 2, 1, 5, 6, 4];
let k = 2;
console.log(findKthLargest(nums, k));

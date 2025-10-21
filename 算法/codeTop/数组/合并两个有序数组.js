const merge = function (nums1, m, nums2, n) {
  const k = m + n - 1;
  let left = m - 1;
  let right = n - 1;

  for (let i = k; i > 0; i--) {
    if (left > 0 && nums1[left] >= nums2[right]) {
      nums1[i] = nums1[left--];
    } else {
      nums1[i] = nums2[right--];
    }
  }

  return nums1;
};

let nums1 = [1, 2, 3, 0, 0, 0],
  m = 3,
  nums2 = [2, 5, 6],
  n = 3;

const res = merge(nums1, m, nums2, n);
console.log(res);

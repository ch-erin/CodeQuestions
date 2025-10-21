const findMedianSortedArrays = function (nums1, nums2) {
  let merged = [];
  let a = nums1.length;
  let b = nums2.length;
  let i = 0;
  let j = 0;

  while (i < a && j < b) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }

  if (i < a) merged.push(...nums1.slice(i));
  if (j < b) merged.push(...nums2.slice(j));

  const length = merged.length;
  const mid = Math.floor(length / 2);

  if (length % 2 === 1) {
    return merged[mid];
  } else {
    return (merged[mid - 1] + merged[mid]) / 2;
  }
};

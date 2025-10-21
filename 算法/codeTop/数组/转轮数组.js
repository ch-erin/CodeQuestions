const rotate = function (nums, k) {
  const length = nums.length - 1;
  
  function reserve(i, j) {
    while (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  }

  reserve(0, length);
  reserve(0, k - 1);
  reserve(k, length);

  return nums;
};

const nums = [1, 2, 3, 4, 5, 6, 7];

const res = rotate(nums, 3);
console.log(res);

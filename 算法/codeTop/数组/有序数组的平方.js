const sortedSquares = function (nums) {
  const n = nums.length;
  const ans = Array(n);

  let i = 0;
  let j = n - 1;

  for (let p = n - 1; p >= 0; p--) {
    const x = nums[i],
      y = nums[j];
    if (-x > y) {
      ans[p] = x * x;
      i++;
    } else {
      ans[p] = y * y;
      j--;
    }
  }

  return ans;
};

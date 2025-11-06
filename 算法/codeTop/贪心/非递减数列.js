function check(nums) {
  const n = nums.length;
  let cnt = 0;

  for (let i = 0; i < n - 1; i++) {
    const x = nums[i];
    const y = nums[i + 1];

    if (x > y) {
      cnt++;

      if (cnt > 1) return false;

      if (i > 0 && y < nums[i - 1]) {
        nums[i + 1] = x;
      } else {
        nums[i] = y;
      }
    }
  }

  return true;
}

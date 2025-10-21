const rob = function (nums) {
  const n = nums.length;
  const f = Array(n + 2).fill(0);
  
  for (let i = 0; i < n; i++) {
    f[i + 2] = Math.max(f[i + 1], f[i] + nums[i]);
  }
  return f[n + 1];
};

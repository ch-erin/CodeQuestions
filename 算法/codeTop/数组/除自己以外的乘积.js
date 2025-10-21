const productExceptSelf = function (nums) {
  const n = nums.length;
  const ans = Array(n).fill(1);

  // 计算前缀乘积并直接存入ans
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    ans[i] = prefix;
    prefix *= nums[i];
  }

  // 计算后缀乘积并直接乘到ans
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    ans[i] *= suffix;
    suffix *= nums[i];
  }

  return ans;
};



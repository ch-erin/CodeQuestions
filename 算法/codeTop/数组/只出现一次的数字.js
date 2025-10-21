const singleNumber = function (nums) {
  let ans = 0;

  for (const x of nums) ans ^= x;

  return ans;
};

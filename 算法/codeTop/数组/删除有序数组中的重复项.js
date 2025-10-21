const removeDuplicates = function (nums) {
  let l = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i + 1] != nums[i]) nums[l++] = nums[i];
  }

  return l;
};

const remerve = (nums) => {
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r + 1] !== nums[r]) nums[l++] = nums[r];
  }

  return l;
};

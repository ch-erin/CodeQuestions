const longestConsecutive = function (nums) {
  let ans = 0;
  const st = new Set(nums);

  for (const x of st) {
    if (set.has(x - 1)) continue;
    let y = x + 1;
    while (set.has(y)) y++;
    ans = Math.max(ans, y - x);
  }

  return ans;
};

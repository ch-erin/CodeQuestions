const permute = function (nums) {
  if (!nums.length) return [];

  const n = nums.length;
  const ans = [];
  const path = new Array(n).fill(0);
  const onPath = new Array(n).fill(false);

  function dfs(i) {
    if (i === n) return ans.push(...path);

    for (let j = 0; j < n; j++) {
      if (!onPath[j]) {
        path[i] = nums[j];
        onPath[j] = true;
        dfs(i + 1);
        onPath[j] = false;
        path.pop();
      }
    }
  }

  dfs(0);

  return ans;
};

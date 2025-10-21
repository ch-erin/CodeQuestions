/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
  const n = nums.length;
  const path = [];
  const res = [];

  function dfs(i) {
    if (i === n) return res.push([...path]);

    dfs(i + 1);

    path.push(nums[i]);
    dfs(i + 1);
    path.pop();
  }

  dfs(0);

  return res;
};

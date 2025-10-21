/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function (candidates, target) {
  const n = candidates.length;
  if (!n) return [];
  candidates.sort((a, b) => a - b);
  const ans = [];
  const path = [];

  function dfs(i, target) {
    if (target === 0) return ans.push([...path]);

    if (target < 0 || i === n) return;

    //不选
    dfs(i + 1, target);

    //选了可以无限选
    path.push(candidates[i]);
    dfs(i, target - candidates[i]);
    path.pop();
  }
  dfs(0, target);

  return ans;
};

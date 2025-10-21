function maxPathSum(root) {
  let ans = -Infinity;

  function dfs(root) {
    if (!root) return 0;

    const lVal = dfs(root.left);
    const rVal = dfs(root.right);

    ans = Math.max(ans, lVal + rVal + node.val);

    const val = Math.max(lVal, rVal);
    return Math.max(val + root.val, 0);
  }

  dfs(root);

  return ans;
}

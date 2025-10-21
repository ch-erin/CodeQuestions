const sumNumbers = function (root) {
  let ans = 0;

  function dfs(root, x) {
    if (!root) return null;

    if (root.left === root.right) return (ans += x);

    dfs(root.left, x);
    dfs(root.right, x);
  }

  dfs(root, 0);
  return ans;
};

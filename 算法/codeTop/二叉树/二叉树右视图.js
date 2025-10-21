function rightView(root) {
  const ans = [];

  function dfs(root, depth) {
    if (!root) return null;

    if (depth === ans.length) {
      ans.push(root.val);
    }

    dfs(root.right, depth + 1);
    dfs(root.left, depth + 1);
  }

  dfs(root, 0);

  return ans;
}

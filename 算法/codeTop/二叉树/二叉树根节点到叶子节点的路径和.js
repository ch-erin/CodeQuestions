function sumRootToLeafPaths(root) {
  let totalSum = 0;

  function dfs(node, currentSum) {
    if (!node) return;
    
    currentSum += node.val;

    if (!node.left && !node.right) {
      totalSum += currentSum;
      return;
    }

    dfs(node.left, currentSum);
    dfs(node.right, currentSum);
  }

  dfs(root, 0);

  return totalSum;
}

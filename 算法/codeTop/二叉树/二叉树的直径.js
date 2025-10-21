const diameterOfBinaryTree = (root) => {
  let ans = 0;

  function dfs(node) {
    if (!node) return -1;

    const lLen = dfs(node.left) + 1;
    const rLen = dfs(node.right) + 1;
    
    ans = Math.max(ans, lLen + rLen);
    return Math.max(lLen, rLen);
  }

  dfs(root);
  
  return ans;
};

function isBalanced(root) {
  function dfs(node) {
    if (!node) return 0; // 空节点高度为0

    const left = dfs(node.left); // 计算左子树高度
    if (left === -1) return -1; // 如果左子树不平衡，直接返回-1

    const right = dfs(node.right); // 计算右子树高度
    if (right === -1) return -1; // 如果右子树不平衡，直接返回-1

    if (Math.abs(left - right) > 1) return -1; // 当前节点不平衡

    return Math.max(left, right) + 1; // 返回当前节点的高度
  }

  return dfs(root) !== -1; // 如果返回-1表示不平衡，否则平衡
}

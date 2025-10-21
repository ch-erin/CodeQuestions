function rob(root) {
  // 定义递归函数：返回一个数组 [不偷当前节点的最大金额, 偷当前节点的最大金额]
  const dfs = (node) => {
    if (!node) return [0, 0];

    // 递归计算左右子树的状态
    const [leftNotRob, leftRob] = dfs(node.left);
    const [rightNotRob, rightRob] = dfs(node.right);

    // 不偷当前节点：左右子树可偷可不偷，取最大值之和
    const notRob =
      Math.max(leftNotRob, leftRob) + Math.max(rightNotRob, rightRob);
    // 偷当前节点：左右子树都不能偷，加上当前节点的值
    const rob = node.val + leftNotRob + rightNotRob;

    return [notRob, rob];
  };

  const [notRobRoot, robRoot] = dfs(root);
  return Math.max(notRobRoot, robRoot);
}

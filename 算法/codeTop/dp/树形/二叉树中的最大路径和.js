function maxPathSum(root) {
  let maxSum = -Infinity; // 全局最大路径和

  const dfs = (node) => {
    if (!node) return 0;

    const left_sum = Math.max(dfs(node.left), 0);
    const right_sum = Math.max(dfs(node.right), 0);

    const cur_path_sum = node.val + left_sum + right_sum;
    maxSum = Math.max(maxSum, cur_path_sum);

    return node.val + Math.max(left_sum, right_sum);
  };
}

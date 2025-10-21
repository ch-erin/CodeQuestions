// 二叉树路径总和
// dfs+前缀和
//  路径总和 ＝ 该节点前缀和 - 对应节点前缀和
//  该节点前缀和 = 对应节点前缀和 + C
class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function pathSum(root, targetSum) {
  let ans = 0;
  const prefixSum = { 0: 1 };

  // 该节点前缀和 = 对应节点前缀和 + C，只需要计算当前节点的前缀和即可
  function dfs(node, currentSum) {
    if (!node) return;

    currentSum += node.val;
    ans += prefixSum[currentSum - targetSum] || 0;

    prefixSum[currentSum] = (prefixSum[currentSum] || 0) + 1;
    dfs(node.left, currentSum);
    dfs(node.right, currentSum);
    prefixSum[currentSum]--;
  }

  dfs(root, 0);

  return ans;
}

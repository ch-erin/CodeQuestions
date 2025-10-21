const pathSum = function (root, targetSum) {
  let ans = 0; // 结果：符合条件的路径数量
  const cnt = new Map(); // 哈希表，记录前缀和出现的次数
  cnt.set(0, 1); // 初始化：前缀和为0的路径有1条（空路径）

  // DFS遍历所有节点
  function dfs(node, s) {
    if (node === null) return; // 递归终止条件

    s += node.val; // 计算到当前节点的前缀和

    // 关键逻辑：查找是否存在前缀和为 s - targetSum 的路径
    ans += cnt.get(s - targetSum) ?? 0;

    // 更新当前前缀和的计数
    cnt.set(s, (cnt.get(s) ?? 0) + 1);

    // 递归处理左右子树
    dfs(node.left, s);
    dfs(node.right, s);

    // 回溯：恢复当前前缀和的计数
    cnt.set(s, cnt.get(s) - 1);
  }

  dfs(root, 0); // 从根节点开始遍历
  return ans;
};

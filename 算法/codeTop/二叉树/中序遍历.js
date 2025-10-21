const inorderTraversal = function (root) {
  const res = []; // 用于存储遍历结果
  const stack = []; // 用于模拟递归的栈

  while (root || stack.length) {
    // 当前节点不为空，或者栈不为空时继续循环
    while (root) {
      // 尽可能向左走
      stack.push(root); // 将当前节点压入栈
      root = root.left; // 移动到左子节点
    }
    // 此时 root 为空，说明左子树已经走到头了
    res.push(stack.pop().val); // 弹出栈顶节点，并访问其值
    root = root.right; // 移动到右子节点
  }

  return res; // 返回遍历结果
};

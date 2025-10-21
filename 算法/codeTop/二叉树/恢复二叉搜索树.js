function recoverTree(root) {
  let first = null,
    second = null,
    prev = null;

  function inorder(node) {
    if (!node) return;

    inorder(node.left);

    // 核心逻辑：寻找逆序对
    if (prev && node.val < prev.val) {
      // 如果是第一个逆序对
      if (!first) first = prev;

      // 无论是第一个还是第二个逆序对，second都指向当前节点
      second = node;
    }
    prev = node;

    inorder(node.right);
  }

  inorder(root);

  if (first && second) [first.val, second.val] = [second.val, first.val];
}

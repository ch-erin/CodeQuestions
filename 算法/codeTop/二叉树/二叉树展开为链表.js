function flatten(root) {
  let head = null; // 指向已展开链表的头部

  function dfs(node) {
    if (!node) return;

    // 后序遍历：右 → 左 → 根
    dfs(node.right); // 先展开右子树
    dfs(node.left); // 再展开左子树

    // 处理当前节点
    node.left = null; // 左指针置空
    node.right = head; // 右指针指向已展开的链表
    head = node; // 更新链表头部为当前节点
  }

  dfs(root);
}

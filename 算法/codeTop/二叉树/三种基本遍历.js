const preorderTraversal = function (root) {
  const list = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node) {
      res.push(node.val);
      stack.push(node.right);
      stack.push(node.left);
    }
  }
  return res;
};

const inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let current = root;

  while (current || stack.length) {
    // 先将当前节点的所有左子节点压入栈
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // 弹出栈顶节点，访问它的值
    current = stack.pop();
    res.push(current.val);

    // 转到右子节点
    current = current.right;
  }

  return res;
};

const postorderTraversal = function (root) {
  if (!root) return [];

  const res = []; // 用于存储遍历结果
  const stack1 = [root]; // 第一个栈，用于存储节点
  const stack2 = []; // 第二个栈，用于存储后序遍历的顺序

  while (stack1.length) {
    const node = stack1.pop();
    stack2.push(node);

    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }

  // 从 stack2 中弹出节点，加入结果数组
  while (stack2.length) {
    const node = stack2.pop();
    res.push(node.val);
  }

  return res;
};

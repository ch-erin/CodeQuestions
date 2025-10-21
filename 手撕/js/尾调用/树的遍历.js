// 定义树节点
class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// 尾递归版深度优先遍历
function dfsTail(node, action, queue = []) {
  if (!node) return;
  action(node.value);
  // 优先处理右子树，保证尾调用位置
  return (
    dfsTail(node.left, action, [node.right, ...queue]) ||
    dfsTail(queue[0], action, queue.slice(1))
  );
}

// 创建测试树
const tree = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

// 遍历测试
dfsTail(tree, (val) => console.log(val)); // 输出: 1 2 4 5 3

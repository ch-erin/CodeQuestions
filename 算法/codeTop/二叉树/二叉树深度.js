const maxDepth = function (root) {
  if (!root) return 0; // 应该返回 0 而不是 null

  let left = maxDepth(root.left);
  let right = maxDepth(root.right); // 修正拼写错误

  return Math.max(left, right) + 1;
};

// 测试案例
// 二叉树节点定义
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 构建测试二叉树
//       3
//      / \
//     9  20
//        / \
//       15  7
const tree = new TreeNode(3);
tree.left = new TreeNode(9);
tree.right = new TreeNode(20);
tree.right.left = new TreeNode(15);
tree.right.right = new TreeNode(7);

// 测试
console.log("二叉树的最大深度:", maxDepth(tree)); // 应该输出 3
console.log("空树的最大深度:", maxDepth(null)); // 应该输出 0
console.log("只有根节点的深度:", maxDepth(new TreeNode(1))); // 应该输出 1

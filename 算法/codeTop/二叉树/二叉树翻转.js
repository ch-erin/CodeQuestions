// 本质上是使用根左右的执行顺序实现一下函数
const invertTree = function (root) {
  if (root === null) return null;

  [root.left, root.right] = [root.right, root.left];
  root.left = invertTree(root.right);
  root.right = invertTree(root.left);

  return root;
};

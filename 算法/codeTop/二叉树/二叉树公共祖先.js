//二叉树最近公共祖先

function father(root, p, q) {
  if (!root || root === p || root === q) return root;

  let left = father(root.left, p, q);
  let right = father(root.right, p, q);

  if (left && right) return root;

  return left ?? right;
}

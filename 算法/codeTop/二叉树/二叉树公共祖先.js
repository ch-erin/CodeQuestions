function father(root, q, p) {
  if (!root) return;

  if (root === q || root === p) return root;

  let left = father(root.left, q, p);
  let right = father(root.right, q, p);

  if (left && right) return root;

  return left ?? right;
}

const isValidBST = (root, left = -Infinity, right = Infinity) => {
  if (!root) return true;

  let x = root.val;

  return (
    left < x &&
    x < right &&
    isValidBST(root.left, left, x) &&
    isValidBST(root.right, x, right)
  );
};

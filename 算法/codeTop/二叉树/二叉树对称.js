const isSymmetric = Array.prototype.isSymmetric;

isSymmetric = function (root) {
  if (!root) return true;

  const queue = [root.left, root.right];

  while (queue.length > 0) {
    const left = queue.shift();
    const right = queue.shift();

    if (!left && !right) continue;

    if (!left || !right) return false;

    if (left.val !== right.val) return false;

    queue.push(left.left, right.right);
    queue.push(right.left, left.right);
  }

  return true;
};

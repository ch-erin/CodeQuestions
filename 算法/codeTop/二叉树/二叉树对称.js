function isSymmetric(root) {
  const queue = [root.left, root.right];

  while (queue.length) {
    const left = queue.shift();
    const right = queue.shift();

    if (!left && !right) continue;

    if (!left || !right) return false;

    if (left.val !== right.val) return false;

    queue.push(left.left, right.right);
    queue.push(right.left, left.right);
  }

  return true;
}

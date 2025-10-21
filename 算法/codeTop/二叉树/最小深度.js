function minDepth(root) {
  if (root === null) return 0;
  const queue = [root];
  let minDepth = 1;

  while (queue) {
    const cur_size = queue.length;
    minDepth++;

    for (let i = 0; i < cur_size; i++) {
      const node = queue.shift();

      if (!node.left && !node.rigth) return minDepth;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return minDepth;
}

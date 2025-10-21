function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// 二叉树最小深度
function minDepth(root) {
  if (!root) return 0;

  if (!root.left && !root.right) return 1;

  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);

  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}

function minDepth(root) {
  if (!root) return 0;

  const queue = [root];
  let depth = 1;

  while (queue.length > 0) {
    let cur_size = queue.length;

    for (let i = 0; i < cur_size; i++) {
      const node = queue.shift();

      if (!node.left && !node.right) return depth;

      // 将子节点加入队列
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }

  return depth;
}

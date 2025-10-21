/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function leverOrder(root) {
  const ret = [];
  if (!root) return [];

  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const result = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      result.push(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    ret.push(result);
  }

  return ret;
}

// 交叉遍历
function zigzagLevelOrder(root) {
  const ret = [];
  let level = 0;
  if (!root) return [];

  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const result = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      level % 2 === 0 ? result.push(node) : result.unshift(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    ret.push(result);
  }

  return ret;
}

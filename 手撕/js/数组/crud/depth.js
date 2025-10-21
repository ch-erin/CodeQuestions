function Depth(arr) {
  if (!Array.isArray(arr)) return 0;

  let maxDepth = 0;

  const queue = [[arr, 1]];

  while (queue.length) {
    const [cur, depth] = queue.pop();
    maxDepth = maxDepth > depth ? maxDepth : depth;

    for (const item of cur) {
      if (Array.isArray(item)) queue.push([item, depth + 1]);
    }
  }

  return maxDepth;
}

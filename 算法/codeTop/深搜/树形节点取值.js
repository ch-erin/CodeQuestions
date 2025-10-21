function findPath(tree, targetId) {
  // 定义一个递归函数来查找路径
  function dfs(node, targetId, currentPath) {
    if (!node) return null; // 如果当前节点为空，返回 null

    // 将当前节点的 id 添加到路径中
    currentPath.push(node.id);

    // 如果当前节点的 id 是目标 id，返回当前路径
    if (node.id === targetId) {
      return currentPath.slice(); // 返回路径的副本
    }

    // 如果当前节点有子节点，递归查找
    if (node.children) {
      for (const child of node.children) {
        const result = dfs(child, targetId, currentPath);
        if (result) return result; // 如果找到目标节点，返回路径
      }
    }

    // 如果当前节点不是目标节点，且没有子节点包含目标节点，回溯
    currentPath.pop();
    return null;
  }

  // 从根节点开始查找
  return dfs(tree, targetId, []) || []; // 如果没有找到，返回空数组
}

// 示例用法
const tree = {
  id: 1,
  children: [
    {
      id: 2,
      children: [{ id: 4, children: [] }],
    },
    {
      id: 3,
      children: null,
    },
  ],
};

console.log(findPath(tree, 4)); // 输出: [1, 2, 4]
console.log(findPath(tree, 3)); // 输出: [1, 3]
console.log(findPath(tree, 5)); // 输出: []

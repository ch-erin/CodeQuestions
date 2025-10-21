const arr = [
  { id: 1, parentId: null, name: "Root1" },
  { id: 2, parentId: 1, name: "Child1" },
  { id: 0, parentId: 1, name: "Child2" },
  { id: 3, parentId: 2, name: "Grandchild1" },
  { id: 4, parentId: null, name: "Root2" },
  { id: 5, parentId: 4, name: "Child3" },
];

function createTree(nums) {
  const tree = [];
  const nodeMap = new Map();

  // 初始化节点Map，为每个节点创建一个引用
  for (const node of nums) {
    nodeMap.set(node.id, { ...node, children: [] });
  }

  // 构建树结构
  for (const node of nums) {
    const parentNode = nodeMap.get(node.parentId);
    if (parentNode) {
      parentNode.children.push(nodeMap.get(node.id));
    } else {
      tree.push(nodeMap.get(node.id));
    }
  }

  return tree;
}

const tree = createTree(arr);

console.log(tree);




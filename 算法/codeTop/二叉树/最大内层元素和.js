class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 广搜(BFS)实现最大层元素和
const maxLevelSum = function (root) {
  if (!root) return 0; // 空树返回0或根据需求调整

  const queue = [root]; // 使用队列实现BFS，而非栈
  let maxSum = Number.MIN_SAFE_INTEGER;
  let maxLevel = 1;
  let currentLevel = 1;

  while (queue.length > 0) {
    const levelSize = queue.length; // 当前层的节点数量
    let currentSum = 0; // 当前层的元素和

    // 遍历当前层的所有节点
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // 取出队首节点
      currentSum += node.val; // 累加当前节点值

      // 将下一层的节点加入队列
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // 更新最大和及对应的层
    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxLevel = currentLevel;
    }

    currentLevel++; // 进入下一层
  }

  return maxLevel; // 返回最大和所在的层（从1开始计数）
};

// 测试案例
function testMaxLevelSum() {
  // 测试1: 基本案例
  const root1 = new TreeNode(1);
  root1.left = new TreeNode(7);
  root1.right = new TreeNode(0);
  root1.left.left = new TreeNode(7);
  root1.left.right = new TreeNode(-8);
  console.log("测试1最大层和所在层:", maxLevelSum(root1)); // 应返回2（第二层和为7+0=7，第三层和为7+(-8)=-1）

  // 测试2: 所有节点值为正数
  const root2 = new TreeNode(989);
  root2.right = new TreeNode(10250);
  root2.right.left = new TreeNode(98693);
  root2.right.right = new TreeNode(-89388);
  root2.right.right.right = new TreeNode(-32127);
  console.log("测试2最大层和所在层:", maxLevelSum(root2)); // 应返回2

  // 测试3: 包含负数的情况
  const root3 = new TreeNode(-100);
  root3.left = new TreeNode(-200);
  root3.right = new TreeNode(-300);
  root3.left.left = new TreeNode(-20);
  root3.left.right = new TreeNode(-5);
  root3.right.left = new TreeNode(-10);
  console.log("测试3最大层和所在层:", maxLevelSum(root3)); // 应返回3
}

// 执行测试
testMaxLevelSum();

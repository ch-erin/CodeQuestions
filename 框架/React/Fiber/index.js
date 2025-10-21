/**
 * 单链表树节点
 * 每个节点包含一个值、一个指向第一个子节点的指针和一个指向兄弟节点的指针
 */
class TreeNode {
  constructor(value) {
    this.value = value;
    this.firstChild = null; // 指向第一个子节点
    this.nextSibling = null; // 指向相邻的兄弟节点
  }
}

/**
 * 单链表树实现
 * 使用单链表结构表示树，每个节点的子节点通过链表连接
 */
class LinkedListTree {
  constructor(rootValue = null) {
    this.root = rootValue !== null ? new TreeNode(rootValue) : null;
  }

  /**
   * 获取树的根节点
   */
  getRoot() {
    return this.root;
  }

  /**
   * 为指定节点添加子节点
   * @param {TreeNode} parent 父节点
   * @param {*} value 子节点的值
   * @returns {TreeNode} 新创建的子节点
   */
  addChild(parent, value) {
    const newNode = new TreeNode(value);

    // 如果父节点没有子节点，直接作为第一个子节点
    if (!parent.firstChild) {
      parent.firstChild = newNode;
    } else {
      // 否则找到最后一个子节点，添加为其兄弟节点
      let current = parent.firstChild;
      while (current.nextSibling) {
        current = current.nextSibling;
      }
      current.nextSibling = newNode;
    }

    return newNode;
  }

  /**
   * 前序遍历树
   * @param {TreeNode|null} node 起始节点，默认为根节点
   * @param {Function} callback 遍历回调函数
   */
  preOrderTraversal(node = this.root, callback) {
    if (!node || !callback) return;

    // 先访问当前节点
    callback(node.value);

    // 然后递归访问子节点
    let child = node.firstChild;
    while (child) {
      this.preOrderTraversal(child, callback);
      child = child.nextSibling;
    }
  }

  /**
   * 后序遍历树
   * @param {TreeNode|null} node 起始节点，默认为根节点
   * @param {Function} callback 遍历回调函数
   */
  postOrderTraversal(node = this.root, callback) {
    if (!node || !callback) return;

    // 先递归访问所有子节点
    let child = node.firstChild;
    while (child) {
      this.postOrderTraversal(child, callback);
      child = child.nextSibling;
    }

    // 最后访问当前节点
    callback(node.value);
  }

  /**
   * 查找指定值的节点
   * @param {*} value 要查找的值
   * @param {TreeNode|null} node 起始节点，默认为根节点
   * @returns {TreeNode|null} 找到的节点或null
   */
  find(value, node = this.root) {
    if (!node) return null;

    // 检查当前节点
    if (node.value === value) {
      return node;
    }

    // 递归查找子节点
    let child = node.firstChild;
    while (child) {
      const found = this.find(value, child);
      if (found) return found;
      child = child.nextSibling;
    }

    return null;
  }

  /**
   * 计算树的深度
   * @param {TreeNode|null} node 起始节点，默认为根节点
   * @returns {number} 树的深度
   */
  getDepth(node = this.root) {
    if (!node) return 0;

    let maxDepth = 0;
    let child = node.firstChild;

    // 计算所有子节点的深度，取最大值
    while (child) {
      const depth = this.getDepth(child);
      if (depth > maxDepth) {
        maxDepth = depth;
      }
      child = child.nextSibling;
    }

    return maxDepth + 1;
  }

  /**
   * 打印树的结构
   * @param {TreeNode|null} node 起始节点，默认为根节点
   * @param {string} indent 缩进字符串，用于格式化输出
   */
  printTree(node = this.root, indent = "") {
    if (!node) return;

    // 打印当前节点
    console.log(`${indent}└── ${node.value}`);

    // 打印所有子节点
    let child = node.firstChild;
    while (child) {
      this.printTree(child, indent + "    ");
      child = child.nextSibling;
    }
  }
}

main();
function main() {
  // 示例用法
  const tree = new LinkedListTree("Root");

  if (tree.getRoot()) {
    // 为根节点添加子节点
    const child1 = tree.addChild(tree.getRoot(), "Child 1");
    const child2 = tree.addChild(tree.getRoot(), "Child 2");

    // 为Child 1添加子节点
    tree.addChild(child1, "Child 1-1");
    const child12 = tree.addChild(child1, "Child 1-2");

    // 为Child 1-2添加子节点
    tree.addChild(child12, "Child 1-2-1");

    // 为Child 2添加子节点
    tree.addChild(child2, "Child 2-1");

    // 打印树结构
    console.log("树结构:");
    tree.printTree();

    // 前序遍历
    console.log("\n前序遍历:");
    tree.preOrderTraversal(undefined, (value) => console.log(value));

    // 后序遍历
    console.log("\n后序遍历:");
    tree.postOrderTraversal(undefined, (value) => console.log(value));

    // 查找节点
    const foundNode = tree.find("Child 1-2");
    console.log("\n查找 'Child 1-2':", foundNode ? foundNode.value : "未找到");

    // 树的深度
    console.log("\n树的深度:", tree.getDepth());
  }
}

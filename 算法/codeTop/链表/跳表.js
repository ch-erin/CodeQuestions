class SkipListNode {
  constructor(value, level) {
    this.value = value; // 节点存储的值
    this.forward = new Array(level + 1).fill(null); // 指向后续节点的指针数组
    this.level = level; // 当前节点的层数
  }
}

class SkipList {
  constructor(maxLevel = 16, p = 0.5) {
    this.maxLevel = maxLevel; // 最大层数限制
    this.p = p; // 节点升层概率
    this.head = new SkipListNode(-Infinity, maxLevel); // 头节点
    this.level = 0; // 当前跳表的有效层数
  }

  // 随机生成节点层数
  randomLevel() {
    let level = 0;
    while (Math.random() < this.p && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  // 查找操作
  search(target) {
    let current = this.head;
    // 从最高层开始查找
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value < target) {
        current = current.forward[i];
      }
    }
    current = current.forward[0];
    return current !== null && current.value === target;
  }

  // 插入操作
  insert(value) {
    const update = new Array(this.maxLevel + 1).fill(null);
    let current = this.head;

    // 查找插入位置并记录每层的前驱节点
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value < value) {
        current = current.forward[i];
      }
      update[i] = current;
    }

    // 生成新节点层数
    const newLevel = this.randomLevel();
    // 如果新节点层数超过当前跳表层数
    if (newLevel > this.level) {
      for (let i = this.level + 1; i <= newLevel; i++) {
        update[i] = this.head;
      }
      this.level = newLevel;
    }

    // 创建新节点
    const newNode = new SkipListNode(value, newLevel);
    // 更新各层指针
    for (let i = 0; i <= newLevel; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
  }

  // 删除操作
  delete(value) {
    const update = new Array(this.maxLevel + 1).fill(null);
    let current = this.head;

    // 查找要删除的节点并记录前驱
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value < value) {
        current = current.forward[i];
      }
      update[i] = current;
    }

    current = current.forward[0];
    if (!current || current.value !== value) return false;

    // 更新各层指针
    for (let i = 0; i <= current.level; i++) {
      if (update[i].forward[i] !== current) break;
      update[i].forward[i] = current.forward[i];
    }

    // 更新跳表有效层数
    while (this.level > 0 && this.head.forward[this.level] === null) {
      this.level--;
    }
    return true;
  }

  // 可视化打印（调试用）
  print() {
    for (let i = this.level; i >= 0; i--) {
      let current = this.head.forward[i];
      let str = `Level ${i}: `;
      while (current) {
        str += `${current.value} -> `;
        current = current.forward[i];
      }
      console.log(str + "null");
    }
  }
}

// 测试示例
const sl = new SkipList();
sl.insert(3);
sl.insert(6);
sl.insert(7);
sl.insert(9);
sl.insert(12);
sl.insert(19);
sl.insert(17);

console.log("Search 19:", sl.search(19)); // true
console.log("Search 15:", sl.search(15)); // false

sl.delete(12);
console.log("After deleting 12:");
sl.print();

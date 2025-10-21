class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRU {
  constructor(capacity = 3) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!key in this.cache) return -1;
    const node = this.cache.get(key);
    this.moveToHead(node);
    return node.value;
  }

  // 最为复杂的一个方法
  put(key, value) {
    // 如果已经存在，更新值，并且把节点移动到头部
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this.moveToHead(node);
    } else {
      // 如果不存在，创建新节点，并且插入到链表头部，并判断是否需要删除尾部节点
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this.addToHead(newNode);
      if (this.cache.size > this.capacity) {
        const removedNode = this.removeTail();
        this.cache.delete(removedNode.key);
      }
    }
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  removeTail() {
    const removedNode = this.tail.prev;
    this.removeNode(removedNode);
    return removedNode;
  }

  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
}

export default LRU;

// 在原文件末尾添加测试用例
function testLRU() {
  // 测试用例1: 基本操作
  console.log("测试用例1: 基本的 get 和 put 操作");
  const lru1 = new LRU(2);
  lru1.put(1, 1); // 缓存 {1=1}
  lru1.put(2, 2); // 缓存 {1=1, 2=2}
  console.log(lru1.get(1)); // 返回 1
  lru1.put(3, 3); // 去除 key 2，缓存 {1=1, 3=3}
  console.log(lru1.get(2)); // 返回 -1 (未找到)
  console.log("------------------------");

  // 测试用例2: 更新已存在的值
  console.log("测试用例2: 更新已存在的值");
  const lru2 = new LRU(2);
  lru2.put(1, 1); // 缓存 {1=1}
  lru2.put(1, 2); // 更新 key 1，缓存 {1=2}
  console.log(lru2.get(1)); // 返回 2
  console.log("------------------------");

  // 测试用例3: 容量限制和LRU特性
  console.log("测试用例3: 测试容量限制和LRU特性");
  const lru3 = new LRU(3);
  lru3.put(1, 1); // 缓存 {1=1}
  lru3.put(2, 2); // 缓存 {1=1, 2=2}
  lru3.put(3, 3); // 缓存 {1=1, 2=2, 3=3}
  console.log(lru3.get(1)); // 返回 1，此时 1 变为最近使用
  lru3.put(4, 4); // 去除 key 2，缓存 {1=1, 3=3, 4=4}
  console.log(lru3.get(2)); // 返回 -1 (未找到)
  console.log("------------------------");

  // 测试用例4: 空缓存操作
  console.log("测试用例4: 空缓存操作");
  const lru4 = new LRU(2);
  console.log(lru4.get(1)); // 返回 -1 (未找到)
  console.log("------------------------");

  // 测试用例5: 连续操作
  console.log("测试用例5: 连续操作测试");
  const lru5 = new LRU(2);
  lru5.put(1, 1); // 缓存 {1=1}
  lru5.put(2, 2); // 缓存 {1=1, 2=2}
  console.log(lru5.get(1)); // 返回 1
  lru5.put(3, 3); // 去除 key 2，缓存 {1=1, 3=3}
  console.log(lru5.get(2)); // 返回 -1
  lru5.put(4, 4); // 去除 key 1，缓存 {3=3, 4=4}
  console.log(lru5.get(1)); // 返回 -1
  console.log(lru5.get(3)); // 返回 3
  console.log(lru5.get(4)); // 返回 4
  console.log("------------------------");
}

// 运行测试
testLRU();

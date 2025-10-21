class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  insert(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
  
  get(key) {
    const node = this.cache.get(key);
    if (!node) return -1;
    this.remove(node);
    this.insert(node);
    return node.value;
  }

  put(key, value) {
    let node = this.cache.get(key) || 0;
    if (node) {
      this.remove(node);
      node.value = value;
    } else {
      node = new Node(key, value);
      this.cache.set(key, node);
    }
    this.insert(node);

    if (this.cache.size > this.capacity) {
      const tailNode = this.tail.prev;
      this.remove(tailNode);
      this.cache.delete(tailNode.key);
    }
  }
}

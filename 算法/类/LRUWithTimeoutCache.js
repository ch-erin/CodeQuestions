class LRUWithTimeoutCache {
  /**
   * 初始化缓存
   * @param {number} capacity 缓存容量
   * @param {number} timeout 超时时间(毫秒)，超过此时长未访问的缓存将被清除
   */
  constructor(capacity, timeout) {
    this.capacity = capacity;
    this.timeout = timeout;
    // 用Map存储缓存，利用Map的插入顺序特性实现LRU
    this.cache = new Map();
    // 记录每个key的最后访问时间
    this.accessTime = new Map();
  }

  /**
   * 清除所有超时的缓存项
   */
  _clearExpired() {
    const now = Date.now();
    // 遍历所有缓存项，清除超时的
    for (const [key] of this.cache) {
      const lastTime = this.accessTime.get(key);
      if (now - lastTime > this.timeout) {
        this.cache.delete(key);
        this.accessTime.delete(key);
      }
    }
  }

  /**
   * 获取缓存值
   * @param {string} key 缓存键
   * @returns {any} 缓存值，不存在或超时则返回null
   */
  get(key) {
    // 先清除所有超时的缓存，保证行为正确性
    this._clearExpired();

    if (!this.cache.has(key)) {
      return null;
    }

    // LRU逻辑：先删除再重新插入，保证最近访问的在最后
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    // 更新访问时间
    this.accessTime.set(key, Date.now());

    return value;
  }

  /**
   * 设置缓存值
   * @param {string} key 缓存键
   * @param {any} value 缓存值
   */
  set(key, value) {
    // 先清除所有超时的缓存
    this._clearExpired();

    // 如果已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // 如果达到容量上限，删除最久未使用的（Map的第一个元素）
    else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
      this.accessTime.delete(oldestKey);
    }

    // 插入新值
    this.cache.set(key, value);
    this.accessTime.set(key, Date.now());
  }

  /**
   * 清除所有缓存
   */
  clear() {
    this.cache.clear();
    this.accessTime.clear();
  }

  /**
   * 获取当前缓存大小
   * @returns {number} 缓存大小
   */
  size() {
    // 返回前先清除超时项，保证大小准确
    this._clearExpired();
    return this.cache.size;
  }
}

// 使用示例
const cache = new LRUWithTimeoutCache(3, 5000); // 容量3，超时5秒

cache.set("a", 1);
cache.set("b", 2);
cache.set("c", 3);

console.log(cache.get("a")); // 1 (访问后a成为最近使用的)

cache.set("d", 4); // 超过容量，最久未使用的b被删除
console.log(cache.get("b")); // null

// 5秒后再访问c，会因为超时被清除
setTimeout(() => {
  console.log(cache.get("c")); // null
}, 6000);

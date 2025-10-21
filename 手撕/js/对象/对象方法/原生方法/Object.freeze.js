// 主要就是修改对象的基础属性

Object.myFreeze = (obj) => {
  // 可读不可写，不可配置
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        configurable: false,
        writable: false,
      });
    }
  }

  // 不许新加
  return Object.preventExtensions(obj);
};

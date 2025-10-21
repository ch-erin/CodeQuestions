function deepClone(obj, hash = new WeakMap()) {
  // 1. 处理非对象类型（原始类型直接返回）
  if (typeof obj !== "object" || obj === null) return obj;

  // 2. 处理特殊对象类型（RegExp和Date）
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);

  // 3. 处理循环引用：如果已拷贝过该对象，直接返回缓存的副本
  if (hash.has(obj)) return hash.get(obj);

  // 4. 创建与原对象同类型的新实例
  const constr = new obj.constructor();
  // 缓存映射关系：原对象 → 新实例（用于解决循环引用）
  hash.set(obj, constr);

  // 5. 递归拷贝对象的自有属性（普通属性）
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 只处理自身属性，跳过继承的属性
      constr[key] = deepClone(obj[key], hash);
    }
  }

  // 6. 返回拷贝完成的新对象
  return constr;
}

// 简单版，只考虑对象
function deepClone(obj, hash = new WeakMap()) {
  if (hash.has(obj)) return hash.get(obj);

  const constr = new obj.constructor();
  hash.set(obj, constr);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash);
    }
  }

  return constr;
}

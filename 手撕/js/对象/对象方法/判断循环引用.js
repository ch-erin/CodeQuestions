function hasCircularReference(obj) {
  const visited = new WeakSet(); // 存储已访问的对象（弱引用，不影响垃圾回收）

  function check(node) {
    // 非对象类型（如null、基本类型），无需检测
    if (node === null || typeof node !== "object") {
      return false;
    }

    // 若已访问过当前对象，说明存在循环引用
    if (visited.has(node)) {
      return true;
    }

    // 标记当前对象为已访问
    visited.add(node);

    // 递归检查所有属性
    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        // 只检查自身属性（排除原型链）
        if (check(node[key])) {
          // 若子属性存在循环引用，直接返回true
          return true;
        }
      }
    }

    // 遍历完所有属性未发现循环引用，移除标记（可选，不影响结果）
    visited.delete(node);
    return false;
  }

  return check(obj);
}

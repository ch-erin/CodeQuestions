function isEqual(a, b, hash = new WeakMap()) {
  // 处理 NaN,null 和 undefined
  if (a === b) return a !== a ? b !== b : true;
  if (a === null || b === null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;

  // 检查是否已经比较过这对对象（处理循环引用）
  if (hash.has(a) && hash.get(a) === b) return true;

  // 记录当前比较的对象对
  hash.set(a, b);
  hash.set(b, a);

  // 确保构造函数相同
  if (a.constructor !== b.constructor) return false;

  // 处理 Date 和 RegExp 对象
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.toString() === b.toString();

  // 处理数组
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i], hash)) return false;
    }
    return true;
  }

  // 处理对象的自有属性
  const keys_1 = Object.keys(a);
  const keys_2 = Object.keys(b);

  if (keys_1.length !== keys_2.length) return false;

  for (let key of keys_1) {
    if (!b.hasOwnProperty(key) || !isEqual(a[key], b[key], hash)) {
      return false;
    }
  }

  return true;
}

// 测试循环引用
const obj1 = { name: "test" };
obj1.self = obj1; // 循环引用：对象引用自身

const obj2 = { name: "test" };
obj2.self = obj2; // 另一个对象的循环引用

const obj3 = { name: "different" };
obj3.self = obj3;

console.log(isEqual(obj1, obj2)); // true（结构相同的循环引用对象）
console.log(isEqual(obj1, obj3)); // false（属性值不同）

// 测试嵌套循环引用
const a = {};
const b = {};
a.b = b;
b.a = a; // 相互引用

const c = {};
const d = {};
c.b = d;
d.a = c;

console.log(isEqual(a, c)); // true（相互引用结构相同）

// 原有功能测试
console.log(isEqual([], {})); // false
console.log(isEqual(new Date(), new RegExp())); // false
console.log(isEqual({ a: { b: 2 } }, { a: { b: 2 } })); // true
console.log(isEqual([1, [2, 3]], [1, [2, 4]])); // false

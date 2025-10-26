// 判断循环引用

function hasCircularReference(obj) {
  const visited = new WeakSet();

  function check(node) {
    if (node === null || typeof node !== "object") return false;

    if (visited.has(node)) return true;

    visited.add(node);

    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        if (check(node[key])) {
          return true;
        }
      }
    }

    visited.delete(node);

    return false;
  }

  return check(obj);
}

const obj1 = { a: 1 };
const obj2 = { b: 2 };

obj1.self = obj2;
obj2.self = obj1;

const res = hasCircularReference(obj1);

console.log(res);

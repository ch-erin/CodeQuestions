// Array.isArray(obj) 不依赖原型链或构造函数，而是直接基于对象的 内部类型标签（Internal [[Class]] Attribute） 判断
// obj instanceof Array 的原理是：检查 obj 的原型链上是否存在 Array.prototype。
// 即：判断 obj 是否由当前执行环境中的 Array 构造函数创建

Array.prototype.myIsArray = (obj) => {
  return Object.prototype.toString.call(obj) === "[object Array]";
};
console.log(Array.myIsArray([])); // true
console.log(Array.myIsArray({})); // false

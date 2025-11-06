function isObject(obj) {
  return (
    (typeof obj === "object" || typeof object === "function") && obj !== null
  );
}

function myNew(constructor, ...args) {
  let obj = Object.create(constructor.prototype);

  const res = constructor.apply(obj, args);

  if (isObject(res)) return res;

  return obj;
}

function Person(name, age) {
  this.name = name; // 给实例添加属性
  this.age = age;
  this.sayHi = function () {
    return `Hi, I'm ${this.name}`;
  };
}

// 2. 用 myNew 替代 new 创建实例
const person1 = myNew(Person, "Alice", 25);

console.log(person1);

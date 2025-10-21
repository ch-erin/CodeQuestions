/**
 * 模拟 new 操作符的功能
 * @param {Function} constructor - 构造函数
 * @param {...any} args - 传递给构造函数的参数
 * @returns {Object} - 构造函数的实例对象
 */
function myNew(constructor, ...args) {
  // 1. 创建一个空对象，作为将要返回的实例
  const newObj = {};

  // 2. 将新对象的原型指向构造函数的 prototype 属性
  // 这样新对象就可以访问到构造函数原型上的属性和方法
  Object.setPrototypeOf(newObj, constructor.prototype);

  // 3. 调用构造函数，将 this 绑定到新创建的对象上
  // 并传入参数列表
  const result = constructor.apply(newObj, args);

  // 4. 判断构造函数的返回值类型
  // 如果返回的是对象（且不为 null），则返回该对象
  // 否则返回我们创建的新对象
  return typeof result === "object" && result !== null ? result : newObj;
}

// 构造函数实质是将对象传入
// 构造函数没有返回值
// 返回result是构造函数主动返回了一个对象类型的值
function myNew(constructor, ...args) {
  const obj = {};

  // obj.__proto__ = Person.prototype;
  Object.setPrototypeOf(obj, constructor.prototype);

  const result = constructor.apply(obj, args);

  return typeof result === "object" && result !== null ? result : obj;
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

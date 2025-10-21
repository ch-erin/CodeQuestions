// 父构造函数
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

// 父构造函数原型上的方法
Parent.prototype.sayName = function () {
  console.log(this.name);
};

// 子构造函数
function Child(name, age) {
  // 继承父构造函数的属性
  Parent.call(this, name); // 关键：调用父构造函数并绑定this
  this.age = age; // 子构造函数自己的属性
}

// 测试
const child1 = new Child("Alice", 18);
console.log(child1.name); // "Alice"（继承自Parent）
console.log(child1.age); // 18（Child自己的属性）
child1.colors.push("black");
console.log(child1.colors); // ["red", "blue", "green", "black"]

const child2 = new Child("Bob", 20);
console.log(child2.colors); // ["red", "blue", "green"]（不受child1影响）

// 注意：这种方式无法继承原型上的方法
console.log(child1.sayName); // undefined

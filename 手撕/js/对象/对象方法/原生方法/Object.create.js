// 创建一个对象，并且这个新对象的原型()指向参数obj
Object.myCreate = (obj) => {
  function F() {}
  F.prototype = obj;
  return new F();
};

// 定义原型对象
const parent = {
  name: "父对象",
  sayHello: function () {
    console.log(`Hello, 我是${this.name}`);
  },
};

// 用自定义 myCreate 创建新对象（以 parent 为原型）
const child = Object.myCreate(parent);

console.log("===== 测试 1：基础原型链 =====");
console.log("child 对象本身：", child); // {}（自身无属性）
console.log("child.name（继承自原型）：", child.name); // "父对象"
child.sayHello(); // 输出："Hello, 我是父对象"（继承自原型的方法）

// 打印原型链关系
console.log("child.__proto__ === parent：", child.__proto__ === parent); // true
console.log("child.__proto__.constructor：", child.__proto__.constructor); // Object（因 parent 是普通对象，原型是 Object.prototype）

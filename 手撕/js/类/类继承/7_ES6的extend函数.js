/**
 * 模拟ES6的extends继承功能
 * @param {Function} Child - 子类构造函数
 * @param {Function} Parent - 父类构造函数
 */
function extend(Child, Parent) {
  // 1. 原型链继承：让子类原型继承父类原型
  // 创建一个以父类原型为原型的新对象
  const prototype = Object.create(Parent.prototype);
  // 修复constructor指向，使其指向子类
  prototype.constructor = Child;
  // 将新对象设置为子类的原型
  Child.prototype = prototype;

  // 2. 静态方法继承：子类继承父类的静态属性和方法
  Object.setPrototypeOf(Child, Parent);

  // 3. 实现super关键字的功能（在子类构造函数中使用）
  // 为子类添加__super__属性，指向父类构造函数
  Child.__super__ = Parent;
}

// ------------------------------
// 使用示例
// ------------------------------

// 父类
function Parent(name) {
  this.name = name;
}

// 父类原型方法
Parent.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
};

// 父类静态方法
Parent.staticMethod = function () {
  console.log("This is a static method from Parent");
};

// 子类
function Child(name, age) {
  // 调用父类构造函数（模拟super()）
  Child.__super__.call(this, name);
  this.age = age;
}

// 实现继承（模拟 Child extends Parent）
extend(Child, Parent);

// 子类原型方法
Child.prototype.sayAge = function () {
  console.log(`I'm ${this.age} years old`);
};

// 子类静态方法
Child.childStaticMethod = function () {
  console.log("This is a static method from Child");
  // 调用父类静态方法（模拟super.staticMethod()）
  Child.__super__.staticMethod.call(this);
};

// ------------------------------
// 测试
// ------------------------------

// 创建实例
const child = new Child("Alice", 20);

// 测试实例方法继承
child.sayName(); // 输出: "My name is Alice"（继承自父类）
child.sayAge(); // 输出: "I'm 20 years old"（子类自身方法）

// 测试静态方法继承
Child.staticMethod(); // 输出: "This is a static method from Parent"（继承自父类）
Child.childStaticMethod(); // 输出: "This is a static method from Child" 和 "This is a static method from Parent"

// 测试原型链
console.log(child instanceof Child); // true
console.log(child instanceof Parent); // true
console.log(Child.prototype instanceof Parent.prototype.constructor); // true

// 测试constructor指向
console.log(child.constructor === Child); // true

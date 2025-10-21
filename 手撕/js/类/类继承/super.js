// 父类构造函数
function Parent(name) {
  this.name = name || "Parent";
}

// 父类原型方法
Parent.prototype.getName = function () {
  return this.name;
};

Parent.prototype.sayHello = function () {
  console.log("Hello from Parent");
};

// 子类构造函数
function Child(name, age) {
  // 1. 模拟 super(...)：调用父类构造函数，继承实例属性
  // 相当于 ES6 中的 super(name)
  Parent.call(this, name);
  this.age = age;
}

// 建立原型链继承（子类原型指向父类实例）
Child.prototype = Object.create(Parent.prototype);
// 修复子类构造函数指向
Child.prototype.constructor = Child;

// 2. 模拟 super.方法名(...)：在子类方法中调用父类方法
Child.prototype.sayHello = function () {
  // 相当于 ES6 中的 super.sayHello()
  Parent.prototype.sayHello.call(this); // 调用父类的 sayHello，并绑定当前子类实例的 this
  console.log("Hello from Child");
};

// 子类新增方法
Child.prototype.getAge = function () {
  return this.age;
};

// 测试
const child = new Child("Tom", 18);

console.log(child.getName()); // 输出："Tom"（继承父类原型方法）
child.sayHello();
// 输出：
// "Hello from Parent"（调用父类方法）
// "Hello from Child"（子类自己的逻辑）
console.log(child.getAge()); // 输出：18（子类自己的方法）

// 父构造函数：人
function Parent(name) {
  this.name = name; // 父类自身属性
  this.hobbies = ["吃饭", "睡觉"]; // 父类引用类型属性
}

// 父类原型方法（共享方法）
Parent.prototype.sayName = function () {
  console.log("我的名字是：" + this.name);
};

// 子构造函数：学生（继承自Parent）
function Child(name, age) {
  // 1. 构造函数继承：复用父类的属性初始化逻辑
  Parent.call(this, name); // 第二次调用Parent构造函数
  this.age = age; // 子类自身属性
}

// 2. 原型链继承：复用父类的原型方法
Child.prototype = new Parent(); // 第一次调用Parent构造函数
Child.prototype.constructor = Child; // 修复constructor指向

// 子类原型方法
Child.prototype.sayAge = function () {
  console.log("我的年龄是：" + this.age);
};

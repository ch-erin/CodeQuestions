function Parent(name) {
  this.name = name;
  this.age = 18;
  this.paly = ["吃饭", "喝水", "玩电脑"];
  this.getAge = function () {
    return this.age;
  };
}
Parent.prototype.lee = "lee";
Parent.prototype.getName = function () {
  return this.name;
};

//直接写子类实例属性
function Child() {
  this.type = "child2";
  this.add2 = function () {
    return this.type;
  };
}

Child.prototype.add1 = function () {
  return this.type;
};
Child.prototype.dell = "dell";

//继承
Child.prototype = new Parent();

//缺点：无法读取本身原型上的属性和方法
//多个继承会导致共享父类原型属性，只要其中一个子类改变了，就会影响其他子类

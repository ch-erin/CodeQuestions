function Parent(name) {
  this.name = name;
  this.say = function () {
    console.log(this.name);
  };
}

Parent.prototype.sayProto = function () {
  console.log(this.name);
};

const child = new Parent("child");
const obj = { name: "obj" };

// 绑定1：将 child.say 绑定到 obj
const boundSay = child.say.bind(obj);
boundSay(); // 输出1

// 绑定2：将原型方法绑定到 obj
const boundProto = child.sayProto.bind(obj);
boundProto(); // 输出2

// 绑定3：构造函数绑定到 obj 后实例化
const BoundParent = Parent.bind(obj);
const boundChild = new BoundParent("boundChild");
boundChild.say(); // 输出3
boundChild.sayProto(); // 输出4

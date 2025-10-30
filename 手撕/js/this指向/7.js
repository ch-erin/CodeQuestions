var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name); // 关键：this指向谁？
  },
};
function sayName() {
  var sss = person.sayName;
  sss(); // 1. 调用1
  person.sayName(); // 2. 调用2
  person.sayName(); // 3. 调用3
  (b = person.sayName)(); // 4. 调用4
}
sayName(); // 执行后输出什么？

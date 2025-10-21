const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };

function asyncFn() {
  setTimeout(() => {
    console.log(this.name); // 输出1
  }, 0);
}
const obj3 = {
  name: "name",
  fn: function Fn() {
    setTimeout(() => {
      console.log(this.name); // 输出1
    }, 0);
  },
};
// 场景1：直接调用
asyncFn();
obj3.fn();

// // 场景2：bind一次
const bound1 = asyncFn.bind(obj1);
bound1();

// // 场景3：bind两次
const bound2 = asyncFn.bind(obj1).bind(obj2);
bound2();

// // 场景4：箭头函数回调 + bind
// function asyncArrow() {
//   setTimeout(() => {
//     console.log(this.name); // 输出2
//   }, 0);
// }
// const boundArrow = asyncArrow.bind(obj1);
// boundArrow();

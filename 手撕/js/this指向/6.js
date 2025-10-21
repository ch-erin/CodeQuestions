const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };

function outer() {
  console.log(this.name); // 输出1
  return function inner() {
    console.log(this.name); // 输出2
    return () => {
      console.log(this.name); // 输出3
    };
  };
}

// 场景1：直接调用
const fn1 = outer();
const fn2 = fn1();
fn2();

// // 场景2：bind绑定后调用
const boundOuter = outer.bind(obj1);
const fn3 = boundOuter();
const fn4 = fn3.bind(obj2)();
fn4();

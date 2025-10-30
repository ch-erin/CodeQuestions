const obj = {
  name: "obj",
  outer: function () {
    console.log(this.name); // 输出1
    return () => {
      console.log(this.name); // 输出2
      return () => {
        console.log(this.name); // 输出3
      };
    };
  },
};

const first = obj.outer();
const second = first();
second();

// 记死了,箭头函数的this指向是词法作用域绑定，不会随调用方式改变
// 直接查找对应上下文分析即可

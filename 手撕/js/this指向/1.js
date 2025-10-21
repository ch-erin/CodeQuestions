const obj = {
  name: "obj",
  outer: function () {
    console.log(this.name); // 输出1

    // 普通函数，不是某个对象的属性
    const inner1 = function () {
      console.log(this.name); // 输出2

      const inner2 = () => {
        console.log(this.name); // 输出3
      };
      inner2();
    };

    const inner3 = () => {
      console.log(this.name); // 输出4

      const inner4 = function () {
        console.log(this.name); // 输出5
      };
      inner4();
    };

    inner1();
    inner3();
  },
};

obj.outer();

// 箭头函数之际编译时绑定上层作用域，普通函数在运行时确定

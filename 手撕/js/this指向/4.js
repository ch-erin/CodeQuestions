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

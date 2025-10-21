const container = {
  id: "C1",
  fn1: function () {
    console.log(this.id); // 输出1
    return function () {
      console.log(this.id); // 输出2
      return () => {
        console.log(this.id); // 输出3
      };
    };
  },
  fn2: () => {
    console.log(this.id); // 输出4
    return function () {
      console.log(this.id); // 输出5
      return () => {
        console.log(this.id); // 输出6
      };
    };
  },
};

// const a = container.fn1();
// const b = a();
// const c = b();

const d = container.fn2();
const e = d();
const f = e();

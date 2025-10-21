class Calc {
  constructor(initialValue) {
    this.value = initialValue;
  }

  add(increment) {
    this.value += increment;
    return this; // 返回类的实例本身
  }

  minus(decrement) {
    this.value -= decrement;
    return this; // 返回类的实例本身
  }

  get() {
    return this.value; // 返回最终的结果
  }
}
// 使用链式调用
const n = new Calc(9);
console.log(n.add(198).minus(100).get()); // 输出 107

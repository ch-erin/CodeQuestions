// * 和 yield 关键字

function* dataGenerator() {
  const input1 = yield "请输入第一个值";
  const input2 = yield "请输入第二个值";

  return `你输入了：${input1} 和 ${input2}`;
}

const iterator = dataGenerator();

// 第一次 next()：执行到第一个 yield，返回 "请输入第一个值"
console.log(iterator.next()); // { value: '请输入第一个值', done: false }

// 第二次 next('hello')：将 'hello' 作为第一个 yield 的返回值传给 input1，继续执行到第二个 yield
console.log(iterator.next("hello")); // { value: '请输入第二个值', done: false }

// 第三次 next('world')：将 'world' 作为第二个 yield 的返回值传给 input2，执行到结束
console.log(iterator.next("world")); // { value: '你输入了：hello 和 world', done: true }

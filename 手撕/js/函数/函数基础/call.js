Function.prototype.myCall = function (ctx = window, ...args) {
  if (typeof ctx !== "object") ctx = new Object(ctx);

  let fn_key = Symbol();
  ctx[fn_key] = this;
  let result = ctx[fn_key](...args);
  delete ctx[fn_key];

  return result;
};

function sayHi(age) {
  console.log(`我是${this.name}，年龄${age}`);
}

const person = { name: "张三" };

// 用 myCall 改变 this 指向
sayHi.myCall(person, 20); // 输出："我是张三，年龄20"

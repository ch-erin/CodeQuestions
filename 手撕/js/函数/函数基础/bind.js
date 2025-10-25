function add(a, b, c) {
  this.name = a + b + c;
  return a + b + c;
}

Function.prototype.myBind = function (ctx = window, ...args) {
  const _this = this;

  function bound_fn(...newArgs) {
    const allArgs = [...args, ...newArgs];

    if (this instanceof bound_fn) return new _this(...allArgs);
    return _this.call(ctx, ...allArgs);
  }

  bound_fn.prototype = Object.create(_this.prototype);
  bound_fn.prototype.constructor = bound_fn;

  return bound_fn;
};

// 构造函数调用
// fn -> bound_fn -> new _this(...allArgs);
// 普通函数调用
// fn -> bound_fn -> _this.call(ctx, ...allArgs);

// 绑定 this（这里用 null，因为函数不依赖 this），并预设第一个参数 a=10
const boundAdd = add.myBind(null, 10);

// 调用时只需传入剩余参数 b 和 c
console.log(boundAdd(20, 30)); // 输出：60（10+20+30）

const res = new boundAdd();

console.log(res.name);

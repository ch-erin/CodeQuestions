//apply的参数以数组形式传递，适合动态参数或者类数组，或者数组对象
Function.prototype.myApply = function (ctx = window, args) {
  if (typeof ctx !== "object") ctx = new Object(ctx);

  let fn_key = Symbol();
  ctx[fn_key] = this;

  let result = ctx[fn_key](...args);

  delete ctx[fn_key];

  return result;
};

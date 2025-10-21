Function.prototype.mybind = function (ctx = window, ...args) {
  let _this = this;

  function bound_fn(...newArgs) {
    const Args = [...args, ...newArgs];

    if (this instanceof bound_fn) {
      return new _this(...Args);
    } else {
      return _this.call(ctx, ...Args);
    }
  }

  bound_fn.prototype = Object.create(_this.prototype);
  bound_fn.prototype.constructor = bound_fn;

  return bound_fn;
};

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried(...[...args, ...args2]);
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// 测试所有调用方式
console.log(curriedAdd(1)(2)(3)); // 输出：6
console.log(curriedAdd(1, 2)(3)); // 输出：6
console.log(curriedAdd(1)(2, 3)); // 输出：6
console.log(curriedAdd(1, 2, 3)); // 输出：6

Array.prototype.flat = function () {
  let result = [];

  for (const item of this) {
    if (Array.isArray(item)) {
      result = [...result, ...item.flat()];
    } else {
      result.push(item);
    }
  }

  return result;
};

Array.prototype.flat = function () {
  const stack = [...this];
  const res = [];

  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      res.push(item);
    }
  }

  return res.reverse();
};

Array.prototype.flat = function () {
  return this.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? this.flat(cur) : cur);
  }, []);
};

// 递归实现
function falt(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      const path = falt(item);
      result = [...result, ...path];
    } else {
      result.push(item);
    }
  }

  return result;
}

// 模拟栈
function falt(arr) {
  let stack = [];
  let res = [];

  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      res.push(item);
    }
  }

  return res.reverse();
}

// 函数式 + 递归
function falt(arr) {
  return arr.reduce((prev, cur) => {
    const item = Array.isArray(cur) ? falt(cur) : cur;
    return prev.concat(item);
  }, []);
}

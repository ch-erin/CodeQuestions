Array.prototype.filter = function (fn) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    // 跳过稀疏数组的空位
    if (!this.hasOwnProperty(i)) continue;

    const value = fn.call(thisArgs, this[i], i, this);

    result[i] = value;
  }

  return result;
};

Array.prototype.myEvery = function (fn, thisArg) {
  for (let i = 0; i < this.length; i++) {
    // 跳过稀疏数组空位
    if (!this.hasOwnProperty(i)) continue;

    const res = fn.call(thisArg.this[i], i, this);

    if (!res) return false;
  }

  return true;
};

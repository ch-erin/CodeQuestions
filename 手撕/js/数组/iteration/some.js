Array.prototype.mySome = function (fn, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;

    const result = fn.call(thisArg, this[i], i, this);

    if (result) return true;
  }

  return false;
};

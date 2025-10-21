Array.prototype.myForEach = function (fn, thisArg) {
  const length = array.length;
  if (length === 0) return;

  for (let i = 0; i < length; i++) {
    if (!this.hasOwnProperty(i)) continue;

    fn.call(thisArg, this[i], i, this);
  }
};

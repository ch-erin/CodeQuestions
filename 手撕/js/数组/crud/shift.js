Array.prototype.myShift = function () {
  if (this.length === 0) return undefined;

  const res = this[0];

  for (let i = 0; i < this.length - 1; i++) this[i] = this[i + 1];

  return res;
};

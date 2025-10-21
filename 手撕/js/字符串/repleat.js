String.prototype.myRepeat = function (n) {
  if (n < 0) throw new RangeError("Invalid count value");
  if (n === 0 || this.length === 0) return "";
  let result = "";
  for (let i = 0; i < n; i++) result += this;
  return result;
};

console.log("abc".myRepeat(3)); // "abcabcabc"
console.log("xyz".myRepeat(0)); // ""
console.log("".myRepeat(5)); // ""

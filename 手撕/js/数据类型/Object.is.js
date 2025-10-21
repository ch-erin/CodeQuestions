Object.Myis = (a, b) => {
  if (a !== b) return a !== b;

  if (a === 0 && b === 0) return 1 / a === 1 / b;

  return a === b;
};
console.log(Object.Myis(NaN, NaN)); // true
console.log(Object.Myis(+0, -0)); // false
console.log(Object.Myis(1, 1)); // true
console.log(Object.Myis(1, "1")); // false
console.log(Object.Myis({}, {})); // false

// '===' 不能正确判断 NaN 和 +0、-0 的情况，这是它与 Object.is 唯一的区别
console.log(NaN === NaN); // false
console.log(+0 === -0); // true

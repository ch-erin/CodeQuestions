function isEmptyObj(obj) {
  if (obj === null || typeof obj !== "object") return false;

  if (Array.isArray(obj)) return false;

  if (Object.prototype.toString.call(obj) !== "[object Object]") return false;

  return Object.keys(obj).length === 0;
}

console.log(isEmptyObj({}));

console.log(isEmptyObj([1, 2, 3]));

console.log(
  isEmptyObj({
    name: "小米",
    age: 18,
  })
);

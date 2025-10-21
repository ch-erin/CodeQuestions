// 其中数组、对象、null都会被判断为object，其他判断都正确

function myTypeof(params) {
  const type = Object.prototype.toString
    .call(params)
    .slice(8, -1)
    .toLowerCase();

  const obj = "object";

  const map = {
    number: true,
    string: true,
    boolean: true,
    undefined: true,
    bigint: true,
    symbol: true,
    function: true,
  };

  return map[type] ? type : obj;
}

console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string

console.log(typeof function () {}); // function
console.log(typeof []); // object
console.log(typeof {}); // object

console.log(typeof undefined); // undefined
console.log(typeof null); // object

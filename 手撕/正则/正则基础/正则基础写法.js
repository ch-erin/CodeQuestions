function test(s, p) {
  return p.test(s);
}

// 字面量写法

// let expression = /pattern/flags

let str = "mjk";

let p = /mjk/g;

console.log(test(str, p));

// 构造函数写法
let p2 = new RegExp("mjk", "g");
console.log(test(str, p));

// 元字符

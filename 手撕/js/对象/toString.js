// toString : 返回对象的字符串表示

const numObj = new Number(123);
console.log(numObj.toString()); // '123'

const boolObj = new Boolean(true);
console.log(boolObj.toString()); // 'true'

const arr = [1, 2, 3];
console.log(arr.toString()); // '1,2,3'

const obj = { a: 1 };
console.log(obj.toString()); // '[object Object]'

// 自动调用场景
// 当对象参与字符串拼接、String() 转换或需要字符串的场景时，JS 会自动调用 toString：

const arr2 = [1, 2, 3];
console.log("数组内容：" + arr); // '数组内容：1,2,3'（自动调用 toString）

const obj2 = { a: 1 };
console.log(String(obj)); // '[object Object]'（自动调用 toString）

// 优先级对比：
//  依据场景来划分：
// 1. 数字优先场景： 算术运算、比较操作等
// 2. 字符串优先场景： 字符串拼接、String() 转换


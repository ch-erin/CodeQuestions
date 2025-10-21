// valueOf ：valueOf方法设计的目的是返回对象的原始值，当js需要将对象转换成原始值时会自动调用

const strObj = new String("hello");
console.log(strObj.valueOf()); // 'hello'（返回原始字符串）

const date = new Date("2023-01-01");
console.log(date.valueOf()); // 1672531200000（时间戳）

const numObj = new Number(10);
console.log(numObj + 5); // 15（自动调用 valueOf 转为 10，再计算）

const date1 = new Date("2023-01-01");
const date2 = new Date("2023-01-02");
console.log(date1 < date2); // true（自动调用 valueOf 转为时间戳比较）



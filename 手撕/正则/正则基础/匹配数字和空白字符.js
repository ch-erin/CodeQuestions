// \d : 匹配数字
// \D : 匹配非数字

// \s : 匹配空白字符
// \S : 匹配非空白字符

// 正则表达式：匹配数字或空白字符
const regex = /[\d\s]/;

// 测试单个字符
console.log("=== 单个字符测试 ===");
console.log(regex.test("5")); // true（数字）
console.log(regex.test(" ")); // true（空格）
console.log(regex.test("\t")); // true（制表符）
console.log(regex.test("\n")); // true（换行符）
console.log(regex.test("a")); // false（字母，不匹配）
console.log(regex.test("!")); // false（标点，不匹配）

// 测试字符串中是否包含数字或空白字符
console.log("\n=== 字符串包含测试 ===");
console.log(/[\d\s]/.test("123abc")); // true（包含数字）
console.log(/[\d\s]/.test("  test")); // true（包含空格）
console.log(/[\d\s]/.test("hello\tworld")); // true（包含制表符）
console.log(/[\d\s]/.test("node\njs")); // true（包含换行符）
console.log(/[\d\s]/.test("abcdef")); // false（无数字和空白）
console.log(/[\d\s]/.test("!@#$%")); // false（无数字和空白）

// 测试字符串是否仅由数字和空白字符组成（全匹配）
console.log("\n=== 全匹配测试 ===");
console.log(/^[\d\s]+$/.test("123 456")); // true（数字+空格）
console.log(/^[\d\s]+$/.test("789\t012")); // true（数字+制表符）
console.log(/^[\d\s]+$/.test("345\n678")); // true（数字+换行符）
console.log(/^[\d\s]+$/.test("  90  \t")); // true（空格+数字+制表符）
console.log(/^[\d\s]+$/.test("12a34")); // false（包含字母）
console.log(/^[\d\s]+$/.test("56 78!")); // false（包含标点）

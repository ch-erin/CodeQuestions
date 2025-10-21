// \w : 匹配数字和字母
// \W : 匹配非数字和字母

// 测试 \w 元字符（匹配字母、数字、下划线）
console.log("=== 测试 \\w 元字符 ===");
console.log(/\w/.test("a")); // true  (小写字母)
console.log(/\w/.test("Z")); // true  (大写字母)
console.log(/\w/.test("5")); // true  (数字)
console.log(/\w/.test("_")); // true  (下划线)
console.log(/\w/.test(" ")); // false (空格，非单词字符)
console.log(/\w/.test("!")); // false (感叹号，非单词字符)
console.log(/\w/.test("中文")); // false (中文字符，非单词字符)
console.log(/\w+/.test("hello5_")); // true (字母+数字+下划线组合)

// 测试 \W 元字符（匹配非字母、非数字、非下划线）
console.log("\n=== 测试 \\W 元字符 ===");
console.log(/\W/.test("a")); // false (字母，属于单词字符)
console.log(/\W/.test("3")); // false (数字，属于单词字符)
console.log(/\W/.test("_")); // false (下划线，属于单词字符)
console.log(/\W/.test(" ")); // true  (空格，非单词字符)
console.log(/\W/.test("?")); // true  (问号，非单词字符)
console.log(/\W/.test("￥")); // true  (人民币符号，非单词字符)
console.log(/\W/.test("测试")); // true  (中文字符，非单词字符)
console.log(/\W+/.test("@#$")); // true (多个非单词字符组合)

// 组合示例：判断字符串是否只包含单词字符
console.log("\n=== 组合使用示例 ===");
console.log(/^\w+$/.test("user123")); // true (纯单词字符)
console.log(/^\w+$/.test("user_456")); // true (包含下划线)
console.log(/^\w+$/.test("user@123")); // false (包含@非单词字符)
console.log(/^\W+$/.test("!@#$%")); // true (纯非单词字符)

// 测试 ^ 元字符（匹配字符串开始位置）
console.log("=== 测试 ^ 元字符 ===");
console.log(/^a/.test("apple")); // true  (字符串以"a"开头)
console.log(/^a/.test("banana")); // false (字符串不以"a"开头)
console.log(/^app/.test("apple")); // true  (字符串以"app"开头)
console.log(/^p/.test("apple")); // false (虽然有"p"，但不在开头)

// 测试 $ 元字符（匹配字符串结束位置）
console.log("\n=== 测试 $ 元字符 ===");
console.log(/e$/.test("apple")); // true  (字符串以"e"结尾)
console.log(/e$/.test("banana")); // false (字符串不以"e"结尾)
console.log(/ple$/.test("apple")); // true  (字符串以"ple"结尾)
console.log(/l$/.test("apple")); // false (虽然有"l"，但不在结尾)

// 组合使用 ^ 和 $（匹配整个字符串）
console.log("\n=== 组合使用 ^ 和 $ ===");
console.log(/^apple$/.test("apple")); // true  (完全匹配"apple")
console.log(/^apple$/.test("applepie")); // false (长度超过，不完全匹配)
console.log(/^123$/.test("123")); // true  (完全匹配数字"123")
console.log(/^123$/.test("1234")); // false (数字长度不符)
console.log(/^[a-z]+$/.test("hello")); // true  (全小写字母且无其他字符)
console.log(/^[a-z]+$/.test("hello1")); // false (包含非小写字母字符)

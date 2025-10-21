function getNumbersBeforeLetters(str) {
  // 匹配字符串开头的一个或多个数字
  const match = str.match(/^\d+/);
  // 如果有匹配结果，返回数字字符串，否则返回空字符串或null
  return match ? match[0] : "";
}

// 示例
const str = "108a";
console.log(getNumbersBeforeLetters(str)); // 输出: "108"

// 更多测试
console.log(getNumbersBeforeLetters("1234abc")); // "1234"
console.log(getNumbersBeforeLetters("56def78")); // "56"
console.log(getNumbersBeforeLetters("abc123")); // "" (字符串开头没有数字)
console.log(getNumbersBeforeLetters("90")); // "90" (没有字母的情况)

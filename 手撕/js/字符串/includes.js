function includes(str, searchString, position = 0) {
  // 空字符串特殊处理：任何字符串都包含空字符串
  if (!searchString) return true;

  // 处理position边界，转换为有效整数索引
  const pos = Math.max(0, Math.min(Number(position) || 0, str.length));
  const strLen = str.length;
  const searchLen = searchString.length;

  // 子串长度大于原串剩余部分或起始位置越界，直接返回false
  if (searchLen > strLen - pos) return false;

  for (let i = pos; i <= strLen - searchLen; i++) {
    let match = true;
    for (let j = 0; j < searchLen; j++) {
      if (str[i + j] !== searchString[j]) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }

  return false;
}

// 测试用例
const str = "hello world";
console.log(includes(str, "world")); // true

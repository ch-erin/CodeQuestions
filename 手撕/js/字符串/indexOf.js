function myIndexOf(str, searchValue, fromIndex = 0) {
  // 空字符串特殊处理
  if (!searchValue) return Math.max(0, Math.min(fromIndex, str.length));

  const strLen = str.length;
  const searchLen = searchValue.length;
  // 计算有效起始索引并检查边界
  let i = Math.max(0, fromIndex);

  // 子串过长或起始位置越界直接返回-1
  if (i >= strLen || searchLen > strLen - i) return -1;

  // 遍历查找匹配位置
  for (; i <= strLen - searchLen; i++) {
    let match = true;
    for (let j = 0; j < searchLen; j++) {
      if (str[i + j] !== searchValue[j]) {
        match = false;
        break;
      }
    }
    if (match) return i;
  }

  return -1;
}

// 测试用例
const str = "Hello, world! Hello, JavaScript!";
console.log(myIndexOf(str, "Hello")); // 0

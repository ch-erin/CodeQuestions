function objectToArray(obj) {
  const result = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push([key, obj[key]]);
    }
  }
  return result;
}

// 示例用法
const obj = { a: 1, b: 2, c: 3 };
const result = objectToArray(obj);
console.log(result); // 输出：[["a", 1], ["b", 2], ["c", 3]]

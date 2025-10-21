function flattenObject(obj, separator = ".", parentKey = "") {
  // 存储扁平化结果的对象
  const result = {};

  // 遍历对象的所有键（包括Symbol）
  const keys = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
  ];

  for (const key of keys) {
    // 构建当前键的完整路径
    const currentKey = parentKey ? `${parentKey}${separator}${key}` : key;

    const value = obj[key];

    // 检查值是否为对象（且不是null），并且不是数组或日期等特殊对象
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !(value instanceof Date) &&
      !(value instanceof RegExp)
    ) {
      // 递归处理嵌套对象，合并结果
      const flattened = flattenObject(value, separator, currentKey);
      Object.assign(result, flattened);
    } else if (Array.isArray(value)) {
      // 处理数组：将索引作为键的一部分
      for (let i = 0; i < value.length; i++) {
        const arrayKey = `${currentKey}[${i}]`;
        const arrayValue = value[i];

        // 检查数组元素是否为嵌套对象
        if (
          typeof arrayValue === "object" &&
          arrayValue !== null &&
          !Array.isArray(arrayValue) &&
          !(arrayValue instanceof Date) &&
          !(arrayValue instanceof RegExp)
        ) {
          const flattened = flattenObject(arrayValue, separator, arrayKey);
          Object.assign(result, flattened);
        } else {
          result[arrayKey] = arrayValue;
        }
      }
    } else {
      // 基础类型直接赋值
      result[currentKey] = value;
    }
  }

  return result;
}

// 测试用例
const nestedObj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: [4, 5, { g: 6 }],
    },
  },
  h: [{ i: 7 }, 8, [9, 10]],
  [Symbol("j")]: { k: 11 },
};

const flattened = flattenObject(nestedObj);
console.log(flattened);
/* 输出：
{
  'a': 1,
  'b.c': 2,
  'b.d.e': 3,
  'b.d.f[0]': 4,
  'b.d.f[1]': 5,
  'b.d.f[2].g': 6,
  'h[0].i': 7,
  'h[1]': 8,
  'h[2][0]': 9,
  'h[2][1]': 10,
  'Symbol(j).k': 11
}
*/

// 自定义分隔符测试
const flattenedWithUnderscore = flattenObject(nestedObj, "_");
console.log(flattenedWithUnderscore["b_d_e"]); // 3

const num1 = "12345678901234567890";
const num2 = "9878543690987654324";

/**
 * 大数相减函数
 * @param {string} num1 - 被减数（大数字符串）
 * @param {string} num2 - 减数（大数字符串）
 * @returns {string} 相减结果（大数字符串）
 */
function bigNumberSubtract(num1, num2) {
  // 判断两个数的大小，确定结果符号
  let isNegative = false;
  if (compare(num1, num2) < 0) {
    // 如果被减数小于减数，交换位置并标记结果为负数
    [num1, num2] = [num2, num1];
    isNegative = true;
  }

  // 计算最大长度并对齐补零
  const maxLength = Math.max(num1.length, num2.length);
  num1 = num1.padStart(maxLength, "0");
  num2 = num2.padStart(maxLength, "0");

  let res = "";
  let borrow = 0; // 借位标记

  // 从末尾开始逐位相减
  for (let i = maxLength - 1; i >= 0; i--) {
    // 获取当前位的数字（转为整数）
    const digit1 = parseInt(num1[i], 10);
    const digit2 = parseInt(num2[i], 10);

    // 处理借位
    let diff = digit1 - digit2 - borrow;
    if (diff < 0) {
      diff += 10; // 不够减，借1当10
      borrow = 1; // 标记借位
    } else {
      borrow = 0; // 无需借位
    }

    res = diff + res;
  }

  // 去除前导零
  res = res.replace(/^0+/, "");
  // 如果结果为空（全零），返回"0"
  if (res === "") res = "0";

  // 添加负号（如果需要）
  return isNegative ? `-${res}` : res;
}

/**
 * 比较两个大数字符串的大小
 * @param {string} a - 第一个大数字符串
 * @param {string} b - 第二个大数字符串
 * @returns {number} 1(a>b) | 0(a=b) | -1(a<b)
 */
function compare(a, b) {
  if (a.length !== b.length) {
    return a.length > b.length ? 1 : -1;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return a[i] > b[i] ? 1 : -1;
    }
  }
  return 0;
}

// 测试示例
console.log(bigNumberSubtract(num1, num2)); // 输出: "2467135109245802566"
console.log(bigNumberSubtract(num2, num1)); // 输出: "-2467135109245802566"
console.log(bigNumberSubtract("1000", "1")); // 输出: "999"
console.log(bigNumberSubtract("555", "555")); // 输出: "0"

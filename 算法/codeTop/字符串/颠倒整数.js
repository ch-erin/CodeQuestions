function reverseInteger(x) {
  // 定义 32 位有符号整数的边界（-2^31 到 2^31 - 1）
  const MIN = -Math.pow(2, 31); // -2147483648
  const MAX = Math.pow(2, 31) - 1; // 2147483647

  // 提取符号（正数为1，负数为-1），并将数字转为正数处理
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);

  // 转换逻辑：转为字符串→分割→反转→拼接→转回数字
  const reversedNum = Number(absX.toString().split("").reverse().join(""));

  // 处理溢出：超出边界则返回 0
  const result = sign * reversedNum;
  return result < MIN || result > MAX ? 0 : result;
}

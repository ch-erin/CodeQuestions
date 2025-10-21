/**
 * 处理带小数点的大数字相加
 * @param {string} num1 - 第一个大数字字符串（可带小数点）
 * @param {string} num2 - 第二个大数字字符串（可带小数点）
 * @returns {string} 相加结果
 */
function addBigNumber(num1, num2) {
  // 分割整数部分和小数部分
  const [int1, dec1 = ""] = num1.split(".");
  const [int2, dec2 = ""] = num2.split(".");

  // 处理小数部分：对齐小数位数，补0
  const maxDecLength = Math.max(dec1.length, dec2.length);
  const dec1Padded = dec1.padEnd(maxDecLength, "0");
  const dec2Padded = dec2.padEnd(maxDecLength, "0");

  // 处理整数部分：对齐整数位数，补0
  const maxIntLength = Math.max(int1.length, int2.length);
  const int1Padded = int1.padStart(maxIntLength, "0");
  const int2Padded = int2.padStart(maxIntLength, "0");

  let decResult = ""; // 小数部分结果
  let intResult = ""; // 整数部分结果
  let carry = 0; // 进位

  // 1. 计算小数部分（从右到左）
  for (let i = maxDecLength - 1; i >= 0; i--) {
    const d1 = parseInt(dec1Padded[i] || 0);
    const d2 = parseInt(dec2Padded[i] || 0);
    const sum = d1 + d2 + carry;
    decResult = (sum % 10) + decResult;
    carry = Math.floor(sum / 10);
  }

  // 2. 计算整数部分（从右到左）
  for (let i = maxIntLength - 1; i >= 0; i--) {
    const n1 = parseInt(int1Padded[i] || 0);
    const n2 = parseInt(int2Padded[i] || 0);
    const sum = n1 + n2 + carry;
    intResult = (sum % 10) + intResult;
    carry = Math.floor(sum / 10);
  }

  // 3. 处理最后的进位
  if (carry > 0) {
    intResult = carry + intResult;
  }

  // 4. 组合结果（如果有小数部分才添加小数点）
  return decResult ? `${intResult}.${decResult}` : intResult;
}

// 测试用例
console.log(addBigNumber("123.456", "789.0123")); // "912.4683"
console.log(addBigNumber("0.12345678901234567890", "0.87654321098765432110")); // "1.00000000000000000000"
console.log(addBigNumber("12345678901234567890", "98785436909876543241")); // "111131115811111111331"
console.log(addBigNumber("999.99", "0.01")); // "1000.00"
console.log(addBigNumber("1234.5", "678.901")); // "1913.401"
console.log(addBigNumber("0.0000001", "0.0000009")); // "0.0000010"
console.log(addBigNumber("123", "456.789")); //

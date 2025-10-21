/**
 * 使用整数缩放法进行精确的小数计算
 * @param {string|number} a - 第一个数字
 * @param {string|number} b - 第二个数字
 * @param {string} operator - 运算符, 可选 '+', '-', '*', '/'
 * @param {number} scale - 缩放因子, 即 10 的 scale 次方。例如 scale=2 代表保留两位小数
 * @returns {number} - 计算结果
 */
function preciseCalculate(a, b, operator, scale = 2) {
  // 1. 确定缩放因子
  const multiplier = 10 ** scale;

  // 2. 将输入转换为字符串，然后乘以缩放因子并四舍五入为整数
  // 使用字符串转换可以避免直接用 Number() 转换时可能出现的精度问题
  // Math.round 是为了处理像 0.1 * 100 = 10.000000000000002 这样的极微小误差
  const intA = Math.round(parseFloat(String(a)) * multiplier);
  const intB = Math.round(parseFloat(String(b)) * multiplier);

  let intResult;

  // 3. 在整数层面执行运算
  switch (operator) {
    case "+":
      intResult = intA + intB;
      break;
    case "-":
      intResult = intA - intB;
      break;
    case "*":
      // 乘法会放大精度，需要再次除以一个 multiplier
      // 先转为 BigInt 防止整数溢出，再转回 Number
      intResult = Number((BigInt(intA) * BigInt(intB)) / BigInt(multiplier));
      break;
    case "/":
      if (intB === 0) {
        throw new Error("除数不能为零");
      }
      // 除法需要先乘以一个 multiplier 来保证精度
      intResult = Number((BigInt(intA) * BigInt(multiplier)) / BigInt(intB));
      break;
    default:
      throw new Error("不支持的运算符");
  }

  // 4. 将整数结果转换回小数
  const finalResult = intResult / multiplier;

  return finalResult;
}

// --- 使用示例 ---

// 基本加法
const sum = preciseCalculate(0.1, 0.2, "+", 2);
console.log(sum); // 输出: 0.3
console.log(sum === 0.3); // 输出: true

// 乘法
const product = preciseCalculate(1.2, 0.3, "*", 2);
console.log(product); // 输出: 0.36
console.log(product === 0.36); // 输出: true

// 除法
const quotient = preciseCalculate(1.5, 0.2, "/", 2);
console.log(quotient); // 输出: 7.5

// 处理金额
const price = preciseCalculate(99.99, 1.01, "+", 2);
console.log(price); // 输出: 101

// 使用字符串输入，避免 Number 构造函数的精度问题
const strSum = preciseCalculate("0.1", "0.2", "+", 2);
console.log(strSum); // 输出: 0.3

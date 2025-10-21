function bigNumberAdd(a, b) {
  // 初始化指针，从两个数字的末尾开始
  let i = a.length - 1;
  let j = b.length - 1;
  // 存储进位
  let carry = 0;
  // 存储结果
  let result = [];

  // 当还有数字未处理或还有进位时继续循环
  while (i >= 0 || j >= 0 || carry > 0) {
    // 获取当前位的数字，若已超出字符串长度则用0代替
    const digitA = i >= 0 ? parseInt(a[i]) : 0;
    const digitB = j >= 0 ? parseInt(b[j]) : 0;

    // 计算当前位的总和（包括进位）
    const sum = digitA + digitB + carry;
    // 当前位的结果（总和对10取余）
    result.push(sum % 10);
    // 计算新的进位（总和除以10取整）
    carry = Math.floor(sum / 10);

    // 移动指针
    i--;
    j--;
  }

  // 结果数组是逆序的，需要反转后转为字符串
  return result.reverse().join("");
}

const res = bigNumberAdd("12345678901234567890", "98765432109876543210");

function bigNumberAdd(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = [];

  while (i >= 0 || j >= 0 || carry > 0) {
    const A = i >= 0 ? parseInt(a[i]) : 0;
    const B = j >= 0 ? parseInt(b[j]) : 0;

    const sum = A + B + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);

    i--;
    j--;
  }

  return result.reverse().join("");
}

const num1 = "12345678901234567890";
const num2 = "98785436909876543241";

/**
 *  @param {string}num1
 *  @param {string}num2
 */
function addBigNumber(num1, num2) {
  let maxLength = Math.max(num1.length, num2.length);
  // 对齐补零
  num1 = num1.padStart(maxLength, 0);
  num2 = num2.padStart(maxLength, 0);

  let res = "";
  let carry = 0;

  for (let i = maxLength; i > 0; i--) {
    let item_1 = parseInt(num1[i]);
    let item_2 = parseInt(num2[i]);

    let sum = item_1 + item_2 + carry;

    res += sum % 10;

    carry = Math.floor(sum / 10);
  }

  if (carry > 0) res += carry;

  return res;
}

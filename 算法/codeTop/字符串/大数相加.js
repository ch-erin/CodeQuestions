const num1 = "12345678901234567890";
const num2 = "98785436909876543241";

/**
 *  @param {string}num1
 *  @param {string}num2
 */
function addBigNumbers(num1, num2) {
  let maxLength = Math.max(num1.length, num2.length);
  //对齐补零
  num1 = num1.padStart(maxLength, "0");
  num2 = num2.padStart(maxLength, "0");

  let result = "";
  let carry = 0;

  //从右到左逐个相加
  for (let i = maxLength - 1; i > 0; i--) {
    let item1 = parseInt(num1[i]);
    let item2 = parseInt(num2[i]);

    let sum = item1 + item2 + carry;

    result += sum % 10;

    carry = Math.floor(sum / 10);
  }

  if (carry > 0) result += carry;

  return result;
}

addBigNumbers(num1, num2);

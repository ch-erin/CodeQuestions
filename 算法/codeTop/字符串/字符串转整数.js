/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
  s = s.trim();
  const isNumReg = (str) => /[0-9]/.test(str);
  let numStr = "",
    symbol = "";

  for (let str of s) {
    if ((str === "-" || str === "+") && !numStr && !symbol) {
      symbol = str;
    } else if (isNumReg(str)) {
      numStr += str;
    } else if (!isNumReg(str) && !numStr) {
      return 0;
    } else if (!isNumReg(str) && !!numStr) {
      break;
    }
  }

  const number = Math.abs(Number(numStr));
  if (symbol === "-") {
    return Math.max(Math.pow(-2, 31), -number);
  }
  return Math.min(Math.pow(2, 31) - 1, number);
}

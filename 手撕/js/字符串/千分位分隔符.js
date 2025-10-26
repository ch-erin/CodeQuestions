// 千分位分隔符
function thousandSeparator(num) {
  // 处理非字符情况
  if (typeof num !== "number" && typeof num !== "string") return "";

  let str = String(num);

  let sign = "";
  if (str[0] === "-" || str[0] === "+") {
    sign = str[0];
    str = str.slice(1);
  }

  // 分离正数和小数
  let [integer, decimal] = str.split(".");

  // 处理整数部分
  let formattedInteger = "";
  const len = integerPart.length;

  for (let i = 0; i < len; i++) {
    const position = len - 1 - i;
    formattedInteger = integer[position] + formattedInteger;

    if ((i + 1) % 3 === 0 && i !== len - 1) {
      formattedInteger = "," + formattedInteger;
    }
  }

  return sign + formattedInteger + (decimal ? "." + decimal : "");
}

function thousandSeparator(number) {
  let res = number.toString();

  return res.replace(/\B(?=(\d{3})+(?!\d))/g);
}

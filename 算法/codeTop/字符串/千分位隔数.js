const thousandSeparator = function (n) {
  if (n === 0) return "0";

  let count = 0;
  let ans = "";

  while (n > 0) {
    const cur = n % 10; // 取当前最低位数字
    n = Math.floor(n / 10); // 移除已处理的最低位
    ans += cur.toString(); // 将数字拼接到字符串
    count++;

    if (count % 3 === 0 && n > 0) ans += ".";
  }

  return ans.split("").reverse().join("");
};

main();
function main() {
  Date_test();
  RegExp_test();
  Math_test();
}

function Date_test() {
  // 1. 当前时间
  const now = new Date();

  // 2. 时间戳（毫秒数，从 1970-01-01 UTC 开始）
  const dateFromTimestamp = new Date(1620000000000); // 2021-05-03T12:00:00.000Z

  // 3. 日期字符串（兼容格式：'2024-09-22'、'2024/09/22'、'Sep 22, 2024'）
  const dateFromString = new Date("2024-09-22");

  function getYear() {
    const date = new Date("2024-09-22");
    console.log(date.getFullYear()); // 2024
    date.setFullYear(2025);
    console.log(date.getFullYear()); // 2025
  }

  function getMonth() {
    const date2 = new Date("2024-09-22");
    console.log(date2.getMonth()); // 8（9月对应 8）
    date.setMonth(9); // 设置为 10 月
    console.log(date2.getMonth()); // 9
  }

  function getTime() {
    const date = new Date("2024-09-22");
    const timestamp = date.getTime(); // 1726924800000（2024-09-22 UTC 时间戳）

    // 计算两个日期的差值（天数）
    const date1 = new Date("2024-09-22");
    const date2 = new Date("2024-09-30");
    const diffDays =
      (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
    console.log(diffDays); // 8（相差 8 天）
  }

  const date = new Date("2024-09-22 15:30:00");
  console.log(date.toISOString()); // "2024-09-22T07:30:00.000Z"（UTC 时间）
}

function RegExp_test() {
  // 1. 字面量形式（推荐，性能更好）
  const regex1 = /\d+/g; // 匹配一个或多个数字，全局模式

  // 2. 构造函数形式（动态生成正则时使用）
  const pattern = "\\d+"; // 注意转义符
  const regex2 = new RegExp(pattern, "g");

  
}

function Math_test() {}

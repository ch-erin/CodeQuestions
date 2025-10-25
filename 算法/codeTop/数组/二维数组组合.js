function combineArrays(arr) {
  return arr.reduce(
    (acc, currentSubArray) => {
      return acc.flatMap((prev) => currentSubArray.map((c) => prev + c));
    },
    [""]
  ); // 初始值为空字符串，处理第一个子数组
}

// 示例
const input = [
  ["a", "b"],
  ["n", "m"],
  ["0", "1"],
];
const result = combineArrays(input);
console.log(result); // 输出 ["an0", "an1", "am0", "am1", "bn0", "bn1", "bm0", "bm1"]

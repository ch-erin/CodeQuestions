/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
  const n = digits.length;
  if (!n) return [];
  const ans = [];
  const path = [];
  // 定义数字与字母的映射关系
  const digitToLetters = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  function dfs(i) {
    if (i === n) return ans.push(path.join(""));

    const map = digitToLetters[digits[i]];

    for (char of map) {
      path.push(char);
      dfs(i + 1);
      path.pop();
    }
  }

  dfs(0);

  return ans;
};

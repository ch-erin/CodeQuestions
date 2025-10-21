/**
 * @param {string} s
 * @return {string[]}
 */
const letterCasePermutation = function (s) {
  const result = [];
  const path = [];
  const n = s.length;

  // 使用选或不选的思路可以轻松处理
  function toggleCase(c) {
    if (c >= "a" && c <= "z") return c.toUpperCase();
    if (c >= "A" && c <= "Z") return c.toLowerCase();
    return c;
  }

  function dfs(index) {
    if (index === n) return result.push([...path]);

    const char = s[index];

    if (/[a-zA-Z]/.test(char)) {
      path.push(char);
      dfs(index + 1);
      path.pop();

      path.push(toggleCase(char));
      dfs(index + 1);
      path.pop();
    } else {
      path.push(char);
      dfs(index + 1);
      path.pop();
    }
  }
  dfs(0);

  return result;
};

// 示例测试
console.log(letterCasePermutation("a1b2"));
// 输出: ["a1b2","a1B2","A1b2","A1B2"]
console.log(letterCasePermutation("3z4"));
// 输出: ["3z4","3Z4"]

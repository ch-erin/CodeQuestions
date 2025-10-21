const isPalindrome = (s, left, right) => {
  while (left < right) {
    if (s.charAt(left++) !== s.charAt(right--)) return false;
  }
  return true;
};

/**
 * @param {string} s
 * @return {string[][]}
 */
const partition = function (s) {
  const n = s.length;
  const ans = [];
  const path = [];

  function dfs(i, start) {
    if (i === n) return ans.push([...path]);

    if (i < n - 1) dfs(i + 1, start);

    if (isPalindrome(s, start, i)) {
      path.push(s.substring(start, i + 1));
      dfs(i + 1, i + 1);
      path.pop();
    }
  }

  dfs(0, 0);
  return ans;
};

const longestCommonSubsequence = function (text1, text2) {
  const memo = {};
  let res = "";

  for (let char of text1) {
    char in memo ? memo[char]++ : (memo[char] = 1);
  }

  for (let char of text2) {
    if (char in memo) {
      res += char;
      memo[char]--;
    }
  }

  return res;
};

//记忆化只能过三分之一

const text1 = "abcde";
const text2 = "ace";

const res = longestCommonSubsequence(text1, text2);
console.log(res);

//上dp就ok了
const LCS = (s, t) => {
  const [n, m] = [s.length, t.length];
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (s[i] === t[j]) {
        f[i + 1][j + 1] = f[i][j] + 1;
      } else {
        f[i + 1][j + 1] = Math.max(f[i][j + 1], f[i + 1][j]);
      }
    }
  }

  return f[n][m];
};

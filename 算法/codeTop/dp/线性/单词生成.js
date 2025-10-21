const wordBreak = function (s, wordDict) {
  const maxLen = Math.max(...wordDict.map((word) => word.length));
  const words = new Set(wordDict);

  const n = s.length;
  const f = Array(n + 1).fill(false);
  f[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = i - 1; j >= Math.max(i - maxLen, 0); j--) {
      if (f[j] && words.has(s.slice(j, i))) {
        f[i] = true;
        break;
      }
    }
  }
  
  return f[n];
};

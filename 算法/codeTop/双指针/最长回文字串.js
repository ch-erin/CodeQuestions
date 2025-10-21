const longestPalindrome = function (s) {
  if (s.length < 2) return s;

  let res = "";

  for (let i = 0; i < s.length; i++) {
    hepler(i, i);
    hepler(i, i + 1);
  }

  function hepler(m, n) {
    while (m >= 0 && n < s.length && s[m] === s[n]) {
      m--;
      n++;
    }
    if (n - (m + 1) > res.length) res = s.slice(m + 1, n);
  }

  return res;
};

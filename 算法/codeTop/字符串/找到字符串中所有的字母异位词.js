const findAnagrams = (s, p) => {
  const ans = [];
  const n = p.length;
  const cnt_p = Array(26).fill(0);
  const cnt_s = Array(26).fill(0);
  const A = "a".charCodeAt(0);

  for (let c of p) cnt_p[c.charCodeAt(0) - A]++;

  for (let i = 0; i < s.length; i++) {
    cnt_s[s.charCodeAt(i) - A]++;

    //划出窗口的字符频率减一
    if (i >= n) cnt_s[s.charCodeAt(i - n) - A]--;

    //i >=n-1表示窗口长度到了n, cnt_s.every((v, j) => v === cnt_p[j]) 表示对应字符和字符频率是否相等
    if (i >= n - 1 && cnt_s.every((v, j) => v === cnt_p[j])) {
      ans.push(i - n + 1);
    }
  }

  return ans;
};

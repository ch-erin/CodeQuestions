const findAnagrams = (s, p) => {
  const ans = [];
  const pLen = p.length;
  const cntP = Array(26).fill(0);
  const cntS = Array(26).fill(0);

  for (const c of p) cntP[c.charCodeAt() - 97]++;

  for (let r = 0; r < s.length; r++) {
    cntS[s.charCodeAt(r) - 97]++;
    if (r >= pLen - 1) {
      if (cntS.every((v, i) => v === cntP[i])) ans.push(r - pLen + 1);
      cntS[s.charCodeAt(r - pLen + 1) - 97]--;
    }
  }

  return ans;
};

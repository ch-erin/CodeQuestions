const maxProfit = function (prices) {
  const k = 2;
  const f = Array.from({ length: k + 2 }, () => [-Infinity, -Infinity]);
  for (let j = 1; j <= k + 1; j++) f[j][0] = 0;

  for (const p of prices) {
    for (let j = k + 1; j > 0; j--) {
      f[j][0] = Math.max(f[j][0], f[j][1] + p);
      f[j][1] = Math.max(f[j][1], f[j - 1][0] - p);
    }
  }

  return f[k + 1][0];
};

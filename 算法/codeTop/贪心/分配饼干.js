const findContentChildren = function (g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let i = 0;

  for (const x of s) {
    if (i < g.length && g[i] <= x) {
      i++;
    }
  }

  return i;
};

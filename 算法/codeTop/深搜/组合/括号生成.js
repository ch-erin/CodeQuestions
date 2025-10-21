var generateParenthesis = function (n) {
  const res = [];

  const dfs = (str, open, close) => {
    if (str.length === n * 2) returnres.push(str);

    if (open < n) dfs(str + "(", open + 1, close);
    if (close < open) dfs(str + ")", open, close + 1);
  };

  dfs("", 0, 0);
  return res;
};

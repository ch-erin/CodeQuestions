const combine = function (n, k) {
  const result = [];
  const path = [];

  const dfs = (j) => {
    if (path.length === k) return result.push([...path]);

    for (let i = j; i <= n; i++) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  };
  
  dfs(1);
  return result;
};

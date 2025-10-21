/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function (grid) {
  const [m, n] = [grid.length, grid[0].length];

  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== "1") return;

    grid[i][j] = "2";

    dfs(i, j - 1);
    dfs(i, j + 1);
    dfs(i - 1, j);
    dfs(i + 1, j);
  }

  let ans = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        dfs(i, j);
        ans++;
      }
    }
  }

  return ans;
};

// 并查集解法

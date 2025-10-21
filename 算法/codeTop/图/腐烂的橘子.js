/**
 * @param {number[][]} grid
 * @return {number}
 */
const orangesRotting = function (grid) {
  const [m, n] = [grid.length, grid[0].length];
  let fresh = 0;
  let queue = [];
  let ans = 0;
  let g = 0;
  
  //统计新鲜橘子和腐烂橘子的初始信息
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j] === 1 ? fresh++ : g++;
      grid[i][j] === 2 ? queue.push([i, j]) : g++;
    }
  }

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (fresh && queue.length) {
    ans++;
    const temp = queue;
    queue = [];
    for (const [x, y] of temp) {
      for (const [dx, dy] of dirs) {
        const i = x + dx;
        const j = y + dy;
        if (0 <= i && i < m && 0 <= j && j < n && grid[i][j] === 1) {
          fresh--;
          grid[i][j] = 2;
          queue.push([i, j]);
        }
      }
    }
  }

  return fresh ? -1 : ans;
};

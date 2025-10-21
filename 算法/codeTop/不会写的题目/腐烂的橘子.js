const orangesRotting = function (grid) {
  // 变量创建和初始化
  const [m, n] = [grid.length, grid[0].length];
  let fresh = 0;
  const queue = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) fresh++;
      if (grid[i][j] === 2) queue.push([i, j]);
    }
  }

  let minutes = 0;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // 运算
  while (queue.length && fresh) {
    const next = [];
    for (const [x, y] of queue) {
      for (const [dx, dy] of dirs) {
        const [i, j] = [x + dx, y + dy];
        if (grid[i]?.[j] === 1) {
          grid[i][j] = 2;
          fresh--;
          next.push([i, j]);
        }
      }
    }
    queue = next;
    minutes++;
  }

  return fresh ? -1 : minutes;
};

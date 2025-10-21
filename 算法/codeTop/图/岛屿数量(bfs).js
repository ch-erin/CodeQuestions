const fs = require("fs");

// ---------- 通用输入 ----------
function readGrid() {
  const raw = fs.readFileSync(0, "utf8");
  const lines = raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const [N, M] = lines[0].split(/\s+/).map(Number);
  const grid = lines.slice(1, N + 1).map((l) => l.split(/\s+/).map(Number));
  return { N, M, grid };
}

// ---------- 岛屿数量 ----------
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function countIslands(N, M, g) {
  let ans = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (g[i][j] !== 1) continue;
      ans++;
      const q = [[i, j]];
      g[i][j] = 0; // 就地标记
      while (q.length) {
        const [x, y] = q.shift();
        for (const [dx, dy] of dirs) {
          const nx = x + dx,
            ny = y + dy;
          if (nx < 0 || nx >= N || ny < 0 || ny >= M || g[nx][ny] !== 1)
            continue;
          q.push([nx, ny]);
          g[nx][ny] = 0;
        }
      }
    }
  }
  return ans;
}

// ---------- 主程序 ----------
function main() {
  const { N, M, grid } = readGrid();
  console.log(countIslands(N, M, grid));
}

main();

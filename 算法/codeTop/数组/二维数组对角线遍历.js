function traverseDiagonally(matrix) {
  const result = [];
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let d = 0; d < rows + cols - 1; d++) {
    const diagonal = [];
    for (let i = 0; i <= d; i++) {
      const j = d - i;
      if (i < rows && j < cols) {
        diagonal.push(matrix[i][j]);
      }
    }
    result.push(...diagonal);
  }

  return result;
}

// 示例
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(traverseDiagonally(matrix)); // 输出：[1, 2, 4, 3, 5, 7, 6, 8, 9]

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let i = 0;
  let j = n - 1;

  while (j >= 0 && i < m) {
    if (matrix[i][j] === target) return true;
    matrix[i][j] < target ? i++ : j--;
  }

  return false;
};

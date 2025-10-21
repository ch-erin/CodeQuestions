const spiralOrder = function (matrix) {
  if (!matrix) return [];

  let ans = [];
  const m = matrix[0].length - 1;
  const n = matrix.length - 1;

  const [left, right] = [0, m];
  const [top, buttom] = [0, n];

  while (left <= right && top <= buttom) {
    for (let i = left; i < right; i++) ans.push(matrix[top][i]);
    top++;
    for (let i = top; i < buttom; i++) ans.push(matrix[i][right]);
    right--;
    if (top <= buttom)
      for (let i = right; i >= left; i--) ans.push(matrix[buttom][i]);
    buttom--;
    if (left <= right)
      for (let i = buttom; i >= top; i--) ans.push(matrix[i][left]);
    left++;
  }

  return ans;
};

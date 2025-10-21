/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function (board, word) {
  const n = board.length;
  const m = board[0].length;

  function dfs(i, j, k) {
    if (board[i][j] !== word[k]) return false;
    if (k + 1 === word.length) return true;
    board[i][j] = 0;
  }

  dfs();
  return ans;
};

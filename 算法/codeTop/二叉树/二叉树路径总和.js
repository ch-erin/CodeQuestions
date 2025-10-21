//是否有对应路径能使路径和等于targetSum

const hasPathSum = function (root, targetSum) {
  function dfs(root, targetSum) {
    if (!root) return false;

    targetSum -= root.val;

    if (targetSum === 0) return true;

    return dfs(root.left, targetSum) || dfs(root.right, targetSum);
  }

  return dfs(root, targetSum);
};

const TreeNode = function (val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
};

const root1 = new TreeNode(5);
root1.left = new TreeNode(4);
root1.right = new TreeNode(8);
root1.left.left = new TreeNode(11);
root1.left.left.left = new TreeNode(7);
root1.left.left.right = new TreeNode(2);
root1.right.left = new TreeNode(13);
root1.right.right = new TreeNode(4);
root1.right.right.right = new TreeNode(1);

const targetSum1 = 22;
const res = hasPathSum(root1, targetSum1);
console.log(res);

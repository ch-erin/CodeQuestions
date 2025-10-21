const sortedArrayToBST = function (nums) {
  if (!nums) return [];

  let n = nums.length;

  let mid = Math.floor(n / 2);

  let root = new TreeNode(nums[mid]);

  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));

  return root;
};

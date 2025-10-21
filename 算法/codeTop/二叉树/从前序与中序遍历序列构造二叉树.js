/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
  const n = preorder.length;
  if (n === 0) return null;

  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);
  const midIndex = inorder.indexOf(rootVal);

  root.left = buildTree(
    preorder.slice(1, midIndex + 1),
    inorder.slice(0, midIndex)
  );

  root.right = buildTree(
    preorder.slice(midIndex + 1),
    inorder.slice(midIndex + 1)
  );

  return root;
}

const buildTreeFrom = (preorder, inorder) => {
  const n = preorder.length;
  if (n === 0) return null;

  const root_val = preorder[0];
  const root = new TreeNode(root_val);
  const midIndex = inorder.indexOf(root_val);

  root.left = buildTree(
    preorder.slice(1, midIndex + 1),
    inorder.slice(0, midIndex)
  );

  root.right = buildTree(
    preorder.slice(midIndex + 1),
    inorder.slice(midIndex + 1)
  );

  return root;
};

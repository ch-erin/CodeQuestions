/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    // 计算当前容器的宽度（左右指针之间的距离）
    const width = right - left;
    // 容器的高度由较矮的一侧决定
    const currentHeight = Math.min(height[left], height[right]);
    // 计算当前容器的面积
    const currentArea = width * currentHeight;
    // 更新最大面积
    maxArea = Math.max(maxArea, currentArea);

    height[left] < height[right] ? left++ : right--;
  }

  return maxArea;
};

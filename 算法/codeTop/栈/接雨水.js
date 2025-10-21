/**
 * @param {number[]} height
 * @return {number}
 */
const trap = function (height) {
  if (!height.length) return 0;

  let ans = 0;
  const stack = [];

  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[i] >= height[stack[stack.length - 1]]) {
      const bottomH = height[stack.pop()];
      if (stack.length === 0) break;
      const left = stack[stack.length - 1];
      const right = i;
      const width = right - left - 1;
      const h = Math.min(height[left], height[right]) - bottomH;
      ans += h * width;
    }
    stack.push(i);
  }

  return ans;
};

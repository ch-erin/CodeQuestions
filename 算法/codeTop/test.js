function trap(height) {
  if (!height.length) return 0;

  let ans = 0;
  let stack = [];

  for (let i = 0; i < height.length; i++) {
    //维护一个单调递减栈,单调栈的作用是寻找每个低洼左右两侧的高墙
    while (stack.length && height[i] >= height[stack.at(-1)]) {
      const j = stack.pop();
      const bottom_H = height[j];
      if (stack.length === 0) break;
      const left = stack[stack.length - 1];
      const right = i;
      const width = right - left - 1;
      const h = Math.min(height[left], height[right]) - bottom_H;
      ans += h * width;
    }
    stack.push(i);
  }

  return ans;
}

const height = [4, 2, 0, 3, 2, 5];

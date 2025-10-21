function maxSlidingWindow(nums, k) {
  const q = [];
  const ans = [];

  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q[q.length - 1]] <= nums[i]) q.pop();
    q.push(i);

    if (i - q[0] >= k) q.shift(i);

    if (i >= k - 1) ans.push(nums[q[0]]);
  }

  return ans;
}

const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
const result = maxSlidingWindow(nums, k);

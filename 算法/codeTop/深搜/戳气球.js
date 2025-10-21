// 戳气球问题的深度优先搜索实现（带记忆化）
function maxCoins(nums) {
  // 在数组首尾添加1，方便处理边界情况
  const balloons = [1, ...nums, 1];
  const n = balloons.length;

  // 创建记忆化缓存，避免重复计算
  const memo = Array.from({ length: n }, () => Array(n).fill(-1));

  // 深度优先搜索函数：计算在开区间(i,j)内戳破所有气球能获得的最大硬币数
  function dfs(i, j) {
    // 递归终止条件：区间内没有气球
    if (i >= j - 1) return 0;

    // 如果已经计算过，直接返回缓存结果
    if (memo[i][j] !== -1) return memo[i][j];

    let max = 0;

    // 尝试在区间(i,j)内最后戳破第k个气球
    for (let k = i + 1; k < j; k++) {
      // 当前选择的收益：戳破k时，左右已经没有气球了，所以是balloons[i] * balloons[k] * balloons[j]
      const current = balloons[i] * balloons[k] * balloons[j];
      // 递归计算左边和右边的最大收益
      const total = current + dfs(i, k) + dfs(k, j);
      // 更新最大值
      max = Math.max(max, total);
    }

    // 缓存结果
    memo[i][j] = max;
    return max;
  }

  // 计算整个区间的最大硬币数
  return dfs(0, n - 1);
}

// 测试案例
console.log("测试案例1:");
const nums1 = [3, 1, 5, 8];
console.log("气球数组:", nums1);
console.log("最大硬币数:", maxCoins(nums1)); // 预期输出: 167

console.log("\n测试案例2:");
const nums2 = [1, 5];
console.log("气球数组:", nums2);
console.log("最大硬币数:", maxCoins(nums2)); // 预期输出: 10

console.log("\n测试案例3:");
const nums3 = [2, 4, 8, 4, 0, 7, 8];
console.log("气球数组:", nums3);
console.log("最大硬币数:", maxCoins(nums3)); // 预期输出: 52

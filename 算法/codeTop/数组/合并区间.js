const mergeIntervals = (arr) => {
  if (arr.length === 0) return [];

  arr.sort((a, b) => a[0] - b[0]);

  const merged = [arr[0]];

  for (const current of arr.slice(1)) {
    const last = merged[merged.length - 1];

    // 左区间的右边界和右区间的左边界比较
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
};

// 测试
const arr = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
console.log(mergeIntervals(arr)); // 输出: [[1,6],[8,10],[15,18]]

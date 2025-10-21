var partitionLabels = function (s) {
  const n = s.length;
  const last = Array(26);
  for (let i = 0; i < n; i++) {
    last[s.charCodeAt(i) - "a".charCodeAt(0)] = i; // 每个字母最后出现的下标
  }

  const ans = [];
  let start = 0,
    end = 0;
  for (let i = 0; i < n; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - "a".charCodeAt(0)]); // 更新当前区间右端点的最大值
    if (end === i) {
      // 当前区间合并完毕
      ans.push(end - start + 1); // 区间长度加入答案
      start = i + 1; // 下一个区间的左端点
    }
  }

  return ans;
};

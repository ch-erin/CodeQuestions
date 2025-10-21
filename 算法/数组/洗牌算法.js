function shuffle(arr) {
  const n = arr.length;

  for (let i = n - 1; i > 0; i--) {
    // [0, i]范围内随机找一个位置
    const j = (Math.random() * i + 1) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

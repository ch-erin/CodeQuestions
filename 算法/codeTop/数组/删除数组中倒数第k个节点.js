function removeLastKthElement(arr, k) {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  let fast = 0;
  let slow = 0;

  for (let i = 0; i < k; i++) {
    if (fast >= arr.length) {
      throw new Error("k值超出数组范围");
    }
    fast++;
  }

  while (fast < arr.length) {
    fast++;
    slow++;
  }

  return [...arr.slice(0, slow), ...arr.slice(slow + 1)];
}

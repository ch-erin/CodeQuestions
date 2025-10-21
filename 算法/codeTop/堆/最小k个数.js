/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
const smallestK = function (arr, k) {
  if (!arr) return [];

  const n = arr.length;

  const swap = (i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

  const heapify = (i, n) => {
    let largest = i;
    let left = i * 2 + 1;
    let right = i * 2 + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest === i) return;
    swap(largest, i);
    heapify(largest, n);
  };

  for (let i = Math.floor((n - 1) / 2); i >= 0; i--) heapify(i, n);

  const result = [];
  
  for (let i = 0; i < k; i++) {
    swap(0, n - 1 - i);
    result.push(arr[n - 1 - i]);
    heapify(0, n - 1 - i);
  }

  return result;
};

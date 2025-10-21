const arr = [3, 1, 4, 1, 5, 9, 2, 6];

// 调整堆（确保父节点 >= 子节点）

function heapSort(arr) {
  let n = arr.length;

  function swap(a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }

  // 堆调整
  function heapify(size, index) {
    let root = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    if (left < n && arr[left] > arr[root]) root = left;
    if (right < n && arr[right] > arr[root]) root = right;

    if (root !== index) {
      swap(index, root);
      heapify(size, root);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);

  for (let i = 0; i < n - 1; i++) {
    swap(n - 1 - i, 0);
    heapify(n - 1 - i, 0);
  }

  return arr;
}

const res = heapSort(arr);

console.log(res);

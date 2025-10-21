const arr = [3, 1, 4, 1, 5, 9, 2, 6];

function quickSort(arr) {
  let n = arr.length;
  if (!n) return [];

  const pivotIndex = Math.floor(n / 2);
  let pivot = arr[pivotIndex];

  let left = [];
  let right = [];
  for (let i = 0; i < n; i++) {
    if (i === pivotIndex) continue;

    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const res = quickSort(arr);

console.log(res);

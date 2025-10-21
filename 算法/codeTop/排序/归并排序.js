const arr = [3, 1, 4, 1, 5, 9, 2, 6];

// 默认是有序数组，然后合并成一个有序数组
function merge(left, right) {
  let lLen = left.length;
  let rLen = right.length;

  let reslut = [];
  let i = 0;
  let j = 0;

  while (i < lLen && j < rLen) {
    if (left[i] <= right[j]) {
      reslut.push(left[i++]);
    } else {
      reslut.push(right[j++]);
    }
  }

  while (i < lLen) {
    reslut.push(left[i++]);
  }

  while (j < rLen) {
    reslut.push(right[j++]);
  }

  return reslut;
}

function mergeSort(arr) {
  let n = arr.length;
  if (n <= 1) return [...arr];
  let midIndex = Math.floor(n / 2);

  let left = mergeSort(arr.slice(0, midIndex));
  let right = mergeSort(arr.slice(midIndex));

  return merge(left, right);
}

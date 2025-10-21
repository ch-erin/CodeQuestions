const arr = [3, 1, 4, 1, 5, 9, 2, 6];

// 核心思想 : 重复遍历数组，每次比较相邻元素，若顺序错误则交换，直到没有元素需要交换
function bubbleSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

console.log(bubbleSort(arr));

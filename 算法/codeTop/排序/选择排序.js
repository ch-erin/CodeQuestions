const arr = [3, 1, 4, 1, 5, 9, 2, 6];

// 核心思想 : 每次从剩余未排序元素中找到最小（或最大）值，放到已排序部分的末尾，直到全部排完
function selectionSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[min], arr[i]] = [arr[i], arr[min]];
  }

  return arr;
}

console.log(selectionSort(arr));

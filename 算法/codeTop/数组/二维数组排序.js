const arr = [
  [1, 34],
  [456, 2, 3, 44, 234],
  [4567, 1, 4, 5, 6],
  [34, 78, 23, 1],
];

function sortTwoArr(arr) {
  let goNext = true;
  let entries = arr.entries();
  while (goNext) {
    let result = entries.next();
    if (result.done !== true) {
      result.value[1].sort((a, b) => a - b);
      goNext = true;
    } else {
      goNext = false;
    }
  }
  return arr;
}
console.log("二位数组排序 ->", sortTwoArr(arr));

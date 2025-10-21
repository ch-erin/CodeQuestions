/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// a+b+c = 0 ?
var threeSum = function (arr) {
  if (arr.length < 3) return [];

  const n = arr.length;
  arr.sort((a, b) => a - b);
  const ans = [];

  for (let i = 0; i < n - 2; i++) {
    if (arr[i] > 0) break; //b+c = -a
    if (i > 0 && arr[i] === arr[i - 1]) continue; // 重复跳过

    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (sum === 0) ans.push([arr[i], arr[left], arr[right]]);
      if (sum < 0) {
        left++;
        continue;
      }
      if (sum > 0) {
        right--;
        continue;
      }

      while (left < right && arr[left] === arr[left + 1]) left++;
      while (left < right && arr[right] === arr[right - 1]) right--;
      
      left++;
      right--;
    }
  }

  return ans;
};

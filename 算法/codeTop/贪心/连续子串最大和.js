// 连续字串最大和

function max_subarray_sum(arr) {
  if (!arr) return [];

  let max = arr[0];
  let cur = arr[0];

  for (let i = 0; i < arr.length; i++) {
    cur = Math.max(arr[i], cur + arr[i]);
    if (cur > max) {
      max = cur;
    }
  }

  return max;
}

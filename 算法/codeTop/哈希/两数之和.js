function twoSum(arr, target) {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    const x = target - arr[i];
    if (map.has(x)) return [map.get(x), i];
    map.set(arr[i], i);
  }

  return arr;
}

//记住存的是值 -> 地址

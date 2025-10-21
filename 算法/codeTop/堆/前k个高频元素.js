const topKElement = function (nums, k) {
  let map = new Map();
  //用来当作结果取值用的数组
  const arr = [...new Set(nums)];

  nums.map((num) => {
    if (map.has(num)) {
      const count = map.get(num) + 1;
      map.set(num, count);
    } else {
      map.set(num, 1);
    }
  });

  return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
};

let unique = (arr) => {
  if (!Array.isArray(arr)) return;
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

function unique2DArray(arr) {
  const set = new Set();
  const result = arr.filter((item) => {
    // 将子数组转换为字符串形式
    const str = JSON.stringify(item);
    // 检查这个字符串是否已经出现过
    if (!set.has(str)) {
      set.add(str);
      return true;
    }
    return false;
  });
  return result;
}

function unique(arr) {
  return Array.isArray(arr) ? [...new Set(arr)] : undefined;
}

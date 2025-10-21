const groupAnagrams = function (strs) {
  const map = new Map();

  for (str of strs) {
    const sortedStr = str.split("").sort().join("");

    map.has(sortedStr)
      ? map.get(sortedStr).push(str)
      : map.set(sortedStr, [str]);
  }

  return Array.from(map.values());
};

//异位整理成同位



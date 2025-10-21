const restoreIpAddresses = (s) => {
  const res = [];
  // 位选法
  function dfs(start, path) {
    if (path.length === 4 && start === s.length)
      return res.push(path.join("."));

    for (let len = 1; len <= 3; len++) {
      if (
        start + len > s.length ||
        (len > 1 && s[start] === "0") ||
        (len === 3 && Number(s.substr(start, len)) > 255)
      )
        break;

      const segment = s.substr(start, len);

      path.push(segment);
      dfs(start + len, path);
      path.pop();
    }
  }
  dfs(0, []);

  return res;
};

const s = "25525511135";

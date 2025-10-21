function lexCompare(a, b) {
  const minLength = Math.min(a.length, b.length);

  // 逐个字符比较
  for (let i = 0; i < minLength; i++) {
    const codeA = a.charCodeAt(i);
    const codeB = b.charCodeAt(i);

    if (codeA < codeB) {
      return -1; // a在b前面
    } else if (codeA > codeB) {
      return 1; // a在b后面
    }
  }

  // 前面字符都相同，短的字符串在前面
  if (a.length < b.length) {
    return -1;
  } else if (a.length > b.length) {
    return 1;
  }

  // 完全相同
  return 0;
}

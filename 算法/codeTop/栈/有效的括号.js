function mark(s) {
  const cnt = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  const stack = [];

  for (const c of s) {
    if (cnt[c]) {
      stack.push(c);
    } else {
      if (stack.length === 0) return false;
      const re_c = stack.pop();
      if (cnt[re_c] !== c) return false;
    }
  }

  return stack.length === 0;
}

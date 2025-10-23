let s = "abcabcbb";

function mark(s) {
  const map = {};
  let left = 0;
  let res = 0;

  for (let i = 0; i < s.length; i++) {
    s[i] in map ? map[s[i]]++ : (map[s[i]] = 1);
    while (map[s[i]] > 1) res[s[left++]]--;
    res = Math.max(res, i - left + 1);
  }

  return res;
}

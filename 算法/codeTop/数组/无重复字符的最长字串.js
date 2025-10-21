function lengthOfLongestSubstring(s) {
  const cnt = {};
  let res = 0;
  let left = 0;

  for (let i = 0; i < s.length; i++) {
    s[i] in cnt ? cnt[s[i]]++ : (cnt[s[i]] = 1);
    while (cnt[s[i]] > 1) cnt[s[left++]]--;
    res = Math.max(res, i - left + 1);
  }

  return res;
}

const res = lengthOfLongestSubstring("abcabcbb");

console.log(res); // 3

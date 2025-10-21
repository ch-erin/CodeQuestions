/**
 * @param {string} s
 */
function trim(s) {
  // 左右指针
  let start = 0;
  let end = s.length;

  const isVoid = (char) =>
    char === " " || char === "\n" || char === "\r" || char === "\t";

  while (start <= end && isVoid(s[start])) start++;

  while (end >= start && isVoid(s[end - 1])) end--;

  return s.slice(start, end);
}

console.log(trim("  hello world  "));

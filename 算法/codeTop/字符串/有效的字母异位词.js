/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {
  if (s === t) return false;
  if (s.length !== t.length) return false;
  let A = "a".charCodeAt(0);

  let counts = new Array(26).fill(0);

  for (let a of s) counts[a.charCodeAt(0) - A]++;

  for (let a of t) {
    let index = a.charCodeAt(0) - A;

    if (counts[index] === 0) return false;
    counts[index]--;
  }

  return true;
};

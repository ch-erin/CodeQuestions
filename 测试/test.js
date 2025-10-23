// 无重复最长子串

let s = "abcabcbb";
let a = "cacb";

function mark(s) {
  let left = 0;

  let map = [...new Set(s)];

  let res = "";

  for (let i = 0; i < s.length; i++) {
    
    res += s[i];
    
    if (s[left] === s[i]) {
      left++;
    }
  }

  return;
}

const res = mark(a);
console.log(res);

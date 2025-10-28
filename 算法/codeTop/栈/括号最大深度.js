const s = "(1+(2*3)+((8)/4))+1";

function maxDepth(s) {
  let max = 0;
  let depth = 0;
  for (let char of s) {
    if (char === "(") {
      depth++;
      max = Math.max(depth, max);
    } else if (char === ")") {
      depth--;
    }
  }

  return max;
}

const res = maxDepth(s);
console.log(res);

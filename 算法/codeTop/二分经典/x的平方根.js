var mySqrt = function (x) {
  let left = 0;
  let right = Math.min(x + 1, 46341);
    
  while (left + 1 < right) {
    let m = Math.floor((left + right) / 2);
    if (m * m <= x) {
      left = m;
    } else {
      right = m;
    }
  }

  return left;
};

let x = 12345;

/**
 * @param {number} x
 * @return {number}
 */
const reverse = function (x) {
  let str = x + "";
  let arr = str.split("");

  if (arr[0] === "-") arr.shift();
  if (arr[arr.length - 1] === "0") arr.pop();

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
  }

  return Number(arr.join(""));
};

console.log(reverse(x));

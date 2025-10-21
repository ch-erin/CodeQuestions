/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let numStack = [];
  let strStack = [];

  let num = 0,
    result = "";

  for (let i = 0; i < s.length; i++) {
    const item = s[i];

    if (!isNaN(item)) {
      num = num * 10 + parseInt(item);
    } else if (item === "[") {
      strStack.push(result);
      result = "";
      numStack.push(num);
      num = 0;
    } else if (item === "]") {
      const repeatTimes = numStack.pop();
      result = strStack.pop() + result.repeat(repeatTimes);
    } else {
      result += item;
    }
  }

  return result;
};

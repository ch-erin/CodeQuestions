// 实现concat
Array.prototype.myConcat = function () {
  let result = [];
  for (let i = 0; i < arguments.length; i++) {
    if (Array.isArray(arguments[i])) {
      for (let j = 0; j < arguments[i].length; j++) {
        result.push(arguments[i][j]);
      }
    } else {
      result.push(arguments[i]);
    }
  }
  return result;
};

const array1 = [1, 2];
const array2 = [3, 4];
const array3 = [5, 6];
console.log(array1.myConcat(array2, array3)); // 输出: [1, 2, 3, 4, 5, 6]
console.log(array1.myConcat(array2, 7, array3)); // 输出: [1, 2, 3, 4, 7, 5, 6]

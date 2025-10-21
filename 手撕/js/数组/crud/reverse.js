Array.prototype.myReverse = function () {
  let [left, right] = [0, this.length - 1];

  while (left <= right) {
    [this[left], this[right]] = [this[right], this[left]];
    left++;
    right--;
  }

  return this;
};

let arr = [1, 2, 3];
const res = arr.myReverse();
console.log(res);

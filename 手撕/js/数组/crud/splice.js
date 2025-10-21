Array.prototype.mySplice = function (start, deleteCount, ...items) {
  if (start < 0) {
    start = Math.max(0, this.length + start);
  } else {
    start = Math.min(start, this.length);
  }

  const removedElements = [];

  for (let i = 0; i < deleteCount; i++) {
    if (start < this.length) {
      removedElements.push(this[start]);
      this[start] = undefined;
    }
  }

  for (let i = 0; i < items.length; i++) {
    this[start + i] = items[i];
  }

  this.length = this.length - deleteCount + items.length;

  return removedElements;
};

const arr = [1, 2, 3, 4, 5];
console.log("Original array:", arr);

const removed = arr.mySplice(2, 2, "a", "b", "c");
console.log("Modified array:", arr); // [1, 2, "a", "b", "c", 5]
console.log("Removed elements:", removed); // [3, 4]

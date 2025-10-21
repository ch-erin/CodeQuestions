class QueueMadeByStacks {
  constructor() {
    this.stackIn = []; // 用于入队操作的栈
    this.stackOut = []; // 用于出队操作的栈
  }

  // 入队操作：将元素压入 stackIn
  push(element) {
    this.stackIn.push(element);
  }

  pop() {
    // 如果 stackOut 为空，则需要将 stackIn 的元素“倒入” stackOut
    if (this.stackOut.length === 0) {
      // 倒的过程中，stackIn 中先进入的元素会被压入 stackOut 的底部
      while (this.stackIn.length > 0) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    if (this.stackOut.length === 0) {
      throw new Error("Cannot pop from an empty queue.");
    }
    return this.stackOut.pop();
  }

  // 返回队列中的元素总数
  count() {
    return this.stackIn.length + this.stackOut.length;
  }
}

// 示例用法
const myQueue = new QueueMadeByStacks();
myQueue.push(1);
myQueue.push(2);
myQueue.push(3);

console.log(myQueue.count()); // 输出: 3

console.log(myQueue.pop()); // 输出: 1 (最先入队的元素)
console.log(myQueue.pop()); // 输出: 2

myQueue.push(4);
console.log(myQueue.pop()); // 输出: 3
console.log(myQueue.pop()); // 输出: 4

console.log(myQueue.count()); // 输出: 0

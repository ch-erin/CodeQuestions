// 核心思想 : 双栈倒换

class QueueMadeByStacks {
  constructor() {
    this.in = []; // 入栈
    this.out = []; // 出栈
  }

  push(e) {
    this.in.push(e);
  }

  pop() {
    if (!this.out.length) {
      while (this.in.length > 0) {
        this.out.push(this.in.pop());
      }
    }
    if (this.out.length === 0) {
      throw new Error("Cannot pop from an empty queue.");
    }

    return this.out.pop();
  }

  peek() {
    const val = this.pop();
    this.out.push(val);
    return val;
  }

  isEmpty() {
    return this.in.length === 0 && this.out.length === 0;
  }

  size() {
    return this.in.length + this.out.length;
  }
}

// 示例用法
const myQueue = new QueueMadeByStacks();
myQueue.push(1);
myQueue.push(2);
myQueue.push(3);

console.log(myQueue.size()); // 输出: 3

console.log(myQueue.pop()); // 输出: 1 (最先入队的元素)
console.log(myQueue.pop()); // 输出: 2

myQueue.push(4);
console.log(myQueue.pop()); // 输出: 3
console.log(myQueue.pop()); // 输出: 4

console.log(myQueue.count()); // 输出: 0

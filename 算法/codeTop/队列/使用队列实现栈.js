class QueueStack {
  constructor() {
    this.q1 = [];
    this.q2 = [];
  }

  push(x) {
    this.q2.push(x);
    while (this.q1.length) {
      this.q2.push(this.q1.shift());
    }
    [this.q1, this.q2] = [this.q2, this.q1];
  }

  pop() {
    return this.q1.shift() ?? null;
  }

  top() {
    return this.q1[0] ?? null;
  }

  empty() {
    return this.q1.length === 0;
  }
}

const stack = new QueueStack();
stack.push(1); // q1: [1]
stack.push(2); // q1: [2, 1]
stack.push(3); // q1: [3, 2, 1]
stack.pop(); // 返回 3 → q1: [2, 1]
stack.top(); // 返回 2
stack.empty(); // 返回 false

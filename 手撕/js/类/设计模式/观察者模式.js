// 定义一个主题（Subject）类
class Subject {
  constructor() {
    this.observers = []; // 存储观察者的数组
  }

  // 添加观察者
  add(observer) {
    this.observers.push(observer);
  }

  // 移除观察者
  remove(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // 通知所有观察者
  notify(message) {
    this.observers.forEach((observer) => observer.update(message));
  }
}

// 定义一个观察者（Observer）类
class Observer {
  constructor(name) {
    this.name = name;
  }

  // 更新方法，由主题调用
  update(message) {
    console.log(`${this.name} received message: ${message}`);
  }
}

// 使用示例
const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

// 添加观察者
subject.add(observer1);
subject.add(observer2);

// 通知观察者
subject.notify("Hello, observers!");

// 移除一个观察者
subject.remove(observer1);

// 再次通知观察者
subject.notify("Another message for observers!");

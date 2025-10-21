// 发布订阅者模式核心类
class EventEmitter {
  constructor() {
    // 存储事件映射：key=事件名，value=该事件的订阅者回调数组
    this.events = {};
  }

  on(eventName, callback) {
    // 1. 若事件不存在，初始化空数组存储回调
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    // 2. 将回调加入该事件的订阅队列
    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    // 1. 若事件无订阅者，直接返回
    if (!this.events[eventName]) {
      return;
    }
    // 2. 遍历该事件的所有订阅者，执行回调并传递参数
    this.events[eventName].forEach((callback) => {
      callback.apply(this, args); // 用 apply 绑定 this 并传参
    });
  }

  off(eventName, callback) {
    // 1. 若事件无订阅者，直接返回
    if (!this.events[eventName]) {
      return;
    }
    // 2. 过滤掉要取消的回调，保留其他订阅者
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
  }

  once(eventName, callback) {
    // 1. 包装回调：执行原回调后，自动取消当前订阅
    const onceCallback = (...args) => {
      callback.apply(this, args); // 执行原回调
      this.off(eventName, onceCallback); // 取消自身订阅
    };
    // 2. 订阅包装后的回调
    this.on(eventName, onceCallback);
  }
}

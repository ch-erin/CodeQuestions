class EventBus {
  static instance = null;

  constructor() {
    if (EventBus.instance) {
      console.log("确保唯一实例");
      return EventBus.instance;
    }
    EventBus.instance = this;

    this.events = {};
  }

  // 添加
  on(name, fn) {
    if (!this.events[name]) this.events[name] = [];
    this.events[name].push(fn);
  }

  //取消订阅
  off(name, fn) {
    if (!this.events[name]) return;

    if (fn) {
      this.events[name] = this.events[name].filter((fun) => fun !== fn);
    } else {
      this.events[name] = [];
    }
  }

  emit(name, ...args) {
    if (!this.events[name]) return;

    this.events[name].forEach((fn) => {
      fn.apply(this, args);
    });
  }

  once(name, fn) {
    const warpFun = (...args) => {
      fn.apply(this, args);
      this.off(name, warpFun);
    };
    this.on(name, warpFun);
  }
}

const eventBus = new EventBus();

Object.freeze(eventBus); // 冻结实例，防止被修改

// ------------------------------
// 使用示例
// ------------------------------

// 组件 A 订阅事件
eventBus.on("userLogin", (username) => {
  console.log(`组件A：用户 ${username} 已登录`);
});

// 组件 B 订阅一次事件
eventBus.once("userLogin", (username) => {
  console.log(`组件B：首次登录用户是 ${username}（只触发一次）`);
});

// 组件 C 发布事件
setTimeout(() => {
  eventBus.emit("userLogin", "Alice");
  // 输出：
  // 组件A：用户 Alice 已登录
  // 组件B：首次登录用户是 Alice（只触发一次）
}, 1000);

// 再次发布事件（验证 once 效果）
setTimeout(() => {
  eventBus.emit("userLogin", "Bob");
  // 输出：
  // 组件A：用户 Bob 已登录（组件B不再触发）
}, 2000);

// 验证单例模式：多次创建实例会得到同一个对象
const bus1 = new EventBus();
const bus2 = new EventBus();
console.log(bus1 === bus2); // true（证明是同一个实例）



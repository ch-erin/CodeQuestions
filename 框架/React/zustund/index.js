class ZustandStore {
  constructor(initialState) {
    // 初始化状态
    this.state =
      typeof initialState === "function"
        ? initialState({ set: this.set.bind(this), get: this.get.bind(this) })
        : initialState;
    // 存储订阅者
    this.subscribers = new Set();
  }

  // 获取当前状态
  get() {
    return { ...this.state }; // 返回状态副本，防止直接修改
  }

  // 更新状态
  set(partial) {
    // 计算新状态
    const newState =
      typeof partial === "function" ? partial(this.state) : partial;

    // 浅比较，状态无变化则不更新
    if (this.shallowEqual(this.state, newState)) return;

    // 更新状态
    this.state = { ...this.state, ...newState };

    // 通知所有订阅者
    this.subscribers.forEach((sub) => sub(this.get()));
  }

  // 订阅状态变化
  subscribe(callback, selector) {
    const listener = (state) => {
      const selected = selector ? selector(state) : state;
      callback(selected);
    };

    this.subscribers.add(listener);
    // 立即触发一次，传递当前状态
    listener(this.get());

    // 返回取消订阅函数
    return () => this.subscribers.delete(listener);
  }

  // 工具方法：浅比较两个对象
  shallowEqual(a, b) {
    if (a === b) return true;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (a[key] !== b[key]) return false;
    }
    return true;
  }
}

// 创建store的工厂函数
function create(initialState) {
  const store = new ZustandStore(initialState);

  // 构建对外暴露的API
  const useStore = (selector) => {
    return selector ? selector(store.get()) : store.get();
  };

  useStore.set = (partial) => store.set(partial);
  useStore.get = () => store.get();
  useStore.subscribe = (callback, selector) =>
    store.subscribe(callback, selector);

  return useStore;
}

// 示例使用
const useCounterStore = create(({ set }) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// 测试代码
function test() {
  // 订阅状态变化
  const unsubscribe = useCounterStore.subscribe(
    (count) => console.log("当前count:", count),
    (state) => state.count
  );

  console.log(
    "初始值:",
    useCounterStore((state) => state.count)
  ); // 0

  useCounterStore.get().increment(); // 调用方法
  useCounterStore.set({ count: 10 }); // 直接设置
  useCounterStore.get().decrement();

  unsubscribe(); // 取消订阅
}

test();

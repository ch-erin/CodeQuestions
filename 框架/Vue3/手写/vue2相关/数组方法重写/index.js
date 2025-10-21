// 1. 获取数组原型
const arrayProto = Array.prototype;

// 2. 创建一个继承自数组原型的对象（避免污染原生数组方法）
const arrayMethods = Object.create(arrayProto);

// 3. 定义需要重写的7个方法
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

methodsToPatch.forEach((method) => {
  // 保存原生方法
  const original = arrayProto[method];

  // 重写方法
  arrayMethods[method] = function (...args) {
    // 1. 执行原生方法（保证数组操作正常进行）
    const result = original.apply(this, args);

    // 2. 关键：获取当前数组的观察者（observer）
    const ob = this.__ob__;

    // 3. 处理新增元素（如果是 push/unshift/splice，可能会添加新元素）
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args; // push/unshift 的参数就是新增元素
        break;
      case "splice":
        inserted = args.slice(2); // splice 的第三个参数及以后是新增元素
        break;
    }
    // 若有新增元素，将其转为响应式
    if (inserted) ob.observeArray(inserted);

    // 4. 通知依赖更新（触发视图渲染）
    ob.dep.notify();

    // 5. 返回原生方法的结果
    return result;
  };
});

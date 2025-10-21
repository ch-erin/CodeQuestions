function copy(obj) {
  function Fun() {}
  Fun.prototype = obj;
  return new Fun();
}

function inheritPrototype(child, parent) {
  // 步骤1：复制父类原型（不执行父构造函数）
  let prototype = copy(parent.prototype);
  // 步骤2：增强原型（修复constructor）
  prototype.constructor = child;
  // 步骤3：赋值给子类原型
  child.prototype = prototype;
}

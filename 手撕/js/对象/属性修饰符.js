const p = {
  name: "chen_shuo",
  age: "2",
  sex: "male",
};

// 添加迭代器属性
Object.defineProperty(p, Symbol.iterator, {
  enumberable: false, // 是否可遍历
  configurable: false, // 是否可删除
  writable: false, // 是否可重写
  value: function () {
    let _this = this;
    let nowIndex = -1;
    let keys = Object.keys(this);
    return {
      next: function () {
        nowIndex++;
        return {
          value: _this[keys[nowIndex]],
          done: nowIndex + 1 > keys.length,
        };
      },
    };
  },
});

const obj = {
  _name: "张三",
  get _name() {
    return this._name++;
  },
  /**
   * @param {number} value
   */
  set _name(value) {
    this._name = value;
  },
};

// value与get/set互斥：
// 一个属性不能同时定义value和 set/get

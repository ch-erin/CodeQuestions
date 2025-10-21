const p = {
  name: "chen_shuo",
  age: "2",
  sex: "male",
};

// 添加迭代器属性

// 还可以添加很多不同的属性
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

for (const item of p) {
  console.log(item);
}

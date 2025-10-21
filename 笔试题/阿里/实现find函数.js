const data = [
  { userId: 8, title: "title1" },
  { userId: 11, title: "other" },
  { userId: 15, title: null },
  { userId: 19, title: "title2" },
];

const find = function (origin) {
  const currentData = [...origin];

  const query = {
    where(condition) {
      const filtered = currentData.filter((item) =>
        Object.entries(condition).every(([key, value]) => {
          const itemValue = item[key];

          if (itemValue == null) return false;

          return value instanceof RegExp
            ? value.test(itemValue)
            : itemValue === value;
        })
      );

      return find(filtered);
    },

    orderBy(key, order = "asc") {
      const sorted = [...currentData].sort((a, b) => {
        return order === "desc" ? b[key] - a[key] : a[key] - b[key];
      });

      return find(sorted);
    },

    // 重写 valueOf 和 toString，在需要值时自动返回纯净数据
    valueOf() {
      return currentData.map((item) => ({ ...item }));
    },

    toString() {
      return JSON.stringify(this.valueOf());
    },

    // 支持数组方法代理
    [Symbol.iterator]() {
      return this.valueOf()[Symbol.iterator]();
    },
  };

  // 设置原型为数组，使其支持数组方法
  Object.setPrototypeOf(query, Array.prototype);

  return query;
};

// 测试代码
const result = find(data).where({ title: /\d$/ }).orderBy("userId", "desc");
const result1 = find(data).orderBy("userId", "asc").where({ title: /\d$/ });

console.log(result); // [ { userId: 19, title: 'title2' }, { userId: 8, title: 'title1' } ]
console.log(result1); // [ { userId: 8, title: 'title1' }, { userId: 19, title: 'title2' } ]

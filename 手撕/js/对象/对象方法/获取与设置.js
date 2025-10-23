function get(obj, path, value) {
  if (typeof obj !== "object" || obj === value) return value;

  const keys = Array.isArray(path)
    ? path
    : // 匹配所有.和类似“.[0]”的情况,“\]”是需要转移，不然会有歧义
      path.split(/[.[\]]/g).filter((key) => key);

  let res = obj;
  for (let key of keys) {
    res = res[key];
    if (res === undefined) break; // 防止路径不存在导致报错
  }

  return res;
}

// set的关键还是处理数组与对象属性的差别
function set(obj, path, value) {
  if (obj === null || typeof obj !== "object") return obj;

  const keys = Array.isArray(path)
    ? path
    : path.split(/[.[\]]/g).filter((key) => key);

  let cur = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      const next_key = keys[index + 1];
      const cur_value = cur[key];

      if (
        cur_value === null ||
        cur_value === undefined ||
        typeof cur_value !== "object"
      ) {
        cur[key] = /^\d+$/.test(next_key) ? [] : {};
      }
      cur = cur[key];
    }
  });

  return obj;
}

const data = {
  user: {
    name: "Alice",
    age: 25,
    hobbies: ["reading", { type: "sports", items: ["running", "swimming"] }],
  },
  config: {
    theme: "light",
    settings: [
      { key: "notifications", value: true },
      { key: "sync", value: false },
    ],
  },
};

// ==================== get函数使用案例 ====================
console.log("===== get函数测试 =====");

// 1. 获取简单嵌套属性（对象+点号路径）
console.log(get(data, "user.name")); // 输出: "Alice"

// 2. 获取数组元素（中括号路径）
console.log(get(data, "user.hobbies[0]")); // 输出: "reading"

// 3. 获取深层嵌套属性（混合对象和数组）
console.log(get(data, "user.hobbies[1].items[1]")); // 输出: "swimming"

// 4. 使用数组路径获取属性
console.log(get(data, ["config", "settings", "1", "value"])); // 输出: false

// 5. 获取不存在的属性（返回undefined）
console.log(get(data, "user.address.city")); // 输出: undefined

// 6. 为不存在的属性设置默认值
console.log(get(data, "user.age", 18)); // 输出: 25（属性存在，返回实际值）
console.log(get(data, "user.gender", "unknown")); // 输出: "unknown"（属性不存在，返回默认值）

// ==================== set函数使用案例 ====================
console.log("\n===== set函数测试 =====");

// 1. 修改已存在的属性
set(data, "user.age", 26);
console.log(get(data, "user.age")); // 输出: 26（年龄被更新）

// 2. 给数组添加新元素
set(data, "user.hobbies[2]", "coding");
console.log(get(data, "user.hobbies")); // 输出: ["reading", { ... }, "coding"]（数组新增元素）

// 3. 深层嵌套属性赋值（中间层级已存在）
set(data, "config.settings[0].value", false);
console.log(get(data, "config.settings[0].value")); // 输出: false（修改数组中对象的属性）

// 4. 自动创建不存在的中间层级（对象）
set(data, "user.address.city", "Shanghai");
console.log(get(data, "user.address.city")); // 输出: "Shanghai"（自动创建address对象）

// 5. 自动创建不存在的中间层级（数组）
set(data, "user.friends[0].name", "Bob");
console.log(get(data, "user.friends[0].name")); // 输出: "Bob"（自动创建friends数组和第0个对象）

// 6. 混合创建对象和数组
set(data, "data.statistics[2023].sales", 1000);
console.log(get(data, "data.statistics[2023].sales")); // 输出: 1000（自动创建statistics对象和2023属性）

// 7. 对非对象类型使用set（无效果）
const str = "hello";
set(str, "length", 10); // 字符串是原始类型，无法修改
console.log(str.length); // 输出: 5（保持不变）

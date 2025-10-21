// 模板字符串
const template = `
  <h1>{{ greet }}</h1>
  <p>姓名：{{ user.name }}</p>
  <p>年龄：{{ user.age }}</p>
  <p>爱好：{{ user.hobby[0] }}</p> <!-- 支持数组 -->
  <p>未定义字段：{{ user.address }}</p> <!-- 处理不存在的字段 -->
`;

// 数据对象
const data = {
  greet: "Hello, 模板引擎！",
  user: {
    name: "张三",
    age: 25,
    hobby: ["读书", "跑步"],
    // 没有 address 字段
  },
};

// 渲染结果
const result = render(template, data);
console.log(result);

/**
 * 简单模板引擎
 * @param {string} template 模板字符串（含 {{变量}} 占位符）
 * @param {object} data 数据对象（用于替换占位符）
 * @returns {string} 渲染后的字符串
 */
function render(template, data) {
  // 1. 正则匹配 {{变量}} 占位符（支持空格，如 {{ user.name }}）
  const regex = /{{\s*([\w.]+)\s*}}/g;
  const new_regex = /{{\s*([\w.]+)\s*}}/g;

  // 2. 替换占位符
  return template.replace(regex, (match, key) => {
    // key 是提取的变量路径，如 "greet"、"user.name"
    const keys = key.split("."); // 拆分为数组，如 ["user", "name"]

    // 3. 根据路径从 data 中查找值（支持嵌套对象）
    let value = data;
    for (const k of keys) {
      // 若中间路径不存在，返回空字符串（避免报错）
      if (value === undefined || value === null) {
        return "";
      }
      value = value[k];
    }

    // 4. 处理值为 undefined/null 的情况，返回空字符串
    return value ?? "";
  });
}






/**
 * 支持数组索引的模板引擎（如 {{ items[0].name }}）
 * @param {string} template 模板字符串
 * @param {object} data 数据对象
 * @returns {string} 渲染后的字符串
 */
function render(template, data) {
  // 1. 正则匹配 {{ 变量 }}，支持对象路径（.）和数组索引（[数字]）
  // 匹配规则：允许字母、数字、下划线、.、[数字]
  const regex = /{{\s*([\w.]+(?:\[\d+\])*)\s*}}/g;

  return template.replace(regex, (match, key) => {
    // 2. 将数组索引格式 [0] 转换为 .0（统一路径格式）
    // 例如：items[0].name → items.0.name；user.list[2] → user.list.2
    const normalizedKey = key.replace(/\[(\d+)\]/g, ".$1");

    // 3. 拆分路径（按 . 分割）
    const keys = normalizedKey.split(".");

    // 4. 从数据中逐层查找值
    let value = data;
    for (const k of keys) {
      // 若中间路径不存在，返回空字符串
      if (value === undefined || value === null) {
        return "";
      }
      value = value[k];
    }

    // 5. 处理空值
    return value ?? "";
  });
}

// 使用示例
const template = `
  <h3>{{ items[0].name }}</h3>
  <p>价格：{{ items[0].price }}</p>
  <p>第3个标签：{{ user.tags[2] }}</p>
  <p>不存在的数组项：{{ items[10].name }}</p>
`;

const data = {
  items: [
    { name: "笔记本电脑", price: 5999 },
    { name: "手机", price: 3999 },
  ],
  user: {
    tags: ["学生", "程序员", "前端开发"],
  },
};

const result = render(template, data);
console.log(result);

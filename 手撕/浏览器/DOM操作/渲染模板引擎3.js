/**
 * 支持函数调用的模板引擎（如 {{ task() }}、{{ user.getName() }}）
 * @param {string} template 模板字符串
 * @param {object} data 数据对象（可包含函数）
 * @returns {string} 渲染后的字符串
 */
function render(template, data) {
  // 1. 正则匹配：支持变量、对象路径、数组索引、函数调用（带()）
  // 匹配规则：允许字母、数字、下划线、.、[数字]、()、逗号、参数（简化版）
  const regex = /{{\s*([\w.]+(?:\[\d+\])*(?:\(\s*[^)]*\s*\))?)\s*}}/g;

  return template.replace(regex, (match, key) => {
    try {
      // 2. 处理数组索引：[0] → .0
      let normalizedKey = key.replace(/\[(\d+)\]/g, ".$1");

      // 3. 判断是否为函数调用（末尾是否有()）
      const isFunction = /\(\s*\)$/.test(normalizedKey);

      // 4. 提取函数名和参数（简化版：无参数或简单参数）
      let funcName,
        args = [];
      if (isFunction) {
        // 分离函数名和括号，例如 "user.getName()" → 函数名 "user.getName"
        funcName = normalizedKey.replace(/\(\s*\)$/, "");
      } else {
        funcName = normalizedKey; // 普通变量路径
      }

      // 5. 解析函数/变量路径，获取对应的值/函数
      const keys = funcName.split(".");
      let target = data;
      for (const k of keys) {
        if (target === undefined || target === null) {
          return ""; // 路径不存在，返回空
        }
        target = target[k];
      }

      // 6. 执行函数（若为函数），否则直接返回值
      if (isFunction) {
        if (typeof target === "function") {
          return target(...args) ?? ""; // 执行函数并返回结果
        } else {
          return ""; // 不是函数却带()，返回空
        }
      } else {
        return target ?? ""; // 普通变量，直接返回值
      }
    } catch (e) {
      return ""; // 解析出错时返回空
    }
  });
}

// 使用示例
const template = `
  <p>无参函数：{{ greet() }}</p>
  <p>对象方法：{{ user.getName() }}</p>
  <p>带参数函数：{{ calculate(2, 3) }}</p>
  <p>数组+函数：{{ items[0].formatPrice() }}</p>
  <p>非函数调用：{{ user.age }}</p>
`;

const data = {
  greet: () => "Hello, 函数调用！",
  user: {
    name: "张三",
    age: 25,
    getName: function () {
      return this.name + "（来自方法）";
    },
  },
  calculate: (a, b) => a + b,
  items: [
    {
      price: 5999,
      formatPrice: function () {
        return `¥${this.price.toLocaleString()}`;
      },
    },
  ],
};

const result = render(template, data);
console.log(result);

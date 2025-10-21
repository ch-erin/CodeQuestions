function Template(tpl) {
  // 简化HTML转义函数
  const escapeHtml = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  // 构建渲染函数代码
  const code = ["let r = [];"];
  let index = 0;
  const re = /\{\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\}/g;

  // 使用字符串替换而非循环处理模板
  tpl.replace(re, (match, expr, isSafe, offset) => {
    // 添加匹配前的文本
    if (offset > index) {
      code.push(
        `r.push('${tpl
          .slice(index, offset)
          .replace(/'/g, "\\'")
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")}');`
      );
    }

    // 添加表达式处理
    code.push(
      isSafe
        ? `r.push(String(this.${expr}));`
        : `r.push(escapeHtml(String(this.${expr})));`
    );

    index = offset + match.length;
    return match;
  });

  // 添加剩余文本
  if (index < tpl.length) {
    code.push(
      `r.push('${tpl
        .slice(index)
        .replace(/'/g, "\\'")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")}');`
    );
  }

  code.push('return r.join("");');

  // 创建渲染函数
  const renderFn = new Function("escapeHtml", code.join("\n"));

  // 公开渲染方法
  this.render = (model) => renderFn.call(model, escapeHtml);
}

// 测试1：基本变量渲染
const tpl1 = "Hello, {name}! You are {age} years old.";
const model1 = { name: "Alice", age: 30 };
const template1 = new Template(tpl1);
console.log("测试1结果:", template1.render(model1));
// 预期输出: Hello, Alice! You are 30 years old.

// 测试2：HTML转义功能
const tpl2 = "User input: {htmlContent}";
const model2 = { htmlContent: '<script>alert("xss")</script>' };
const template2 = new Template(tpl2);
console.log("测试2结果:", template2.render(model2));
// 预期输出: User input: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;

// 测试3：安全输出（不转义）
const tpl3 = "Safe content: {htmlContent|safe}";
const model3 = { htmlContent: "<strong>bold text</strong>" };
const template3 = new Template(tpl3);
console.log("测试3结果:", template3.render(model3));
// 预期输出: Safe content: <strong>bold text</strong>

// 测试4：包含点符号的属性访问
const tpl4 = "User: {user.name}, Email: {user.email}";
const model4 = {
  user: {
    name: "Bob",
    email: "bob@example.com",
  },
};
const template4 = new Template(tpl4);
console.log("测试4结果:", template4.render(model4));
// 预期输出: User: Bob, Email: bob@example.com

// 测试5：带括号的表达式（函数调用）
const tpl5 = "Formatted date: {formatDate()}";
const model5 = {
  formatDate() {
    return new Date().toLocaleDateString();
  },
};
const template5 = new Template(tpl5);
console.log("测试5结果:", template5.render(model5));
// 预期输出: Formatted date: 当前日期（如 2023/10/5）

// 测试6：混合文本和变量
const tpl6 =
  "<h1>{title}</h1>\n<p>{content|safe}</p>\n<footer>© {year}</footer>";
const model6 = {
  title: "Welcome",
  content: "This is <em>italic</em> text",
  year: 2023,
};
const template6 = new Template(tpl6);
console.log("测试6结果:\n", template6.render(model6));
/* 预期输出:
<h1>Welcome</h1>
<p>This is <em>italic</em> text</p>
<footer>© 2023</footer>
*/

function template() {
  // 简化HTML转义函数
  const escapeHtml = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const code = ["let r = [];"];
  let index = 0;
  const re = /\{\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\}/g; // 匹配模板变量的正则
  
}

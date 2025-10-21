// 安装依赖：npm install express
const express = require("express");
const app = express();

// 处理 JSONP 请求
app.get("/api/data", (req, res) => {
  // 1. 获取客户端传入的回调函数名
  const callbackName = req.query.callback;

  // 2. 准备要返回的数据
  const data = {
    username: "张三",
    age: 25,
    from: "跨域服务器",
  };

  // 3. 构造 JSONP 响应：回调函数调用 + 数据作为参数
  // 格式：handleResponse({ "username": "张三", ... })
  const response = `${callbackName}(${JSON.stringify(data)})`;

  // 4. 设置响应类型为 JavaScript（重要）
  res.type("text/javascript");
  res.send(response);
});

// 启动服务器（端口 4000，与客户端的 3000 端口形成跨域）
app.listen(4000, () => {
  console.log("JSONP 服务器运行在 http://localhost:4000");
});

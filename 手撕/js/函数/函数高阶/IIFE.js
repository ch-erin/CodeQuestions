(function initializeApp() {
  console.log("应用初始化开始...");

  // 模拟初始化操作：配置环境、连接数据库等
  const config = {
    env: "development",
    apiUrl: "https://api.dev.com",
  };

  // 初始化完成后挂载到全局（仅暴露必要信息）
  window.appConfig = config;
  console.log("应用初始化完成！");
})();

// 后续可使用初始化结果
console.log("当前环境：", window.appConfig.env); // 输出：development



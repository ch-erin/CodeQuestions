// 状态机示例（登录流程）
function loginFlow(state = "INIT") {
  switch (state) {
    case "INIT":
      console.log("初始化登录流程");
      return loginFlow("AUTH_CHECK");
    case "AUTH_CHECK":
      console.log("检查用户授权状态");
      return loginFlow("TOKEN_VALIDATE");
    case "TOKEN_VALIDATE":
      console.log("验证访问令牌");
      return loginFlow("COMPLETE");
    case "COMPLETE":
      return "登录成功";
    default:
      throw new Error("未知状态");
  }
}

// 启动流程
console.log(loginFlow()); // 输出状态流转日志后返回 "登录成功"

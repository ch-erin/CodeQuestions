class CookieMessenger {
  constructor(options = {}) {
    // 配置参数
    this.namespace = options.namespace || "crossTabMsg"; // 避免Cookie键冲突
    this.pollInterval = options.pollInterval || 300; // 轮询间隔(ms)
    this.maxSize = options.maxSize || 3000; // 单条消息最大字节数(约3KB)
    this.expires = options.expires || 1; // Cookie过期时间(分钟)
    this.listeners = []; // 消息监听器

    // 初始化：记录最后一次消息ID，避免重复处理
    this.lastMessageId = this.getLastMessageId();

    // 启动轮询
    this.startPolling();
  }

  // 生成唯一消息ID
  generateMessageId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  // 获取最后处理的消息ID
  getLastMessageId() {
    const id = this.getCookie(`${this.namespace}_lastId`);
    return id || "";
  }

  // 更新最后处理的消息ID
  updateLastMessageId(id) {
    this.setCookie(`${this.namespace}_lastId`, id, this.expires);
    this.lastMessageId = id;
  }

  // 设置Cookie
  setCookie(name, value, minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    // 编码值以支持特殊字符
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
  }

  // 获取Cookie
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(";").shift());
    }
    return null;
  }

  // 删除Cookie
  deleteCookie(name) {
    this.setCookie(name, "", -1);
  }

  // 拆分大消息
  splitMessage(message) {
    const messageStr = JSON.stringify(message);
    const chunks = [];
    const maxChunkSize = this.maxSize;

    for (let i = 0; i < messageStr.length; i += maxChunkSize) {
      chunks.push(messageStr.substr(i, maxChunkSize));
    }

    return {
      total: chunks.length,
      chunks,
    };
  }

  // 发送消息
  send(message) {
    try {
      const msgId = this.generateMessageId();
      const { total, chunks } = this.splitMessage(message);

      // 发送消息元数据(总块数、消息ID)
      this.setCookie(
        `${this.namespace}_meta`,
        JSON.stringify({ id: msgId, total }),
        this.expires
      );

      // 分块发送消息内容
      chunks.forEach((chunk, index) => {
        this.setCookie(`${this.namespace}_chunk_${index}`, chunk, this.expires);
      });

      return true;
    } catch (error) {
      console.error("发送消息失败:", error);
      return false;
    }
  }

  // 合并消息块
  mergeChunks(totalChunks) {
    let messageStr = "";
    for (let i = 0; i < totalChunks; i++) {
      const chunk = this.getCookie(`${this.namespace}_chunk_${i}`);
      if (!chunk) return null; // 块缺失，消息不完整
      messageStr += chunk;
    }
    return JSON.parse(messageStr);
  }

  // 处理接收到的消息
  handleMessage() {
    // 获取消息元数据
    const metaStr = this.getCookie(`${this.namespace}_meta`);
    if (!metaStr) return;

    try {
      const { id, total } = JSON.parse(metaStr);

      // 跳过已处理的消息
      if (id === this.lastMessageId) return;

      // 合并消息块
      const message = this.mergeChunks(total);
      if (!message) return;

      // 触发监听器
      this.listeners.forEach((listener) => {
        listener(message);
      });

      // 更新最后处理的消息ID
      this.updateLastMessageId(id);

      // 清理消息Cookie(可选，根据需求保留)
      this.deleteCookie(`${this.namespace}_meta`);
      for (let i = 0; i < total; i++) {
        this.deleteCookie(`${this.namespace}_chunk_${i}`);
      }
    } catch (error) {
      console.error("处理消息失败:", error);
    }
  }

  // 启动轮询
  startPolling() {
    this.pollTimer = setInterval(() => {
      this.handleMessage();
    }, this.pollInterval);
  }

  // 停止轮询
  stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  // 注册消息监听器
  onMessage(listener) {
    if (typeof listener === "function") {
      this.listeners.push(listener);
    }
  }

  // 移除消息监听器
  offMessage(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  // 销毁实例
  destroy() {
    this.stopPolling();
    this.listeners = [];
    // 清理所有相关Cookie
    this.deleteCookie(`${this.namespace}_lastId`);
    this.deleteCookie(`${this.namespace}_meta`);
    let i = 0;
    while (this.getCookie(`${this.namespace}_chunk_${i}`)) {
      this.deleteCookie(`${this.namespace}_chunk_${i}`);
      i++;
    }
  }
}

// 使用示例
// 在页面A中发送消息
const messengerA = new CookieMessenger();
document.getElementById("sendBtn").addEventListener("click", () => {
  const message = {
    type: "notification",
    content: "这是来自页面A的消息",
    timestamp: new Date().toISOString(),
  };
  messengerA.send(message);
});

// 在页面B中接收消息
const messengerB = new CookieMessenger();
messengerB.onMessage((message) => {
  console.log("收到跨页消息:", message);
  // 显示消息到页面
  const msgElement = document.createElement("div");
  msgElement.textContent = `[${message.timestamp}] ${message.content}`;
  document.getElementById("messageContainer").appendChild(msgElement);
});

// 页面卸载时清理
window.addEventListener("beforeunload", () => {
  messengerA.destroy();
  messengerB.destroy();
});

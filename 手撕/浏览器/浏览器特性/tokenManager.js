class TokenManager {
  constructor() {
    this.token = undefined;
    this.expiresAt = 0;
    this.refreshPromise = null;
    this.tokenValidityBuffer = 5000; // 5秒缓冲时间，避免令牌在请求过程中过期
  }

  // 模拟异步接口调用，返回新的令牌和有效期
  async mockTokenApi() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 10%的失败率，模拟网络请求可能出现的错误
        if (Math.random() < 0.1) {
          reject(new Error("Token refresh failed"));
        } else {
          resolve({
            token: `token_${Date.now()}`,
            expiresIn: 300000, // 令牌有效期5分钟（300000毫秒）
          });
        }
      }, 1000); // 模拟1秒的网络延迟
    });
  }

  // 检查令牌是否有效
  isValid() {
    // 令牌存在且当前时间在有效期内（扣除缓冲时间）
    return (
      !!this.token && Date.now() < this.expiresAt - this.tokenValidityBuffer
    );
  }

  // 异步获取令牌，如果令牌无效则自动刷新
  async getToken() {
    // 如果令牌有效，直接返回
    if (this.isValid()) return this.token;

    // 如果已有正在进行的刷新请求，等待其完成
    if (!this.refreshPromise) {
      this.refreshPromise = this.refresh();
    }

    try {
      await this.refreshPromise;
    } finally {
      // 无论刷新成功或失败，都清除进行中的请求标记
      this.refreshPromise = null;
    }

    // 刷新后再次检查令牌有效性
    if (!this.isValid()) {
      throw new Error("Failed to obtain valid token");
    }
    return this.token;
  }

  // 同步获取令牌，不自动刷新
  getTokenSync() {
    return this.isValid() ? this.token : undefined;
  }

  // 强制刷新令牌
  async refresh() {
    // 如果已有正在进行的刷新请求，返回该请求
    if (this.refreshPromise) return this.refreshPromise;

    try {
      // 发起令牌刷新请求
      this.refreshPromise = this.mockTokenApi()
        .then(({ token, expiresIn }) => {
          // 更新令牌和过期时间
          this.token = token;
          this.expiresAt = Date.now() + expiresIn;
        })
        .finally(() => {
          this.refreshPromise = null;
        });

      await this.refreshPromise;
    } catch (error) {
      // 刷新失败时清除无效令牌
      this.token = undefined;
      this.expiresAt = 0;
      throw error;
    }
  }
}

// 使用示例
const tokenManager = new TokenManager();

// 测试令牌获取流程
async function testTokenManager() {
  try {
    console.log("获取第一个令牌:", await tokenManager.getToken());
    console.log("同步获取令牌:", tokenManager.getTokenSync());

    console.log("再次获取令牌（应使用缓存）:", await tokenManager.getToken());

    // 强制刷新令牌
    console.log("强制刷新令牌...");
    await tokenManager.refresh();
    console.log("刷新后的令牌:", await tokenManager.getToken());
  } catch (error) {
    console.error("令牌操作出错:", error.message);
  }
}

testTokenManager();

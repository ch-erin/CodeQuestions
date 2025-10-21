function myReject(reason) {
  return new Promise((resolve, reject) => {
    // 直接调用reject，将Promise状态设为rejected
    reject(reason);
  });
}

/**
 * 将字符串中的大写字母转换为小写字母（模拟 toLowerCase 效果）
 * @returns {string} 转换后的新字符串
 */
String.prototype.MytoLowerCase = function () {
  // 注意：this 指向调用该方法的字符串实例，无需额外接收参数 s
  let result = "";
  const length = this.length;

  for (let i = 0; i < length; i++) {
    const charCode = this.charCodeAt(i);
    // 判断是否为大写字母（A-Z 的 Unicode 范围是 65-90）
    if (charCode >= 65 && charCode <= 90) {
      // 大写字母转小写：ASCII 码 +32（a 的 Unicode 是 97 = 65 + 32）
      result += String.fromCharCode(charCode + 32);
    } else {
      // 非大写字母直接拼接
      result += this.charAt(i);
    }
  }

  return result;
};

// 测试示例
console.log("Hello WORLD!".MytoLowerCase()); // 输出 "hello world!"

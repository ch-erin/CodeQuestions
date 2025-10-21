// 自定义 for...in
function myForIn(obj, callback) {
  // 获取对象的所有可枚举属性
  const keys = Object.keys(obj);

  // 遍历属性
  for (let key of keys) {
    // 调用回调函数，传入当前键和值
    callback(key, obj[key]);
  }
}

// 测试
const obj = { a: 1, b: 2, c: 3 };
myForIn(obj, (key, value) => {
  console.log(key, value); // 输出：a 1, b 2, c 3
});

function forIn(obj, callback) {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    callback(key, obj[key]);
  }
}

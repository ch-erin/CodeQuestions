Array.prototype.myForEach = function (callback, thisArg) {
  // 3. 将当前数组转为对象（处理类数组情况），并获取长度
  const array = Object(this);
  const length = array.length >>> 0; // 无符号右移确保length为非负整数

  // 4. 遍历数组元素
  let index = 0;
  while (index < length) {
    // 只处理数组自身存在的索引（跳过稀疏数组的空元素）
    if (index in array) {
      // 调用回调函数，绑定thisArg为this，传递三个参数：元素、索引、原数组
      callback.call(thisArg, array[index], index, array);
    }
    index++;
  }
};

// 测试用例
const arr = [1, 2, 3];
arr.myForEach(
  function (item, index, array) {
    console.log(`元素${item}，索引${index}，原数组${array}`);
    console.log("当前this:", this); // 这里的this指向传入的thisArg
  },
  { context: "测试" }
);

// 测试稀疏数组（索引1为空）
const sparseArr = [1, , 3];
sparseArr.myForEach((item) => console.log(item)); // 只输出1和3，跳过空元素

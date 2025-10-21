// 归并排序实现
function mergeSort(arr) {
  // 基本情况：如果数组长度小于等于1，则已经是排序好的
  if (arr.length <= 1) {
    return arr.slice(); // 返回数组副本，避免修改原数组
  }

  // 将数组分成两半
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid)); // 递归排序左半部分
  const right = mergeSort(arr.slice(mid)); // 递归排序右半部分

  // 合并两个已排序的数组
  return merge(left, right);
}

// 合并两个已排序的数组
function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  // 比较两个数组的元素，按顺序放入结果数组
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // 将剩余元素添加到结果数组
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

// 测试案例
function testMergeSort() {
  // 测试1: 基本功能测试
  const arr1 = [3, 6, 8, 10, 1, 2, 1];
  console.log("测试1 - 基本排序:");
  console.log("原始数组:", arr1);
  console.log("排序结果:", mergeSort(arr1)); // 应输出 [1, 1, 2, 3, 6, 8, 10]
  console.log("------------------------");

  // 测试2: 空数组
  const arr2 = [];
  console.log("测试2 - 空数组:");
  console.log("原始数组:", arr2);
  console.log("排序结果:", mergeSort(arr2)); // 应输出 []
  console.log("------------------------");

  // 测试3: 单元素数组
  const arr3 = [5];
  console.log("测试3 - 单元素数组:");
  console.log("原始数组:", arr3);
  console.log("排序结果:", mergeSort(arr3)); // 应输出 [5]
  console.log("------------------------");

  // 测试4: 已有序数组
  const arr4 = [1, 2, 3, 4, 5];
  console.log("测试4 - 已有序数组:");
  console.log("原始数组:", arr4);
  console.log("排序结果:", mergeSort(arr4)); // 应输出 [1, 2, 3, 4, 5]
  console.log("------------------------");

  // 测试5: 逆序数组
  const arr5 = [5, 4, 3, 2, 1];
  console.log("测试5 - 逆序数组:");
  console.log("原始数组:", arr5);
  console.log("排序结果:", mergeSort(arr5)); // 应输出 [1, 2, 3, 4, 5]
  console.log("------------------------");

  // 测试6: 包含重复元素
  const arr6 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  console.log("测试6 - 包含重复元素:");
  console.log("原始数组:", arr6);
  console.log("排序结果:", mergeSort(arr6)); // 应输出 [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
  console.log("------------------------");

  // 测试7: 包含负数
  const arr7 = [3, -1, 4, -1, 5, -9, 2];
  console.log("测试7 - 包含负数:");
  console.log("原始数组:", arr7);
  console.log("排序结果:", mergeSort(arr7)); // 应输出 [-9, -1, -1, 2, 3, 4, 5]
}

// 执行测试
testMergeSort();

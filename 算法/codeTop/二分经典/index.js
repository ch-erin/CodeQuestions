function lowerBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1;
    nums[mid] < target ? (left = mid + 1) : (right = mid - 1);
  }
  
  return left;
}

//寻找目标节点索引

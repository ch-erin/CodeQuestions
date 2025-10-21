const gas = [1, 2, 3, 4, 5];
const cost = [3, 4, 5, 1, 2];

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
const canCompleteCircuit = function (gas, cost) {
  const n = gas.length;
  let totalTank = 0; // 总油量减去总消耗，判断是否可能完成环路
  let currentTank = 0; // 当前油箱中的油量
  let startStation = 0; // 起始加油站索引

  for (let i = 0; i < n; i++) {
    // 累加总油量和总消耗的差值
    totalTank += gas[i] - cost[i];
    // 累加当前油箱的油量
    currentTank += gas[i] - cost[i];

    // 如果当前油箱油量为负，说明从startStation到当前站无法完成
    // 需要从下一个站重新开始尝试
    if (currentTank < 0) {
      startStation = i + 1; // 重置起始站
      currentTank = 0; // 重置当前油箱
    }
  }

  return totalTank >= 0 ? startStation : -1;
};

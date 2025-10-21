function mark(k) {
  const nums = [3, 7, 12, 19];
  const path = [];
  const result = [];

  function isPrime(num) {
    if (num < 2) return false;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }

    return true;
  }

  function dfs(m) {
    if (path.length === k) {
      let res = path.reduce((acc, cur) => acc + cur, 0);
      if (isPrime(res)) return result.push([...path]);
    }

    for (let i = m; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  }
  dfs(0);

  return result;
}

console.log(mark(3));

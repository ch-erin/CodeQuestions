const intervals = [
  [1, 3],
  [6, 9],
];
const newInterval = [2, 5];

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [[intervals[0]]];

  for (let i = 0; i < intervals.length; i++) {
    let cur_interval = intervals[i][0];
    let max_last = result.at(-1)[1];
    if (cur_interval <= max_last) {
      cur_interval[1] = Math.max(intervals[i], max_last);
    } else {
      result.push(cur_interval);
    }
  }

  console.log(result);
}

insert(intervals, newInterval);

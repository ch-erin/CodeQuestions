/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = function (lists) {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];

  const mid = lists.length >> 1;
  const left = mergeKLists(lists.slice(0, mid));
  const right = mergeKLists(lists.slice(mid));

  const dummy = new ListNode();
  let cur = dummy;
  let l = left;
  let r = right;

  while (l && r) {
    if (l.val < r.val) {
      cur.next = l;
      l = l.next;
    } else {
      cur.next = r;
      r = r.next;
    }
    cur = cur.next;
  }
  cur.next = l ?? r;

  return dummy.next;
};

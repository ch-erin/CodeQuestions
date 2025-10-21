function middleNode(head) {
  let slow = head,
    fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

function reverse(head) {
  let pre = null,
    cur = head;
  while (cur !== null) {
    const nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  return pre;
}

const reorderList = function (head) {
  const mid = middleNode(head);
  let head2 = reverse(mid);

  while (head2.next) {
    const nxt = head.next;
    const nxt2 = head2.next;

    head.next = head2;
    head2.next = nxt;

    head = nxt;
    head2 = nxt2;
  }
};

// 假如要空间复杂度为O(1),则必须操作原链表
function copyRandomList(head) {
  if (!head) return;

  for (let cur = head; cur; cur = cur.next.next) {
    cur.next = new _Node(cur.val, cur.next, null);
  }

  for (let cur = head; cur; cur = cur.next.next) {
    if (cur.random) {
      // 新节点（cur.next）的random = 原节点random的下一个节点
      cur.next.random = cur.random.next;
    }
  }

  const new_head = head.next;
  let cur = head;

  for (; cur.next.next; cur = cur.next) {
    const node = cur.next;
    cur.next = node.next;
    node.next = node.next.next;
  }

  return new_head;
}

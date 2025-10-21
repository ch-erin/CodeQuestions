// 合并两个有序链表
// 找中间值

function getMid(head) {
  let slow = head;
  let fast = head;
  let pre = head;

  while (fast && fast.next) {
    pre = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  pre.next = null;

  return slow;
}

//前提条件：有序
function marge(list1, list2) {
  let dummy = new TreeNode();
  let head = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      head.next = list1;
      list1 = list1.next;
    } else {
      head.next = list2;
      list2 = list2.next;
    }
    head = head.next;
  }

  head.next = list1 ?? list2;

  return dummy.next;
}

function sortList(head) {
  if (head === null || head.next === null) return head;

  let head2 = getMid(head);

  head = sortList(head);
  head2 = sortList(head2);

  return marge(head, head2);
}

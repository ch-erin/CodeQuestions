function deleteDuplicates(head) {
  const dummy = new ListNode(0, head);
  let cur = dummy;

  while (cur.next && cur.next.next) {
    let val = cur.next.val;

    if (cur.next.next.val === val) {
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }

  return dummy.next;
}

function deleteDuplicates(head) {
  const dummy = new ListNode(0, head);

  let cur = dummy;

  while (cur.next && cur.next.next) {
    let val = cur.next.val;

    if (val === cur.next.next.val) {
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }

  return dummy.next;
}

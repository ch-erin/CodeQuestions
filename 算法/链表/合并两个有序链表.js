class node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function merge(l_1, l_2) {
  const dummy = new node(-1);

  let cur = dummy;

  while (l_1 !== null && l_2 !== null) {
    if (l_1.val <= l_2.val) {
      cur.next = l_1;
      l_1 = l_1.next;
    } else {
      cur.next = l_2;
      l_2 = l_2.next;
    }
    cur = cur.next;
  }
  cur.next = l_1 !== null ? l_1 : l_2;

  return dummy.next;
}

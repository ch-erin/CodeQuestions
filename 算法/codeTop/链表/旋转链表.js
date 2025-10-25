function rotateRight(head, k) {
  if (!head || k === 0) return head;

  let n = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    n++;
  }

  k %= n;
  if (k === 0) return head;

  let newTail = head;
  for (let i = 0; i < n - 1 - k; i++) newTail = newTail.next;

  const newHead = newTail.next;
  newTail.next = null;
  tail.next = head;

  return newHead;
}

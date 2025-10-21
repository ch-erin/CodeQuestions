import { buildLinkedList } from "../utils/index.js";

function revsere(head) {
  let cur = head;
  let pre = null;

  while (cur) {
    let next = cur.next;

    cur.next = pre;
    pre = cur;

    cur = next;
  }

  return pre;
}

function getMid(head) {
  let slow = head;
  let fast = head;

  while (fast) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

const arr = [1, 2];

const head = buildLinkedList(arr);

const isPalindrome = function (head) {
  let right = revsere(getMid(head));
  let left = head;
  
  while (right) {
    if (left.val !== right.val) return false;
    if (left.val === right.val) {
      left = left.next;
      right = right.next;
    }
  }

  return true;
};

const res = isPalindrome(head);
console.log(res);

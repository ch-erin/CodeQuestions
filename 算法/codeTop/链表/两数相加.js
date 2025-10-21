import { buildLinkedList } from "../utils/index.js";

let l1 = [2, 4, 3];
let l2 = [5, 6, 4];

const [list1, list2] = [buildLinkedList(l1), buildLinkedList(l2)];

const addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    const sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    
    current.next = new ListNode(sum % 10);

    current = current.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
};

addTwoNumbers(list1, list2);

import { buildLinkedList, ListNode, printList } from "../utils/index.js";

const mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(0);
  let head = dummy;

  while (list1 && list2) {
    if (list1.val < list2.val) {
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
};

const arr1 = [1, 2, 10, 11];
const arr2 = [2, 5, 7, 15];

const root1 = buildLinkedList(arr1);
const root2 = buildLinkedList(arr2);
const res = mergeTwoLists(root1, root2);
printList(res);

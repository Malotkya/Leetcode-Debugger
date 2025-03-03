/** Add Two Numbers
 * 
 * @author Alex Malotky
 */
import {MultipleExamples, RunTests} from ".";


//Definition for singly-linked list.
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

const Examples:MultipleExamples<[
    ListNode|null,
    ListNode|null
], ListNode|null> = [
    //Example 1
    {
        input: [
            new ListNode(2, new ListNode(4, new ListNode(3))),
            new ListNode(5, new ListNode(6, new ListNode(4)))
        ],
        output: new ListNode(7, new ListNode(0, new ListNode(8)))
    },

    //Example 2
    {
        input: [
            new ListNode(),
            new ListNode()
        ],
        output: new ListNode()
    },

    //Example 3
    {
        input: [
            new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))))))),
            new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))),
        ],
        output: new ListNode(8, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(1))))))))
    }
]

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const head = new ListNode();
    let curr = head;
    let carry = 0;

    while(l1 !== null || l2 !== null || carry !== 0) {
        const sum = (l1 !== null ? l1.val : 0)
                  + (l2 !== null ? l2.val : 0)
                  + carry;

        carry = sum > 9? 1: 0;
        curr.next = new ListNode(sum % 10);
        curr = curr.next;

        if (l1 !== null)
            l1 = l1.next;
        if (l2 !== null)
            l2 = l2.next;
    }

    return head.next;
};

export default RunTests(addTwoNumbers, Examples);
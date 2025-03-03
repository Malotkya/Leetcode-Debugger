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
        args: [
            new ListNode(2, new ListNode(4, new ListNode(3))),
            new ListNode(5, new ListNode(6, new ListNode(4)))
        ],
        output: new ListNode(7, new ListNode(0, new ListNode(8)))
    },

    //Example 2
    {
        args: [
            new ListNode(),
            new ListNode()
        ],
        output: new ListNode()
    },

    //Example 3
    {
        args: [
            new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))))))),
            new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))),
        ],
        output: new ListNode(8, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(1))))))))
    }
]

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null, carry:number = 0): ListNode | null {
    if(l1 === null || l2 === null){
        if(l1) {
            const sum = l1.val + carry;
            return new ListNode(sum % 10, addTwoNumbers(l1.next, null, sum > 9? 1: 0));
        }

        if(l2) {
            const sum = l2.val + carry;
            return new ListNode(sum % 10, addTwoNumbers(l2.next, null, sum > 9? 1: 0))
        }

        if(carry === 1)
            return new ListNode(1);

        return null;
    }

    const sum = l1.val + l2.val + carry;
    return new ListNode(sum % 10, addTwoNumbers(l1.next, l2.next, sum > 9? 1: 0))
};


export default RunTests(addTwoNumbers, Examples);
/** Median Sorted Arrays
 * 
 * @author Alex Malotky
 */
import {MultipleExamples, RunTests} from ".";

const Example:MultipleExamples<[
    number[],
    number[]
], number> = [
    {
        input: [
            [1,3],
            [2]
        ],
        output: 2
    },
    {
        input: [
            [1,2],
            [3,4]
        ],
        output: 2.5
    }
]

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const array = nums1.concat(nums2).sort((a, b)=>a-b);

    if(array.length % 2 === 0){
        const target = array.length / 2;
        return (array[target] + array[target-1]) / 2;
    }

    return array[Math.floor(array.length / 2)];
};

export default RunTests(findMedianSortedArrays, Example);
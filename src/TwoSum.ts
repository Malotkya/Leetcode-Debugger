/** TwoSum
 * 
 */
import {MultipleExamples, RunTests} from ".";

const Examples:MultipleExamples<[
    number[],
    number
], number[]> = [
    //Example 1
    {
        args: [
            [2,7,11,15],
            9,
        ],
        output: [0, 1]
    },

    //Example 2
    {
        args: [
            [3,2,4],
            6,
        ],
        output: [1, 2]
    },

    //Example 3
    {
        args: [
            [3,3],
            6,
        ],
        output: [0, 1]
    }
]

function twoSum(nums:number[], target:number):number[] {
    const record:Record<number, number> = {};

    for(let i=0; i<nums.length; i++){
        const diff:number = target - nums[i];

        if(record[diff] !== undefined) {
            return [record[diff], i]
        } else {
            record[nums[i]] = i;
        }
    }

    throw new Error("No Solution");
}


export default RunTests(twoSum, Examples);
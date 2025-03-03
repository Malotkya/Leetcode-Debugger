/** Length Of Longest Substring
 * 
 * @author Alex Malotky
 */
import {MultipleExamples, RunTests} from ".";

const Examples:MultipleExamples<[string], number> = [
    {
        input: [
            "abcabcbb"
        ],
        output: 3
    },
    {
        input: [
            "bbbbb"
        ],
        output: 1
    },
    {
        input: [
            "pwwkew"
        ],
        output: 3
    }
]

function lengthOfLongestSubstring(s: string): number {
    const map:Map<string, number> = new Map();
    
    let max = 0;
    let left = 0;
    for(let right=0; right<s.length; right++){
        const char = s.charAt(right);

        const test = map.get(char);
        if(test !== undefined && test >= left) {
            left = test + 1;
        }

        map.set(char, right);
        max = Math.max(max, right-left+1);
    }

    return max;
};

export default RunTests(lengthOfLongestSubstring, Examples);
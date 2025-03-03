/** Add Binary
 * 
 * @author Alex Malotky
 */
import {MultipleExamples, RunTests} from ".";

const Examples:MultipleExamples<[
    string,
    string
], string> = [
    {
        input: [
            "100",
            "110010"
        ],
        output: "110110"
    },
    {
        input: [
            "11",
            "1"
        ],
        output: "100"
    },
    {
        input: [
            "1010",
            "1011"
        ],
        output: "10101"
    },
    {
        input: [
            "1",
            "111"
        ],
        output: "1000"
    },
]

function addBinary(a: string, b: string): string {
    let output:string[] = [];

    let c:boolean = false;
    let i = a.length;
    let j = b.length;
    while((i >= -1 || j >= -1) || c){
        const x:boolean = a[--i] === "1";
        const y:boolean = b[--j] === "1";

        const s:boolean = (x === y) === c;
        c = (x && y) || (x !== y && c);

        output.unshift(s? "1": "0");
    }

    while(output[0] === "0")
        output.shift();
    
    return output.join("") || "0";
};

export default RunTests(addBinary, Examples);
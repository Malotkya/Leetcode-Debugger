/** Main File
 * 
 * @author Alex Malotky
 */
import fs from "node:fs";
import path from "node:path";

/** Single Example
 * 
 */
export interface SingleExample<ARGS extends Array<any>, R> {
    input:ARGS,
    output:R
}

/** Multiple Examples
 * 
 */
export type MultipleExamples<ARGS extends Array<any>, R> = SingleExample<ARGS, R>[];

/** Better Type Of
 * 
 * Includes strings for Array and null in addtion to normal typeof values
 * 
 * @param {unknown} value 
 * @returns {string}
 */
function betterTypeOf(value:unknown):"string"|"number"|"bigint"|"boolean"|"symbol"|"undefined"|"object"|"function"|"Array"|"null" {
    const type = typeof value;

    if(type === "object"){
        if(Array.isArray(type))
            return "Array";

        if(type === null)
            return "null";
    }

    return type;
}

/** Compare Values
 * 
 * Deep Recursive Comparing of Values
 * 
 * @param {unknown} lhs 
 * @param {unknown} rhs 
 */
function compareValues<T extends unknown>(lhs:T, rhs:T):void {
    const typeL = betterTypeOf(lhs);
    const typeR = betterTypeOf(rhs);
    
    if(typeL !== typeR)
        throw new Error(`Mismatched Types!\n${typeL} & ${typeR}`);

    switch(typeL){
        case "Array":
            for(let i=0; i<(<unknown[]>lhs).length; i++){
                try {
                    compareValues((<unknown[]>lhs)[i], (<unknown[]>rhs)[i]);
                } catch (e:any){
                    throw new Error(`Error at ${i}:\n${e.message || e}`)
                }
            }
            break;

        case "object":
            for(let n in (<Record<string, unknown>>lhs)) {
                try {
                    compareValues((<Record<string, unknown>>lhs)[n], (<Record<string, unknown>>rhs)[n]);
                } catch (e:any){
                    throw new Error(`Error at ${n}:\n${e.message || e}`)
                }
            }
            break;

        case "function":
        case "symbol":
            throw new Error(`Unable to compare ${typeL}!`);

        default:
            if(lhs !== rhs) {
                throw new Error(`${lhs} !== ${rhs}`);
            }
    }
}

/** Handle Example
 * 
 * @param {Function} fun 
 * @param {SingleExample} example 
 */
async function HandleExample<A extends Array<any>, R>(fun:(...args:A)=>Promise<R>|R, example:SingleExample<A,R>):Promise<void> {
    const {input, output} = example;

    if(!Array.isArray(input))
        throw new TypeError("Input must be an array!");

    const start = Date.now();
    let time:number|undefined;

    try {
        const result:R = await fun(...input);
        time = Date.now() - start;
        compareValues(output, result);
        console.log(`SUCCESS! (${time!}ms)`);
    } catch (e:any){
        if(time === undefined)
            time = Date.now() - start;

        console.log(`FAILED! (${time}ms)`);
        console.log(e);
    }
}

/** Run Tests Builder
 * 
 * @param {Function} fun 
 * @param {SingleExample|MultipleExamples} examples 
 * @returns {Function}
 */
export function RunTests<A extends Array<any>, R>(fun:(...args:A)=>Promise<R>|R, examples:MultipleExamples<A, R>|SingleExample<A,R>):()=>Promise<void> {

    if(!Array.isArray(examples))
        return () => HandleExample(fun, examples);

    return async() => {
        for(let i=0; i<examples.length; i++) {
            console.log(`Example ${i+1}:`);
            await HandleExample(fun, examples[i]);
        }
    }
}

/** Let Code File/Module
 * 
 */
interface LeetCodeModule {
    default:()=>Promise<void>
}

/** Compare Names
 * 
 * Test if the file name or directory name is equal
 * to the test name.
 * 
 * @param {string} fileName 
 * @param {string} test 
 * @returns {boolean}
 */
function compareName(fileName:string, test:string):boolean {
    //Skip this file
    if(fileName.includes("index"))
        return false;

    const index = fileName.indexOf(".");
    if(index === -1){
        return fileName.toLocaleLowerCase() === test.toLocaleLowerCase();
    }

    return fileName.substring(0, index).toLocaleLowerCase() === test.toLocaleLowerCase();
}

/** Find Module
 * 
 * @param {string} name 
 * @returns {Promise<LeetCodeModule|null>}
 */
async function findModule(name:string):Promise<LeetCodeModule|null> {
    for(const file of fs.readdirSync(__dirname)){
        if(compareName(file, name)) {
            const filePath = path.join(__dirname, file);

            if(fs.statSync(filePath).isFile()) {
                return import(filePath);
            }

            return import(path.join(filePath, "index.js"));
        }
    }

    return null;
}

/** Main Function
 * 
 */
(async()=>{
    const input = process.argv[2];

    if(input === undefined) {
        console.error("No file specified!");
        return;
    }

    const module = await findModule(input);

    if(module === null){
        console.error(`Unable to find file "${input}"!`);
        return;
    }

    const type = typeof module.default;
    if(type !== "function") {
        console.error(`Unable to find main function:\nFound ${type}!`);
        return;
    }

    try {
        await module.default();
    } catch (e){
        console.error(e);
    }
})();

/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: 
 * Install: npm i input-shell --save
 * Github: https://github.com/ganeshkbhat/
 * npmjs Link: https://www.npmjs.com/package/
 * File: index.js
 * File Description: 
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const assert = require('assert');
const { spawn } = require('child_process');
const process = require("process");
const fs = require('fs');


const scriptPath = './index.js';

// describe('readSingleLineBufferFromStdin', () => {
//   var input, output;
//   before(async () => {
//     input = 'hello world\n';
//     process.stdin.write(input);
//     output = await scriptPath.input();
//     output = output.toString('utf8');
//     return output
//   });

//   it('should read a single line and return a buffer', async () => {
    
//     assert(output.includes('Input (text): hello world'));
//     assert(output.includes('Input (buffer): <Buffer'));
//   });

//   it('should handle empty input', async () => {
//     const input = '';
//     const output = await runScriptWithInput(scriptPath, input);
//     assert(output.includes('Error: No input received'));
//   });

//   it('should handle input without a newline', async () => {
//     const input = 'no newline';
//     const output = await runScriptWithInput(scriptPath, input);
//     assert(output.includes('Input (text): no newline'));
//     assert(output.includes('Input (buffer): <Buffer'));
//   });

//     it('should handle a single character input', async () => {
//         const input = 'a\n';
//         const output = await runScriptWithInput(scriptPath, input);
//         assert(output.includes('Input (text): a'));
//         assert(output.includes('Input (buffer): <Buffer'));
//     });

//     it('should handle input with multiple newlines, only the first line is taken', async () => {
//         const input = 'line1\nline2\nline3\n';
//         const output = await runScriptWithInput(scriptPath, input);
//         assert(output.includes('Input (text): line1'));
//         assert(output.includes('Input (buffer): <Buffer'));
//     });
// });


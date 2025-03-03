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

var { input } = require("../index");

// Example usage:
input("Input Text: ")
    .then((buffer) => {
        console.log("Input (buffer):", buffer);
        console.log("Input (text):", buffer.toString('utf8')); // Convert to text
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });



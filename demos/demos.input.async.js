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

var { inputAsync } = require("../index");

inputAsync("Enter some text: ", (err, result) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Input:", result.toString());
    }
});


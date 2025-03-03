/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: 
 * Install: npm i input --save
 * Github: https://github.com/ganeshkbhat/
 * npmjs Link: https://www.npmjs.com/package/
 * File: index.js
 * File Description: 
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';

var { inputSelect } = require("../index");

// Example usage: radio button

inputSelect(
    'Choose an option:',
    ['Option 1', 'Option 2', 'Option 3'],
    'radio'
).then(e => console.log(e))


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

var { inputSelect } = require("../index");

// Example usage: checkboxes
inputSelect(
    'Select multiple options:',
    ['Checkbox A', 'Checkbox B', 'Checkbox C', 'Checkbox D'],
    'checkbox'
).then(e => console.log(e))

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
    'What is your favorite color?',
    ['Red', 'Blue', 'Green', 'Yellow'],
    'radio',
    (selection) => {
        console.log('You selected:', selection);
    }
);



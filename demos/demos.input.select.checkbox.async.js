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

var { inputSelectAsync } = require("../index");

// Example usage: checkboxes
inputSelectAsync(
    'Which fruits do you like? (Use space to select, enter to finish)',
    ['Apple', 'Banana', 'Orange', 'Grape'],
    'checkbox',
    (selections) => {
        console.log('You selected:', selections);
    }
);


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

var { inputSelectMultipleAsync } = require("../index");

// Example usage:
const questions = [
  { text: 'What is your name?', type: 'text' },
  { text: 'What is your favorite color?', type: 'radio', options: ['Red', 'Blue', 'Green'] },
  { text: 'Which fruits do you like?', type: 'checkbox', options: ['Apple', 'Banana', 'Orange', 'Grape'] },
  { text: 'What is your age?', type: 'text' },
];

inputSelectMultipleAsync(questions, (results) => {
  console.log('Results:', results);
});


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

var { inputSelectMultiple } = require("../index");

// Example usage:
const questions = [
  { text: 'What is your name?', type: 'text' },
  { text: 'What is your favorite color?', type: 'radio', options: ['Red', 'Blue', 'Green'] },
  { text: 'Which fruits do you like?', type: 'checkbox', options: ['Apple', 'Banana', 'Orange', 'Grape'] },
  { type: 'radio', text: 'Choose your operating system:', options: ['Windows', 'macOS', 'Linux'] },
  { text: 'What is your age?', type: 'text' },
  { type: 'text', text: 'Enter your city?' },
];

inputSelectMultiple(questions).then((results) => {
  console.log('Results:', results);
}).catch((error) => {
  console.log('Error:', error);
});

// // USAGE Two: 
// inputSelectMultiple(questions)
//     .then((results) => {
//         console.clear();
//         console.log('Answers:');
//         results.forEach((result) => {
//             console.log(`${result.question}: ${Array.isArray(result.answer) ? result.answer.join(', ') : result.answer}`);
//         });
//         process.exit();
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         process.exit(1);
//     });






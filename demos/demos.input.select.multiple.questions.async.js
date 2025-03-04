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

var { inputSelectMultipleAsync } = require("../index");

// Example usage:
const questions = [
  { text: 'What is your name?', type: 'text' },
  { text: 'What is your favorite color?', type: 'radio', options: ['Red', 'Blue', 'Green'] },
  { text: 'Which fruits do you like?', type: 'checkbox', options: ['Apple', 'Banana', 'Orange', 'Grape'] },
  { text: 'What is your age?', type: 'text' },
];

inputSelectMultipleAsync(questions, (err, results) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  } else {
    console.clear();
    console.log('Answers:');
    results.forEach((result) => {
      console.log(`${result.question}: ${Array.isArray(result.answer) ? result.answer.join(', ') : result.answer}`);
    });
    console.log("results: ", results);
    process.exit();
  }
});

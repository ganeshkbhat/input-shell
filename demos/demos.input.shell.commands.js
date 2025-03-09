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

const shellCommands = require('../index').shellCommands;

// Example usage:
shellCommands((results) => {
    console.log('\nAll command results:', results);
});

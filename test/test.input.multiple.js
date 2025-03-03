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

const assert = require('chai').assert;
const sinon = require('sinon');
const { inputSelectMultiple } = require('../index'); // Replace 'your-file-name'

// describe('inputSelectMultiple', () => {
//   let stdinStub, stdoutStub, processExitStub;
//   let originalRawMode;

//   beforeEach(() => {
//     stdinStub = sinon.stub(process.stdin);
//     stdoutStub = sinon.spy(process.stdout, 'write');
//     processExitStub = sinon.stub(process, 'exit');
//     originalRawMode = process.stdin.isRaw;
//   });

//   afterEach(() => {
//     sinon.restore();
//     process.stdin.setRawMode(originalRawMode);
//   });

//   it('should handle a sequence of text, radio, and checkbox questions', (done) => {
//     const questions = [
//       { text: 'What is your name?', type: 'text' },
//       { text: 'What is your favorite color?', type: 'radio', options: ['Red', 'Blue'] },
//       { text: 'Which fruits do you like?', type: 'checkbox', options: ['Apple', 'Banana'] },
//     ];

//     const expectedResults = [
//       { text: 'What is your name?', answer: 'Test Name' },
//       { text: 'What is your favorite color?', answer: 'Blue' },
//       { text: 'Which fruits do you like?', answer: ['Apple'] },
//     ];

//     inputSelectMultiple(questions)
//       .then((results) => {
//         assert.deepStrictEqual(results, expectedResults);
//         done();
//       })
//       .catch(done);

//     let keyPressCount = 0;

//     stdinStub.on('data', (data) => {
//       if (keyPressCount === 0) {
//         stdinStub.emit('keypress', '\r', { name: 'return' });
//       } else if (keyPressCount === 1) {
//         stdinStub.emit('keypress', '\r', { name: 'return' });
//       } else if (keyPressCount === 2) {
//         stdinStub.emit('keypress', '\r', { name: 'return' });
//       }
//       keyPressCount++;
//     });

//     stdinStub.emit('data', 'Test Name\n');
//     stdinStub.emit('keypress', null, { name: 'down' });
//     stdinStub.emit('keypress', null, { name: 'return' });
//     stdinStub.emit('keypress', null, { name: 'space' });
//     stdinStub.emit('keypress', null, { name: 'return' });
//   });

//   it('should handle only text questions', (done) => {
//     const questions = [
//       { text: 'What is your name?', type: 'text' },
//       { text: 'What is your age?', type: 'text' },
//     ];

//     const expectedResults = [
//       { text: 'What is your name?', answer: 'Test Name' },
//       { text: 'What is your age?', answer: '30' },
//     ];

//     inputSelectMultiple(questions)
//       .then((results) => {
//         assert.deepStrictEqual(results, expectedResults);
//         done();
//       })
//       .catch(done);

//     let count = 0;

//     stdinStub.on('data', (data) => {
//       if (count === 0) {
//         stdinStub.emit('keypress', '\r', { name: 'return' });
//       } else {
//         stdinStub.emit('keypress', '\r', { name: 'return' });
//       }
//       count++;
//     });

//     stdinStub.emit('data', 'Test Name\n');
//     stdinStub.emit('data', '30\n');
//   });

//   it('should handle only radio questions', (done) => {
//     const questions = [
//       { text: 'What color?', type: 'radio', options: ['Red', 'Blue'] },
//       { text: 'What second color?', type: 'radio', options: ['Green', 'Yellow'] },
//     ];

//     const expectedResults = [
//       { text: 'What color?', answer: 'Blue' },
//       { text: 'What second color?', answer: 'Yellow' },
//     ];

//     inputSelectMultiple(questions)
//       .then((results) => {
//         assert.deepStrictEqual(results, expectedResults);
//         done();
//       })
//       .catch(done);

//     stdinStub.emit('keypress', null, { name: 'down' });
//     stdinStub.emit('keypress', null, { name: 'return' });
//     stdinStub.emit('keypress', null, { name: 'down' });
//     stdinStub.emit('keypress', null, { name: 'return' });
//   });

//   it('should handle only checkbox questions', (done) => {
//     const questions = [
//       { text: 'Fruits?', type: 'checkbox', options: ['Apple', 'Banana'] },
//       { text: 'Veggies?', type: 'checkbox', options: ['Carrot', 'Broccoli'] },
//     ];

//     const expectedResults = [
//       { text: 'Fruits?', answer: ['Apple'] },
//       { text: 'Veggies?', answer: ['Broccoli'] },
//     ];

//     inputSelectMultiple(questions)
//       .then((results) => {
//         assert.deepStrictEqual(results, expectedResults);
//         done();
//       })
//       .catch(done);

//     stdinStub.emit('keypress', null, { name: 'space' });
//     stdinStub.emit('keypress', null, { name: 'return' });
//     stdinStub.emit('keypress', null, { name: 'down' });
//     stdinStub.emit('keypress', null, { name: 'space' });
//     stdinStub.emit('keypress', null, { name: 'return' });
//   });

//   it('should handle ctrl+c exit during questions', (done) => {
//     const questions = [{ text: 'What is your name?', type: 'text' }];

//     inputSelectMultiple(questions)
//       .then(() => {
//         done(new Error('Promise should not resolve'));
//       })
//       .catch(() => {
//         assert.ok(processExitStub.called);
//         done();
//       });

//     stdinStub.emit('keypress', null, { ctrl: true, name: 'c' });
//   });
// });


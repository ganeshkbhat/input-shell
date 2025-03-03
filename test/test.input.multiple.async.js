const assert = require('chai').assert;
const sinon = require('sinon');
const { inputSelectMultipleAsync } = require('../index'); // Replace 'your-file-name'

// describe('inputSelectMultipleAsync with History', () => {
//   let stdinStub, stdoutSpy, stdoutStub, processExitStub;
//   let originalRawMode;

//   before(() => {
//     // stdoutSpy = sinon.spy(process.stdout, 'write');
//   })

//   beforeEach(() => {
//     stdinStub = sinon.stub(process.stdin);
//     stdoutStub = sinon.stub(process.stdout, "fd");

//     processExitStub = sinon.stub(process, 'exit');
//     originalRawMode = process.stdin.isRaw;
//   });

//   afterEach(() => {
//     sinon.restore();
//     process.stdin.setRawMode(originalRawMode);
//   });

//   // it('should handle a sequence of text, radio, and checkbox questions with history-', (done) => {
//   //   const questions = [
//   //     { text: 'What is your name?', type: 'text' },
//   //     { text: 'What is your favorite color?', type: 'radio', options: ['Red', 'Blue'] },
//   //     { text: 'Which fruits do you like?', type: 'checkbox', options: ['Apple', 'Banana'] },
//   //   ];

//   //   const expectedResults = [
//   //     { text: 'What is your name?', answer: 'Test Name' },
//   //     { text: 'What is your favorite color?', answer: 'Blue' },
//   //     { text: 'Which fruits do you like?', answer: ['Apple'] },
//   //   ];

//   //   const callback = (results) => {
//   //     assert.deepStrictEqual(results, expectedResults);
//   //     assert.ok(stdoutSpy.calledWith(sinon.match('What is your name?: Test Name')));
//   //     assert.ok(stdoutSpy.calledWith(sinon.match('What is your favorite color?: Blue')));
//   //     done();
//   //   };

//   //   inputSelectMultipleAsync(questions, callback);

//   //   let keyPressCount = 0;

//   //   stdinStub.on('data', (data) => {
//   //     if (keyPressCount === 0) {
//   //       stdinStub.emit('keypress', '\r', { name: 'return' });
//   //     } else if (keyPressCount === 1) {
//   //       stdinStub.emit('keypress', '\r', { name: 'return' });
//   //     } else if (keyPressCount === 2) {
//   //       stdinStub.emit('keypress', '\r', { name: 'return' });
//   //     }
//   //     keyPressCount++;
//   //   });

//   //   stdinStub.emit('data', 'Test Name\n');
//   //   stdinStub.emit('keypress', null, { name: 'down' });
//   //   stdinStub.emit('keypress', null, { name: 'return' });
//   //   stdinStub.emit('keypress', null, { name: 'space' });
//   //   stdinStub.emit('keypress', null, { name: 'return' });
//   // });

//   it('should handle a sequence of text, radio, and checkbox questions with history', (done) => {
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

//     const callback = (results) => {
//       assert.deepStrictEqual(results, expectedResults);
//       done();
//     };

//     inputSelectMultipleAsync(questions, callback);

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

//     // Check if previous answers are displayed.
//     // console.log();
//     assert.ok(stdoutSpy.calledWith(sinon.match('What is your name? Test Name')));
//     // assert.ok(stdoutSpy.calledWith(sinon.match('What is your name? Test Name')));
//     // assert.ok(stdoutSpy.calledWith(sinon.match('What is your favorite color? Blue')));
//   });

//   it('should handle only text questions with history', (done) => {
//     const questions = [
//       { text: 'What is your name?', type: 'text' },
//       { text: 'What is your age?', type: 'text' },
//     ];

//     const expectedResults = [
//       { text: 'What is your name?', answer: 'Test Name' },
//       { text: 'What is your age?', answer: '30' },
//     ];

//     const callback = (results) => {
//       assert.deepStrictEqual(results, expectedResults);
//       done();
//     };

//     inputSelectMultipleAsync(questions, callback);

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

//     assert.ok(stdoutSpy.calledWith(sinon.match('What is your name? Test Name\n')));

//   });

//   it('should handle ctrl+c exit during questions with history', () => {
//     const questions = [{ text: 'What is your name?', type: 'text' }];

//     inputSelectMultipleAsync(questions, () => { });
//     stdinStub.emit('keypress', null, { ctrl: true, name: 'c' });
//     assert.ok(!processExitStub.called);
//   });
// });
